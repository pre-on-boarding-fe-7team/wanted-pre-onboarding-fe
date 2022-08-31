import * as api from '../../api/api';
import { API_URL } from '../../common/utils/constant';

export const postTodoList = todo => {
  return api.post(API_URL.TODO, {
    todo,
  });
};

export const getTodoList = () => {
  return api.get(API_URL.TODO);
};

export const updateTodoList = (todo, id, isCompleted) => {
  return api.put(`${API_URL.TODO}/${id}`, {
    todo,
    isCompleted,
  });
};

export const deleteTodoList = id => {
  return api.delete(`${API_URL.TODO}/${id}`);
};
