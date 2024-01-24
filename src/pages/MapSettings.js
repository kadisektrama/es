import { Table, Space, Popconfirm, Button, Modal } from "antd";
import styles from "./MapSettings.module.scss";
import { useEffect, useState } from "react";
import { MapObject } from "../components/forms/MapObject";

export const MapSettings = () => {
  const [modalWindowOpen, setModalWindowOpen] = useState(false);
  const handleDelete = (id) => {
    //localStorage.deleteProduct(id)
    //dispatch(fetchProducts(Object.fromEntries(searchParams.entries() || [])))
  };

  useEffect(() => {}, []);
  // point, line
  const dataSource = [
    {
      key: "1",
      name: "Single line",
      type: "line",
    },
    {
      key: "2",
      name: "Double line",
      type: "line",
    },
    {
      key: "3",
      name: "Moskow",
      type: "point",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => setModalWindowOpen(true)}>Edit</a>

          <Popconfirm
            placement="top"
            title={"Deleting"}
            description={"Are you sure that you want to delete book?"}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="map-settings">
      <div className={styles["map-settings__header"]}>
        <h2>Map Settings</h2>
        <Button type="primary" onClick={() => setModalWindowOpen(true)}>
          Add
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
      <Modal
        open={modalWindowOpen}
        title="Сreating a map object"
        onOk={() => setModalWindowOpen(false)}
        onCancel={() => setModalWindowOpen(false)}
        footer={null}
      >
        <MapObject />
      </Modal>
    </div>
  );
};
