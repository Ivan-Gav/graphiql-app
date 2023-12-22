import { onAuthStateChanged } from 'firebase/auth';
import React, { lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthRoutes from 'src/components/PrivateRoutes/AuthRoutes/AuthRoutes';
import { useAppDispatch } from '../hooks/redux';

import RootLayout from '../layout/RootLayout';
import { auth, setUser } from '../store/slice/user.slice';

const MainPage = lazy(() => import('./MainPage/MainPage'));
const SignInPage = lazy(() => import('./SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./SignUpPage/SignUpPage'));
const Page404 = lazy(() => import('./404/404'));
const GraphiQLPage = lazy(() => import('./GraphiQLPage/GraphiQLPage'));

const Router = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setUser({ email: user?.email || null }));
    });
  }, [dispatch, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainPage />} />
        <Route element={<AuthRoutes />}>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
        <Route path="graphiql" element={<GraphiQLPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default Router;
