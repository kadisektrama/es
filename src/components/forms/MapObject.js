import { Button, Form, Input, Select } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

const { Option } = Select;
export const MapObject = (props) => {
  const [form] = Form.useForm();
  const typeForm = Form.useWatch("type", form);
  const mapRef = useRef();
  let { current } = useRef();

  useEffect(() => {
    unsetType();
  }, [typeForm]);

  const unsetType = useCallback(() => {
    form.setFieldsValue({
      ...props?.defaultValues,
      map: null,
    });

    const drawnItems = mapRef.current?._layers;
    current && mapRef.current.removeLayer(drawnItems[current]);
  }, [current]);

  useEffect(() => {
    form.setFieldsValue({ ...props?.defaultValues });
  }, [props?.defaultValues?.id, form]);

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
    const layer = drawnItems[e.layer._leaflet_id];

    form.setFieldsValue({
      ...props?.defaultValues,
      map:
        e.layerType === "polyline"
          ? layer._latlngs.map((o) => Object.values(o))
          : Object.values(layer._latlng),
    });

    current &&
      drawnItems[current] &&
      mapRef.current.removeLayer(drawnItems[current]);

    current = e.layer._leaflet_id;
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
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="type" label="Type" rules={[{ required: true }]}>
        <Select placeholder="Select a type of object" allowClear>
          <Option value="point">point</Option>
          <Option value="line">line</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Map"
        name="map"
        rules={[
          {
            required: true,
            message: "Please draw/choose object!",
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
