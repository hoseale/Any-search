import React from "react";
import { Timeline, Tag, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Changelog = () => {
  const changelogData = [
    {
      version: "1.0.2",
      date: "2025-06-01",
      log: ["优化指令提示", "优化 UI"],
    },
    {
      version: "1.0.3",
      date: "2025-06-01",
      log: ["更新记录", "优化 UI"],
    },
  ];

  return (
    <div style={{ paddingBottom: "16px" }}>
      <Timeline mode="left">
        {changelogData?.map((item) => (
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
