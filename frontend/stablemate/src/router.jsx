import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { RegisterPage } from "./components/RegisterPage.jsx";
import { LoginPage } from "./components/LoginPage.jsx"; 
import { ListPage } from "./components/ListPage.jsx";
import { ListIdPage } from "./components/ListIdPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
      {
        path:"login",
        element: <LoginPage/>,

      },
      {
        path:"home",
        element:<HomePage />
      },
      {
        path:"list",
        element:<ListPage />
      },
      {
        path:"list/:list_id",
        element: <ListIdPage />
      }
    ],
  },
]);

