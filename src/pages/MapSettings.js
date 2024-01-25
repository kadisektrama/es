import { Table, Space, Popconfirm, Button, Modal } from "antd";
import styles from "./MapSettings.module.scss";
import { useState } from "react";
import { MapObject } from "../components/forms/MapObject";
import { useLocalStorage } from "../shared/hooks/localStorage";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

export const MapSettings = () => {
  const [modalWindowOpen, setModalWindowOpen] = useState(false);
  const [data, setData] = useState(false);
  const [
    localStorageValue,
    createLocalStorageValue,
    updateLocalStorageValue,
    deleteLocalStorageValue,
  ] = useLocalStorage("mapObject");

  const handleCreate = (values) => {
    createLocalStorageValue(values);
    setModalWindowOpen(false);
  };

  const handleUpdate = (values) => {
    updateLocalStorageValue(values);
    setModalWindowOpen(false);
  };

  const handleDelete = (id) => {
    deleteLocalStorageValue(id);
  };

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
          <span
            className={styles.table__link}
            onClick={() => {
              setData(record);
              setModalWindowOpen("update");
            }}
          >
            Edit
          </span>

          <Popconfirm
            placement="top"
            title={"Deleting"}
            description={"Are you sure that you want to delete book?"}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <span className={styles.table__link}>Delete</span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="map-settings">
        <div className={styles["map-settings__header"]}>
          <h2>Map Settings</h2>
          <Button type="primary" onClick={() => setModalWindowOpen("create")}>
            Add
          </Button>
        </div>
        <Table dataSource={localStorageValue} columns={columns} rowKey="id" />;
      </div>

      <Modal
        open={modalWindowOpen === "create"}
        title="Сreating a map object"
        onOk={() => setModalWindowOpen(false)}
        onCancel={() => setModalWindowOpen(false)}
        footer={null}
        width={800}
      >
        <MapObject create={handleCreate} />
      </Modal>

      <Modal
        open={modalWindowOpen === "update"}
        title="Updating a map object"
        onOk={() => setModalWindowOpen(false)}
        onCancel={() => setModalWindowOpen(false)}
        footer={null}
        width={800}
      >
        {data && <MapObject update={handleUpdate} defaultValues={data} />}
      </Modal>
    </>
  );
};
