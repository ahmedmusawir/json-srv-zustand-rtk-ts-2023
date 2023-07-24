import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import IframeTestPage from "./pages/IframePage";
import Demo from "./pages/Demo";
import UsersAdminPage from "./ZUSTAND-PROJECT/pages/UsersAdminPage";
import UserDetailPage from "./ZUSTAND-PROJECT/pages/UserDetailPage";
import ContactsRTKPage from "./REDUX-RTK-STRAPI-PROJECT/pages/ContactsRTKPage";
import ContactDetails from "./REDUX-RTK-STRAPI-PROJECT/components/ContactDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "iframe", element: <IframeTestPage /> },
      // THE FOLLOWING IS FOR AXIOS HTTP PROJECT W/ LOCAL JSON SERVER @ http://localhost:3500
      {
        path: "users",
        element: <UsersAdminPage />,
        children: [{ path: ":id", element: <UserDetailPage /> }],
      },
      // THE FOLLOWING IS THE BASE PROJECT - GHL CONTACTS WITH LOCAL JSON SERVER @ http://localhost:3500
      {
        path: "contacts",
        element: <ContactsRTKPage />,
        children: [{ path: ":id", element: <ContactDetails /> }],
      },
      { path: "demo", element: <Demo /> },
    ],
  },
]);

export default router;
