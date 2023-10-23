import React, { useCallback } from "react";
import { Button, Switch } from "antd";

export default function () {
  const toOpion = useCallback(() => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("option/index.html"));
    }
  }, []);

  return (
    <div style={{ width: 375 }}>
      <h3>Instructions</h3>
      <p>1. Input 'as' in the address bar.</p>
      <p>2. Select 'Any Search'. (press the space bar to quickly select)</p>
      <p>3. Input the search engine key + space + the field you want to search, such as 'go google translate'.</p>

      <p>'go' means google search, you can change it if you don't like it.</p>
      <p>In addition, you can directly input 'google translate', and the default engine will be used.</p>

      <Button type="link" size="small" onClick={toOpion}>
        Manage search engines
      </Button>
    </div>
  );
}
