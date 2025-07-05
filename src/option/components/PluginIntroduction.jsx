import React from "react";
import { Card, Typography, Divider } from "antd";
import UsageInstructions from "./UsageInstructions";
import SupportAuthor from "./SupportAuthor";

const { Title, Paragraph } = Typography;

const PluginIntroduction = () => {
  return (
    <div>
      <Card title="About TypeGo">
        <Paragraph>
          TypeGo is a powerful browser extension that allows you to quickly
          access websites and perform actions using simple commands.
        </Paragraph>
        <Divider />
        <Title level={4}>Key Features</Title>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ flex: "1 1 40%", minWidth: "200px" }}>
            <Title level={5} style={{ marginBottom: "4px" }}>
              Custom Commands
            </Title>
            <Paragraph style={{ marginBottom: 0 }}>
              Create your own commands to search on any website or perform
              custom actions.
            </Paragraph>
          </div>
          <div style={{ flex: "1 1 40%", minWidth: "200px" }}>
            <Title level={5} style={{ marginBottom: "4px" }}>
              Built-in Commands
            </Title>
            <Paragraph style={{ marginBottom: 0 }}>
              Access powerful built-in commands for tab management, history
              search, and more.
            </Paragraph>
          </div>
          <div style={{ flex: "1 1 40%", minWidth: "200px" }}>
            <Title level={5} style={{ marginBottom: "4px" }}>
              Fast Access
            </Title>
            <Paragraph style={{ marginBottom: 0 }}>
              Simply type your command in the address bar and get results
              instantly.
            </Paragraph>
          </div>
          {/* <div style={{ flex: '1 1 40%', minWidth: '200px' }}>
          <Title level={5} style={{ marginBottom: '4px', color: '#888' }}>Cross-Platform (Coming Soon)</Title>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            Support for Chrome, Edge, Firefox and other Chromium-based browsers will be available soon.
          </Paragraph>
        </div> */}
        </div>
      </Card>

      <UsageInstructions />
      <SupportAuthor />
    </div>
  );
};

export default PluginIntroduction;
