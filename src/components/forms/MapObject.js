import { Button, Form, Input, Select } from "antd";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

const { Option } = Select;

export const MapObject = (props) => {
  const [form] = Form.useForm();
  const typeForm = Form.useWatch("type", form);
  const mapRef = useRef();
  let layerRef = useRef();

  useEffect(() => {
    form.setFieldsValue({
      ...props?.defaultValues,
    });

    return () => {
      mapRef.current &&
        layerRef.current &&
        mapRef.current.removeLayer(mapRef.current._layers[layerRef.current]);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && props?.defaultValues?.map) {
      let object =
        props.defaultValues.type === "point"
          ? new L.Marker(props.defaultValues.map)
          : new L.Polyline(props.defaultValues.map);
      mapRef.current.addLayer(object);
      layerRef.current = { ...object }._leaflet_id;
    }
  }, [mapRef.current]);

  const onFinish = (values) => {
    props?.defaultValues
      ? props.update({ ...props?.defaultValues, ...values })
      : props.create(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCreate = (e) => {
    const drawnItems = mapRef.current._layers;
    const currentLayer = drawnItems[e.layer._leaflet_id];

    form.setFieldsValue({
      map:
        e.layerType === "polyline"
          ? currentLayer._latlngs.map((o) => Object.values(o))
          : Object.values(currentLayer._latlng),
    });

    layerRef.current &&
      mapRef.current.removeLayer(drawnItems[layerRef.current]);
    layerRef.current = e.layer._leaflet_id;
  };

  const handleUnsetType = () => {
    form.setFieldsValue({
      map: null,
    });

    layerRef.current &&
      mapRef.current.removeLayer(mapRef.current._layers[layerRef.current]);
    layerRef.current = null;
  };

  return (
    <Form
      form={form}
      name="basic"
      labelAlign="left"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 20,
      }}
      style={{
        maxWidth: 800,
        marginTop: "24px",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Название"
        name="name"
        rules={[
          {
            required: true,
            message: "Введите название объекта!",
          },
        ]}
      >
        <Input placeholder="Название объекта" />
      </Form.Item>

      <Form.Item name="type" label="Тип" rules={[{ required: true }]}>
        <Select
          placeholder="Выберите тип объекта!"
          allowClear
          onChange={handleUnsetType}
        >
          <Option value="point">point</Option>
          <Option value="line">line</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Карта"
        name="map"
        rules={[
          {
            required: true,
            message: "Выберите объект на карте!",
          },
        ]}
      >
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "400px" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={onCreate}
              draw={{
                polyline: typeForm === "line",
                rectangle: false,
                circlemarker: false,
                circle: false,
                polygon: false,
                marker: typeForm === "point",
              }}
              edit={{
                edit: false,
                remove: false,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
