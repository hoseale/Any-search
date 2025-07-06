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
  Tabs,
  Flex,
} from "antd";
import { QuestionCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import BuiltInCommands from "./components/BuiltInCommands";
import PluginIntroduction from "./components/PluginIntroduction";
import Changelog from "./components/Changelog";
import { builtInCommands } from "@/config";

const CustomCommands = () => {
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
    engines.forEach((val) => {
      if (!Array.isArray(val.path) && val.path) {
        val.path = [val.path];
      }
    });

    setData(engines);
    firstDone.current = true;
  }, [setData]);

  useEffect(() => {
    if (canUpdate.current) {
      const ls = data.map((val) => {
        const paths = val.path;
        const path = paths?.length == 1 ? paths[0] : paths;
        return {
          ...val,
          path,
        };
      });
      chrome.storage.sync.set({
        ssEnginesData: {
          engines: ls,
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
        path: [""],
      });
    } else if (editIndex > -1) {
      form.setFieldsValue({ ...data[editIndex] });
    }
  }, [data, editIndex, addVisible, form]);

  const onDel = useCallback(
    (record) => {
      const i = data.findIndex((val) => val.key === record.key);
      data.splice(i, 1);
      setData([...data]);
    },
    [data, setData]
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
    [data, setData]
  );

  const onFinish = (values) => {
    const key = values.key;
    const hasObj = data.find((val) => val.key === key);
    if (editIndex === -1 && hasObj) {
      message.error("This key already exists. Please use a unique key.");
      return;
    }

    const obj = builtInCommands.find((val) => val.key === key);
    if (obj) {
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
            <Tag color="blue">{text}</Tag>
            {record.isDefault && <Tag color="green">default</Tag>}
          </Space>
        );
      },
    },
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
          URL Template
          <Tooltip title="Search engine URL template. The '{}' placeholder will be replaced with your search query">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "path",
      render: (path) => (
        <Space direction="vertical">
          {path.map((path, i) => (
            <div key={i}>{path}</div>
          ))}
        </Space>
      ),
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
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Button
          type="link"
          size="small"
          onClick={() => {
            setAddVisible(true);
          }}
        >
          Add Command
        </Button>
      </Row>
      <Table
        dataSource={data}
        columns={cols}
        size="small"
        pagination={{ showSizeChanger: true, defaultPageSize: 50 }}
      />
      <Modal
        title={editIndex > -1 ? "Edit Command" : "Add New Command"}
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

          <Form.Item label="URL Templates" required>
            <Form.List name="path">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Flex key={key} align="start" gap={8}>
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[
                          {
                            required: true,
                            message: "Please enter URL template",
                          },
                        ]}
                        style={{ flex: 1 }}
                      >
                        <Input.TextArea placeholder="https://example.com/search?q={}" />
                      </Form.Item>
                      {fields.length > 1 && (
                        <CloseCircleOutlined
                          style={{
                            fontSize: 24,
                            color: "red",
                          }}
                          onClick={() => remove(name)}
                        />
                      )}
                    </Flex>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add URL Template
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default function () {
  const [activeTab, setActiveTab] = useState("custom");

  const items = [
    {
      key: "custom",
      label: "Custom Commands",
      children: <CustomCommands />,
    },
    {
      key: "builtin",
      label: "Built-in Commands",
      children: <BuiltInCommands />,
    },
    {
      key: "plugin",
      label: "Introduction",
      children: <PluginIntroduction />,
    },
    {
      key: "changelog",
      label: "Changelog",
      children: <Changelog />,
    },
  ];

  return (
    <>
      <div style={{ padding: "16px" }}>
        <Row align="middle">
          <img
            style={{
              width: 24,
              height: 24,
              marginRight: 10,
              display: "block",
            }}
            src="../images/logo.png"
            alt="Logo"
          />
          <span style={{ fontWeight: "bold" }}>TypeGo Settings</span>
        </Row>

        <Row justify="center">
          <Col span={18}>
            <Tabs
              items={items}
              activeKey={activeTab}
              onChange={setActiveTab}
              centered
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
