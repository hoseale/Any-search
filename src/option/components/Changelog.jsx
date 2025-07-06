import React, { useEffect, useMemo, useState } from "react";
import { Timeline, Tag, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Changelog = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/hoseale/Any-search/refs/heads/main/src/changelog.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  }, []);

  const version = useMemo(() => {
    return chrome.runtime.getManifest().version;
  }, [data]);

  return (
    <div style={{ paddingBottom: "16px" }}>
      <Title level={5} style={{ marginBottom: 24 }}>
        Current Version: {version}
      </Title>

      <Timeline mode="left">
        {data?.map((item) => (
          <Timeline.Item key={item.version}>
            <div style={{ marginBottom: 8 }}>
              <Tag color="blue">v{item.version}</Tag>
              <span style={{ marginLeft: 8 }}>{item.date}</span>
            </div>
            <Paragraph style={{ marginLeft: 24 }}>
              {item.log.map((change, i) => (
                <div key={i}>• {change}</div>
              ))}
            </Paragraph>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default Changelog;
