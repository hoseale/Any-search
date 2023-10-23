const defaultEngines = [
  {
    path: "https://www.google.com/search?q={}",
    key: "go",
    title: "Google",
    isDefault: true,
  },
  {
    path: "https://www.bing.com/search?q={}",
    key: "bi",
    title: "Bing",
  },
  {
    path: "https://search.yahoo.com/search?p={}",
    key: "ya",
    title: "Yahoo",
  },
  {
    path: "https://duckduckgo.com/?q={}",
    key: "dd",
    title: "DuckDuckGo",
  },
  {
    path: "https://www.ecosia.org/search?q={}",
    key: "ec",
    title: "Ecosia",
  },
  {
    path: "https://translate.google.com/?text={}",
    key: "gt",
    title: "Google Translate",
  },
  {
    path: "https://www.youtube.com/results?search_query={}",
    key: "yt",
    title: "YouTuBe",
  },
  {
    path: "https://www.baidu.com/s?wd={}",
    key: "bd",
    title: "百度",
  },
  {
    path: "https://www.tiktok.com/search?q={}",
    key: "tt",
    title: "TikTok",
  },
  {
    path: "https://en.wikipedia.org/w/index.php?search={}",
    key: "wik",
    title: "en.wikipedia",
  },
  {
    path: "https://github.com/search?q={}&type=repositories",
    key: "git",
    title: "Github",
  },
  {
    path: "https://www.zhihu.com/search?q={}",
    key: "zh",
    title: "知乎",
  },
];

const defaultFirstEngine = {
  path: "https://www.google.com/search?q={}",
  key: "go",
  title: "Google",
};

const inputReg = / .*$/;

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    let data;
    try {
      data = await chrome.storage.sync.get(["ssEnginesData"]);
    } catch (error) {}
    console.log(data.ssEnginesData,'data.ssEnginesDatadata.ssEnginesData');
    if (!data.ssEnginesData) {
      chrome.storage.sync.set({
        ssEnginesData: {
          engines: defaultEngines,
        },
      });
    }
  }
});

chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
  const { key, keyword } = getInputInfo(input);
  const { ssEnginesData = {} } = await chrome.storage.sync.get("ssEnginesData");
  const engines = ssEnginesData.engines || [];

  const filters = engines.filter((val) => {
    return (
      val.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
      val.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
      (key && val.key.toLowerCase().indexOf(key.toLowerCase()) > -1) ||
      (key && val.title.toLowerCase().indexOf(key.toLowerCase()) > -1)
    );
  });

  const suggestions = filters.map((item) => {
    return {
      content: `${item.key} keywords`,
      description: `${item.title}: ${item.key}`,
    };
  });

  suggest(suggestions);
});

/**
 * handle user input information
 */
chrome.omnibox.onInputEntered.addListener(async (input, a, b, c) => {
  if (input.indexOf("sys") > -1) {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("option/index.html"));
    }
    return;
  }

  let selEngine = null; // search engine

  const { ssEnginesData = {} } = await chrome.storage.sync.get("ssEnginesData");
  const engines = ssEnginesData.engines || [];

  const defaultEngine = engines.find((val) => val.isDefault) || defaultFirstEngine;

  let { key, keyword } = getInputInfo(input);

  if (key) {
    selEngine = engines.find((val) => val.key === key);
    if (!selEngine) {
      keyword = input;
    }
  } else {
    selEngine = engines.find((val) => val.key === keyword);
    if (selEngine) {
      keyword = ''
    }
  }
  selEngine = selEngine || defaultEngine;

  const url = selEngine.path.replace("{}", keyword);
  run(url);
});

/**
 * 获取用户输入信息引擎 + 搜索关键字
 * 类型
 * w1
 * go w1
 * go w1 w2
 * go|ba w1
 * go|ba w1 w2
 *
 */
function getInputInfo(input) {
  let key = "";
  let keyword = "";

  input = input.trim();
  const matchRes = input.match(inputReg);

  if (matchRes) {
    keyword = input.slice(matchRes.index + 1);
    key = input.slice(0, matchRes.index);
  } else {
    keyword = input;
  }
  return { key, keyword };
}

/**
 * open search page
 */
async function run(url) {
  const { id } = (await chrome.tabs.getCurrent()) || {};
  chrome.tabs.update(id, {
    active: true,
    url: url,
  });
}
