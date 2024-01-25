import { Table, Space, Popconfirm, Button, Modal } from "antd";
import styles from "./MapSettings.module.scss";
import { useState } from "react";
import { MapObject } from "../components/forms/MapObject";
import { useLocalStorage } from "../shared/hooks/localStorage";
//import "leaflet/dist/leaflet.css";
//import "leaflet-draw/dist/leaflet.draw.css";

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
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Тип",
      key: "type",
      render: (_, record) => (
        <span>{record.type === "point" ? "Точка" : "Линия"}</span>
      ),
    },
    {
      title: "Действия",
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
            Редактировать
          </span>

          <Popconfirm
            placement="top"
            title={"Удаление"}
            description={"Вы уверены, что хотите удалить объект?"}
            onConfirm={() => handleDelete(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <span className={styles.table__link}>Удалить</span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="map-settings">
        <div className={styles["map-settings__header"]}>
          <h2>Настройки карты</h2>
          <Button type="primary" onClick={() => setModalWindowOpen("create")}>
            Создать
          </Button>
        </div>
        <Table dataSource={localStorageValue} columns={columns} rowKey="id" />
      </div>
      {modalWindowOpen === "create" && (
        <Modal
          open
          title="Сreating a map object"
          onCancel={() => {
            setModalWindowOpen(false);
            setData(false);
          }}
          footer={null}
          width={800}
        >
          <MapObject create={handleCreate} />
        </Modal>
      )}

      {modalWindowOpen === "update" && (
        <Modal
          open
          title="Updating a map object"
          onCancel={() => {
            setModalWindowOpen(false);
            setData(false);
          }}
          footer={null}
          width={800}
        >
          <MapObject update={handleUpdate} defaultValues={data} />
        </Modal>
      )}
    </>
  );
};
