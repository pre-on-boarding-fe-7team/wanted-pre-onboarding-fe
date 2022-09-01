import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTodoList, getTodoList, postTodoList, updateTodoList } from './api';
import List from './List';
import { TodoListContainer as OuterContainer, InnerContainer, Title, PostForm } from './Todo.style';

function Todo() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [addTodoInputValue, setAddTodoInputValue] = useState('');

  const getTodos = async () => {
    try {
      const result = await getTodoList();
      setTodoList(result);
    } catch (e) {
      throw new Error(e);
    }
  };

  const postAndGetTodoList = async e => {
    e.preventDefault();
    try {
      await postTodoList(addTodoInputValue);
      getTodos();
      clearTodoInput();
      alert(`TodoList에 ${addTodoInputValue}(이)가 추가되었습니다.`);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleDeleteTodo = async (id, modifyTodoInputValue) => {
    try {
      await deleteTodoList(id);
      getTodos();
      alert(`TodoList에서 ${modifyTodoInputValue}(이)가 삭제되었습니다.`);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleUpdateTodo = async (modifiedTodo, id, isCompleted) => {
    try {
      await updateTodoList(modifiedTodo, id, isCompleted);
      handleChangeUpdateTodo(modifiedTodo, id);
      alert(`${modifiedTodo}(으)로 수정되었습니다.`);
    } catch (e) {
      throw new Error(e);
    }
  };

  const clearTodoInput = () => {
    setAddTodoInputValue('');
  };
  const handleChangeAddTodo = e => {
    setAddTodoInputValue(e.target.value);
  };

  const handleIsCompleteTodo = async (todo, id, isCompleted) => {
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
    await updateTodoList(todo, id, isCompleted);
    if (isCompleted) {
      alert(`${todo}이(가) 완료 처리되었습니다.`);
    } else {
      alert(`${todo}이(가) 미완료 처리되었습니다.`);
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

  const inputRef = useRef();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
    try {
      getTodos();
    } catch (e) {
      throw new Error(e);
    }
    inputRef.current.focus();
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
                key={`key-${index}`}
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
