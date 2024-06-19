import { Routes, Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';


const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage"));

function App() {

  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
      <>
        <Layout>
          <Suspense fallback={<Loader />}>
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RestrictedRoute component={<RegisterPage />} redirectTo='/contacts' />} />
          <Route path='/login' element={<RestrictedRoute component={<LoginPage />} redirectTo='/contacts' />} />
          <Route path='/contacts' element={<PrivateRoute component={<ContactsPage/>} redirectTo='/login'/>} />
          </Routes>
          </Suspense>
        </Layout>
        <Toaster position="top-right" />
        </>
  )
}
export default App;
