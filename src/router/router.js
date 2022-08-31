import { Routes, Route } from 'react-router-dom';
import { ROUTE } from '../common/utils/constant';
import Main from '../components/Main/Main';
import NotFound from '../components/NotFound/NotFound';
import Todo from '../components/Todo/Todo';

function Router() {
  return (
    <>
      <Routes>
        <Route path={ROUTE.MAIN} element={<Main />} />
        <Route path={ROUTE.TODO} element={<Todo />} />
        <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
