/*eslint comma-dangle: ["error", "always-multiline"]*/
import { lazy } from 'react'

// ** Document title
const TemplateTitle = 'Trichter Admin Panel'

// ** Default Route
const DefaultRoute = '/companies'

// ** Merge Routes
const Routes = [
  {
    path: '/companies',
    component: lazy(() => import('../../views/company/Companies')),
    exact: true,
  },
  {
    path: '/companies/:id',
    component: lazy(() => import('../../views/company/CompanyDetails')),
    exact: true,
  },
  {
    path: '/employees',
    component: lazy(() => import('../../views/employee/Employees')),
    exact: true,
  },
  {
    path: '/employees/:id',
    component: lazy(() => import('../../views/employee/EmployeeDetails')),
    exact: true,
  },
  {
    path: '/products',
    component: lazy(() => import('../../views/product/Products')),
    exact: true,
  },
  {
    path: '/add-product',
    component: lazy(() => import('../../views/product/AddProduct')),
    exact: true,
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/add-content',
    component: lazy(() => import('../../views/content/add-content')),
  },
  {
    path: '/add-sponsor',
    component: lazy(() => import('../../views/sponsor/add')),
  },
  {
    path: '/sponsors',
    component: lazy(() => import('../../views/sponsor/fetch')),
  },
  {
    path: '/list-contact-info',
    component: lazy(() => import('../../views/contact-info/fetch')),
  },
  {
    path: '/list-page-sections',
    component: lazy(() => import('../../views/page-section/fetch')),
  },
  {
    path: '/contact-info-details/:id',
    component: lazy(() => import('../../views/contact-info/details')),
    exact: true,
  },
  {
    path: '/page-key-values',
    component: lazy(() => import('../../views/page-key-value/list')),
    exact: true,
  },
  {
    path: '/page-key-value',
    component: lazy(() => import('../../views/page-key-value/details')),
    exact: true,
  },
  {
    path: '/add-page-key-value',
    component: lazy(() => import('../../views/page-key-value/add')),
    exact: true,
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/stats',
    component: lazy(() => import('../../views/Stats')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true,
    },
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/404/Error')),
    layout: 'BlankLayout',
  },
]

export { DefaultRoute, TemplateTitle, Routes }
