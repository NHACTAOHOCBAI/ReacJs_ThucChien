/* eslint-disable @typescript-eslint/no-unused-vars */
import "styles/global.scss"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '@/layout'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BookPage from 'pages/client/book';
import AboutPage from 'pages/client/about';
import LoginPage from 'pages/client/auth/login';
import RegisterPage from 'pages/client/auth/register';
import HomePage from "pages/client/home";
import { App, ConfigProvider } from "antd";
import { CurrentUserContext } from "components/context/app.context";
import ProtectedRoute from "components/protectedPage/auth";
import AdminLayout from "components/layout/admin.layout";
import DashboardPage from "pages/admin/dashboard";
import ManageBookPage from "pages/admin/manage.book";
import ManageOrderPage from "pages/admin/manage.order";
import ManageUserPage from "pages/admin/manage.user";
import enUS from 'antd/locale/en_US';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/book",
        element: <BookPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/checkout",
        element: <ProtectedRoute>
          <div>checkout </div>
        </ProtectedRoute>
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "book",
        element: <ManageBookPage />
      },
      {
        path: "order",
        element: <ManageOrderPage />
      },
      {
        path: "user",
        element: <ManageUserPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentUserContext>
      <App>
        <ConfigProvider locale={enUS}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </App>
    </CurrentUserContext>
  </StrictMode>,
)
