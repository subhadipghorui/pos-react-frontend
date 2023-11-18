import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import Login from '../pages/guest/Login'
import Customers from '../pages/private/customers'
import BaseLayout from '../components/layouts/BaseLayout'
import PrivateRoute from '../middleware/PrivateRoute'
import CustomerList from '../pages/private/customers/list'
import CustomerCreate from '../pages/private/customers/create'
import CustomerEdit from '../pages/private/customers/edit'

const routes = [
    {path: "/", element: <Navigate to="login" />},
    {path: "/login", element: <Login />},
    {path: "/dashboard", element: <PrivateRoute element={<BaseLayout />} />, children: [
      {path: "", element: <Navigate to="customers" />},
      {path: "customers", element: <PrivateRoute element={<Customers />} />, children: [
        {path:"", element: <CustomerList />},
        {path:"create", element: <CustomerCreate />},
        {path:"edit/:id", element: <CustomerEdit />},
      ]},
    ]},
    { path: '*', element: <Navigate to="/" /> },
]
const AppRoutes = () => {
  const route = useRoutes(routes)
  return route
}

export default AppRoutes