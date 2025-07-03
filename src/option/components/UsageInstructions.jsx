import React from "react";
import { Card, Typography, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

export default function UsageInstructions() {
  return (
    <Card title="How to Use" style={{ marginTop: 24 }}>
      <Space direction="vertical" size="middle">
        <Title level={5}>Basic Usage</Title>
        <Paragraph>
          <Text strong>1.</Text> Type <Text code>as</Text> in browser address
          bar, then press <Text code>Tab</Text> or <Text code>Space</Text> to
          activate
        </Paragraph>
        <Paragraph>
          <Text strong>2.</Text> Type your search keyword followed by the engine
          key
          <br />
          <Text strong>Example: </Text>
          <Text code>go how to use TypeGo</Text> will search Google for "how to
          use TypeGo"
        </Paragraph>

        <Title level={5}>Advanced Features</Title>
        <Paragraph>
          <Text strong>Custom Search Engines:</Text> You can add your own search
          engines in this options page
        </Paragraph>
        <Paragraph>
          <Text strong>Default Engine:</Text> Set one engine as default to use
          without specifying key
          <br />
          <Text strong>Example: </Text>
          <Text code>how to use TypeGo</Text> will search using your default
          engine
        </Paragraph>

        <Paragraph>
          <Text strong>URL Template:</Text> Use {} as placeholder for your
          search query
          <br />
          <Text strong>Example: </Text>
          <Text code>{`https://www.google.com/search?q={}`}</Text> will search
          Google with your query
        </Paragraph>
      </Space>
    </Card>
  );
}
