import React from "react";
import { Table, Tag, Row, Col } from "antd";
import { builtInCommands } from "@/config";

const BuiltInCommands = () => {
  const data = builtInCommands;

  const columns = [
    {
      title: "Command",
      dataIndex: "key",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Usage Example",
      dataIndex: "example",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
    />
  );
};

export default BuiltInCommands;
