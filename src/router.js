import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Layouts
import Layout from "./components/Layout";
import { Map } from "./pages/Map";
import { MapSettings } from "./pages/MapSettings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/map" replace={true} />} />
      <Route path="/map" element={<Map />} />
      <Route path="/map-settings" element={<MapSettings />} />
    </Route>
  )
);

const routerContainer = () => <RouterProvider router={router} />;

export default routerContainer;
