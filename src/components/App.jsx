import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { userRefreshThunk } from 'redux/auth/authThunk';
import PublicRoute from './PublicRoute/PublicRouter';
import PrivateRoute from './PrivateRoute/PrivatRouter';
import CalculatorPage from 'pages/CalculatorPage/CalculatorPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import MainPage from 'pages/MainPage/MainPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import DiaryPage from 'pages/DiaryPage/DiaryPage';
import { Layout } from './Layout/Layout';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const dispatch = useDispatch();

  const sid = useSelector(state => state.auth.sid);
  const isLoading = useSelector(state => state.auth.isLoading);
  useEffect(() => {
    if (sid) dispatch(userRefreshThunk(sid));
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="blabla" element={<p>blab</p>} />
            <Route path="calculator" element={<CalculatorPage />} />
            <Route path="diary" element={<DiaryPage />} />
          </Route>
          <Route path="/" element={<PublicRoute />}>
            <Route path="register" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
