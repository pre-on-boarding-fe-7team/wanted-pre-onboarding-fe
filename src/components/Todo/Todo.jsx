import React, { useEffect, useState } from 'react';
import { deleteTodoList, getTodoList, postTodoList, updateTodoList } from './api';
import getMessage from '../../common/utils/getMessage';
import useInput from '../../hooks/useInput';
import List from './List';
import { useNavigate } from 'react-router-dom';
import { TodoListContainer as OuterContainer, InnerContainer, Title, PostForm } from './Todo.style';

function Todo() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [addTodoInputValue, handleChangeAddTodo, setAddTodoInputValue] = useInput('');

  const getTodos = async () => {
    try {
      const result = await getTodoList();
      setTodoList(result);
    } catch (e) {
      alert(getMessage('REQUEST_FAILED'));
      throw new Error(e);
    }
  };

  const postAndGetTodoList = async e => {
    e.preventDefault();
    try {
      await postTodoList(addTodoInputValue);
      getTodos();
      setAddTodoInputValue('');
      alert(getMessage('CREATE', addTodoInputValue));
    } catch (e) {
      alert(getMessage('REQUEST_FAILED'));
      throw new Error(e);
    }
  };

  const handleDeleteTodo = async (id, modifyTodoInputValue) => {
    try {
      await deleteTodoList(id);
      getTodos();
      alert(getMessage('DELETE', modifyTodoInputValue));
    } catch (e) {
      alert(getMessage('REQUEST_FAILED'));
      throw new Error(e);
    }
  };

  const handleUpdateTodo = async (modifiedTodo, id, isCompleted) => {
    try {
      await updateTodoList(modifiedTodo, id, isCompleted);
      handleChangeUpdateTodo(modifiedTodo, id);
      alert(getMessage('UPDATE', modifiedTodo));
    } catch (e) {
      alert(getMessage('REQUEST_FAILED'));
      throw new Error(e);
    }
  };

  const handleIsCompleteTodo = async (todo, id, isCompleted) => {
    try {
      await updateTodoList(todo, id, isCompleted);
      alert(getMessage(isCompleted ? 'COMPLETED' : 'NOT_COMPLETE', todo));
      setTodoList(cur => {
        return cur.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              isCompleted: isCompleted,
            };
          } else {
            return todo;
          }
        });
      });
    } catch (e) {
      alert(getMessage('REQUEST_FAILED'));
      throw new Error(e);
    }
  };
  const handleChangeUpdateTodo = (todo, id) => {
    setTodoList(cur => {
      return cur.map(curTodo => {
        if (curTodo.id === id) {
          return {
            ...curTodo,
            todo,
          };
        } else {
          return curTodo;
        }
      });
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
    try {
      getTodos();
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return (
    <OuterContainer>
      <Title>Today Todo List</Title>
      <InnerContainer>
        <PostForm>
          <form onSubmit={postAndGetTodoList}>
            <label>
              Add Todo List
              <input
                type="text"
                name="todoList"
                value={addTodoInputValue}
                onChange={handleChangeAddTodo}
                autoFocus
              />
            </label>
            <input type="submit" value="할 일 추가" />
          </form>
        </PostForm>
        {todoList && (
          <ul>
            {todoList?.map((todo, index) => (
              <List
                {...todo}
                key={todo.id}
                handleIsCompleteTodo={handleIsCompleteTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleUpdateTodo={handleUpdateTodo}
              />
            ))}
          </ul>
        )}
      </InnerContainer>
    </OuterContainer>
  );
}

export default Todo;
