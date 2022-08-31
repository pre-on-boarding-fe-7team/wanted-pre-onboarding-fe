import { Routes, Route } from 'react-router-dom';
import { ROUTE } from '../common/utils/constant';
import MainPage from '../pages/Main';
import TodoPage from '../pages/Todo';
import NotFoundPage from '../pages/NotFound';

function Router() {
  return (
    <>
      <Routes>
        <Route path={ROUTE.MAIN} element={<MainPage />} />
        <Route path={ROUTE.TODO} element={<TodoPage />} />
        <Route path={ROUTE.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default Router;
