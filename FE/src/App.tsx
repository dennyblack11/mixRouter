import { RouterProvider } from "react-router-dom";
import { Router } from "./router/Router";

const App = () => {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
};

export default App;
