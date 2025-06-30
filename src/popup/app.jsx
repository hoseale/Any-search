import React, { useCallback } from "react";
import { Button, Typography } from "antd";
const { Text } = Typography;

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
      <h3>Quick Start Guide</h3>
      <p>
        1. Type <Text code>as</Text> in browser address bar, then press Tab or
        Space to activate
      </p>
      <p>
        2. Enter your search command: <Text code>[engine-key] [query]</Text>
      </p>
      <p>
        Example: <Text code>gt hello world</Text> (searches "hello world" on
        Google Translate)
      </p>

      <Button type="link" size="small" onClick={toOpion}>
        Manage search engines
      </Button>
    </div>
  );
}
