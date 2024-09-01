import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MinimalLayout from "./layouts/MinimalLayout";
import Controller from "./pages/Controller";
import Overlay from "./pages/Overlay";
import Ingame from "./pages/Ingame";

import { GlobalStyle } from "./globalStyles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MinimalLayout />,
    errorElement: <div>Naliligaw ka yata?</div>,
    children: [
      {
        index: true,
        element: <Overlay />
      },
      {
        path: "overlay",
        element: <Overlay />
      },
      {
        path: "controller",
        element: <Controller />
      },
      {
        path: "ingame",
        element: <Ingame />
      }
    ]
  },
]);

function App() {
  return (
    <>       
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
