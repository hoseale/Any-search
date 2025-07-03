import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Space,
  Button,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  message,
  Col,
  Row,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import UsageInstructions from "./components/UsageInstructions";
import SupportAuthor from "./components/SupportAuthor";

export default function () {
  const [data, setData] = useState([]);
  const [addVisible, setAddVisible] = useState(false);
  const [editIndex, setIndex] = useState(-1);

  const [form] = Form.useForm();

  const firstDone = useRef(false);
  const canUpdate = useRef(false);

  useEffect(() => {
    initFn();
  }, []);

  const initFn = useCallback(async () => {
    const { ssEnginesData = {} } = await chrome.storage.sync.get(
      "ssEnginesData"
    );
    const engines = ssEnginesData.engines || [];
    setData(engines);
    firstDone.current = true;
  }, []);

  // 更新用户存储
  useEffect(() => {
    if (canUpdate.current) {
      chrome.storage.sync.set({
        ssEnginesData: {
          engines: data,
        },
      });
    }

    if (firstDone.current === true) {
      canUpdate.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (addVisible) {
      form.setFieldsValue({
        title: "",
        key: "",
        path: "",
      });
    } else if (editIndex > -1) {
      form.setFieldsValue({ ...data[editIndex] });
    }
  }, [data, editIndex, addVisible]);

  const onDel = useCallback(
    (record) => {
      const i = data.findIndex((val) => val.key === record.key);
      data.splice(i, 1);
      setData([...data]);
    },
    [data]
  );

  const onChangeItem = useCallback(
    (record) => {
      const i = data.findIndex((val) => val.key === record.key);
      data.forEach((val, index) => {
        if (index === i) {
          val.isDefault = true;
        } else {
          val.isDefault = false;
        }
      });
      setData([...data]);
    },
    [data]
  );

  const onFinish = (values) => {
    const key = values.key;
    const hasObj = data.find((val) => val.key === key);
    if (editIndex === -1 && hasObj) {
      message.error("This key already exists. Please use a unique key.");
      return;
    }

    if (key === "sys") {
      message.error("This key is reserved. Please use a different key.");
      return;
    }

    if (editIndex > -1) {
      data[editIndex] = { ...data[editIndex], ...values };
    } else {
      data.push(values);
    }
    setData([...data]);
    setAddVisible(false);
    setIndex(-1);
  };

  const onOk = () => {
    form.submit();
  };

  const cols = [
    {
      title: (
        <span>
          Title
          <Tooltip title="Displays the engine title when your keyword matches this engine's key">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "title",
    },
    {
      title: (
        <span>
          Key
          <Tooltip title="Unique engine identifier. The extension uses this key to select the appropriate search engine">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "key",
      render: (text, record) => {
        return (
          <Space>
            {text}
            {record.isDefault && <Tag color="green">default</Tag>}
          </Space>
        );
      },
    },
    {
      title: (
        <span>
          URL Template
          <Tooltip title="Search engine URL template. The '{}' placeholder will be replaced with your search query">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "path",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        const index = data.findIndex((val) => val.key === record.key);
        return (
          <>
            <Button type="link" size="small" onClick={onDel.bind(this, record)}>
              Delete
            </Button>

            <Button
              type="link"
              size="small"
              onClick={() => {
                setIndex(index);
              }}
            >
              Edit
            </Button>
            {!record.isDefault && (
              <Button
                type="link"
                size="small"
                onClick={onChangeItem.bind(this, record)}
              >
                Set as Default
              </Button>
            )}
          </>
        );
      },
      width: 260,
    },
  ];

  return (
    <>
      <div style={{ padding: "100px 0 40px 0" }}>
        <Row justify="center">
          <img style={{ width: 80, height: 80 }} src="../images/logo.png"></img>
        </Row>
        <Row justify="center">
          <h1>TypeGo Settings</h1>
        </Row>
        <Row justify="center">
          <Col span={18}>
            <Row justify="space-between">
              <h3>Search Engines</h3>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setAddVisible(true);
                }}
              >
                Add Engine
              </Button>
            </Row>
            <Table dataSource={data} columns={cols} size="small"></Table>
            <UsageInstructions />
            <SupportAuthor />
          </Col>
        </Row>
      </div>
      <Modal
        title={editIndex > -1 ? "Edit Search Engine" : "Add New Search Engine"}
        open={addVisible || editIndex > -1}
        onOk={onOk}
        onCancel={() => {
          setAddVisible(false);
          setIndex(-1);
        }}
      >
        <Form
          layout="vertical"
          name="engineItem"
          form={form}
          initialValues={editIndex > -1 ? data[editIndex] : {}}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Key"
            name="key"
            rules={[{ required: true, message: "Please enter a unique key" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="URL Template"
            name="path"
            rules={[
              { required: true, message: "Please enter the URL template" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
