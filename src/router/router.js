import { Routes, Route } from 'react-router-dom';
import { ROUTE } from '../common/utils/constant';
import MainPage from '../pages/Main';

function Router() {
  return (
    <>
      <Routes>
        <Route path={ROUTE.MAIN} element={<MainPage />} />
      </Routes>
    </>
  );
}

export default Router;
