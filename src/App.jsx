

import { lazy, Suspense } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TokenContextProvider from './components/Context/TokenContext';
import CartContectProvider from './components/Context/cartcontext';
import Wishcontextprovider from './components/Context/Wishcontext';
import { Toaster } from 'react-hot-toast';
import Proudctedroute from './components/Proudctedroute/Proudctedroute';

// Skeleton Loader Component
const Skeleton = () => (
  <div style={{
    width: '100%',
    minHeight: '200px',
    background: '#e0e0e0',
    borderRadius: '8px',
    animation: 'pulse 1.5s infinite'
  }}></div>
);

// Lazy load Pages
const Home = lazy(() => import('./components/Home/Home'));
const Proudcts = lazy(() => import('./components/Proudcts/Proudcts'));
const Brand = lazy(() => import('./components/Brand/Brand'));
const Categerios = lazy(() => import('./components/Categerios/Categerios'));
const Register = lazy(() => import('./components/Register/Register'));
const Notfound = lazy(() => import('./components/Notfound/Notfound'));
const LogIn = lazy(() => import('./components/LogIn/LogIn'));
const SpecialProudct = lazy(() => import('./components/SpecialProudct/SpecialProudct'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Checkout = lazy(() => import('./components/Checkout/Checkout'));
const Orders = lazy(() => import('./components/Orders/Orders'));
const ResetPassword = lazy(() => import('./components/ResetPassword/ResetPassword'));
const ForgetPassword = lazy(() => import('./components/ForgetPassword/ForgetPassword'));
const VerifyCode = lazy(() => import('./components/VerifyCode/VerifyCode'));
const Wishlist = lazy(() => import('./components/Wishlist/Wishlist'));

// Router setup with Suspense fallback
const myApp = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<Skeleton />}><Home /></Suspense> },
      { path: 'brand', element: <Suspense fallback={<Skeleton />}><Brand /></Suspense> },
      { path: 'product', element: <Suspense fallback={<Skeleton />}><Proudcts /></Suspense> },
      { path: 'cart', element: <Proudctedroute><Suspense fallback={<Skeleton />}><Cart /></Suspense></Proudctedroute> },
      { path: 'categerios', element: <Suspense fallback={<Skeleton />}><Categerios /></Suspense> },
      { path: 'specialproudct/:id/:category', element: <Suspense fallback={<Skeleton />}><SpecialProudct /></Suspense> },
      { path: 'checkout', element: <Proudctedroute><Suspense fallback={<Skeleton />}><Checkout /></Suspense></Proudctedroute> },
      { path: 'allorders', element: <Proudctedroute><Suspense fallback={<Skeleton />}><Orders /></Suspense></Proudctedroute> },
      { path: 'wishlist', element: <Proudctedroute><Suspense fallback={<Skeleton />}><Wishlist /></Suspense></Proudctedroute> },
      { path: 'forget-password', element: <Suspense fallback={<Skeleton />}><ForgetPassword /></Suspense> },
      { path: 'reset-password', element: <Suspense fallback={<Skeleton />}><ResetPassword /></Suspense> },
      { path: 'verify-code', element: <Suspense fallback={<Skeleton />}><VerifyCode /></Suspense> },
      { path: 'register', element: <Suspense fallback={<Skeleton />}><Register /></Suspense> },
      { path: 'login', element: <Suspense fallback={<Skeleton />}><LogIn /></Suspense> },
      { path: '*', element: <Suspense fallback={<Skeleton />}><Notfound /></Suspense> },
    ]
  }
]);

function App() {
  return (
    <Wishcontextprovider>
      <CartContectProvider>
        <TokenContextProvider>
          <RouterProvider router={myApp} />
          <Toaster />
        </TokenContextProvider>
      </CartContectProvider>
    </Wishcontextprovider>
  );
}

export default App;

