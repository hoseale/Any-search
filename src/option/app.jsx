import React, { useState, useEffect, useCallback, useRef } from "react";
import { Space, Button, Table, Tag, Modal, Form, Input, message, Col, Row, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

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
    const { ssEnginesData = {} } = await chrome.storage.sync.get("ssEnginesData");
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
      message.error("The same key already exists");
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
          title
          <Tooltip title="when the keyword you enter matches the engine key, the title will be displayed, so you know which engine it is">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "title",
    },
    {
      title: (
        <span>
          key
          <Tooltip title="the unique identifier of the search engine, the extension will determine which search engine to execute according to the key you input">
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
          path
          <Tooltip title="engine address, '{}' will be replaced by the search field you entered">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: "path",
    },
    {
      title: "action",
      dataIndex: "action",
      render: (text, record) => {
        const index = data.findIndex((val) => val.key === record.key);
        return (
          <>
            <Button type="link" size="small" onClick={onDel.bind(this, record)}>
              delete
            </Button>

            <Button
              type="link"
              size="small"
              onClick={() => {
                setIndex(index);
              }}
            >
              edit
            </Button>
            {!record.isDefault && (
              <Button type="link" size="small" onClick={onChangeItem.bind(this, record)}>
                default
              </Button>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ padding: "80px 0 40px 0" }}>
        <Row justify="center">
          <img style={{ width: 80, height: 80 }} src="../images/logo.png"></img>
        </Row>
        <Row justify="center">
          <h1>ANY SEARCH</h1>
        </Row>
      </div>
      <Row justify="center">
        <Col span={12}>
          <Row justify="space-between">
            <h3>Search engine list</h3>
            <Button
              type="link"
              size="small"
              onClick={() => {
                setAddVisible(true);
              }}
            >
              Add search engine
            </Button>
          </Row>
          <Table dataSource={data} columns={cols} size="small"></Table>
        </Col>
      </Row>
      <Modal
        title={editIndex > -1 ? "Edit" : "Add"}
        open={addVisible || editIndex > -1}
        onOk={onOk}
        onCancel={() => {
          setAddVisible(false);
          setIndex(-1);
        }}
      >
        <Form
          name="engineItem"
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          initialValues={editIndex > -1 ? data[editIndex] : {}}
          onFinish={onFinish}
        >
          <Form.Item label="title" name="title" rules={[{ required: true, message: "Please input title!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="key" name="key" rules={[{ required: true, message: "Please input key!" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="path" name="path" rules={[{ required: true, message: "Please input path!" }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
