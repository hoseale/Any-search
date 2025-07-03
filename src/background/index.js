import { initCommands } from "./commands";

const defaultEngines = [
  {
    path: "https://www.google.com/search?q={}",
    key: "g",
    title: "Google",
    isDefault: true,
  },
  {
    path: "https://chatgpt.com/?q={}",
    key: "cg",
    title: "ChatGPT",
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
    key: "gh",
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
  key: "g",
  title: "Google",
};

const inputReg = / .*$/;

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    let data;
    try {
      data = await chrome.storage.sync.get(["ssEnginesData"]);
    } catch (error) {}
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

  const { engines } = await getSearchEngine();
  let filters = engines;

  if (key) {
    filters = engines.filter((val) => {
      return (
        (key && val.key.toLowerCase().indexOf(key.toLowerCase()) > -1) ||
        (key && val.title.toLowerCase().indexOf(key.toLowerCase()) > -1)
      );
    });
  } else if (keyword) {
    filters = engines.filter((val) => {
      return (
        val.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
        val.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
      );
    });
  }

  const suggestions = filters.map((item) => {
    return {
      content: `${item.key} `,
      description: `${item.title}: ${item.key}`,
    };
  });

  const sys = {
    content: `sys`,
    description: "Extension Settings: sys",
  };

  suggest([...suggestions, sys]);
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

  const { engines, defaultEngine } = await getSearchEngine();

  let { key, keyword } = getInputInfo(input);

  if (key) {
    selEngine = engines.find((val) => val.key === key);
    if (!selEngine) {
      keyword = input;
    }
  } else if (keyword) {
    selEngine = engines.find((val) => val.key === keyword);
    if (selEngine) {
      keyword = "";
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

  // 只去除前面空格
  input = input.replace(/^\s+/, "");
  const matchRes = input.match(inputReg);

  if (matchRes) {
    keyword = input.slice(matchRes.index + 1);
    key = input.slice(0, matchRes.index);
  } else {
    keyword = input;
  }
  return { key, keyword };
}

// 获取所有搜索引擎
async function getSearchEngine(key) {
  const { ssEnginesData = {} } = await chrome.storage.sync.get("ssEnginesData");
  const engines = ssEnginesData.engines || [];

  const defaultEngine =
    engines.find((val) => val.isDefault) || defaultFirstEngine;

  return {
    engines,
    defaultEngine,
  };
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

initCommands();
