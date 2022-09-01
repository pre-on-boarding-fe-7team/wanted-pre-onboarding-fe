import React, { useState, useRef } from 'react';
import {
  BtnContainer,
  Button as SubmitBtn,
  Button as CloseModifyBtn,
  Container,
  DeleteBtn,
  Form,
  ModifyBtn,
  ModifyInput,
  Title,
} from './List.style';

function List({ id, todo, isCompleted, handleIsCompleteTodo, handleDeleteTodo, handleUpdateTodo }) {
  const [isModify, setIsModify] = useState(false);
  const [modifyTodoInputValue, setModifyTodoInputValue] = useState(todo);
  const [tempInputValue, setTempInputValue] = useState(todo);

  const handleSubmitUpdateTodo = e => {
    e.preventDefault();
    setIsModify(false);
    handleUpdateTodo(modifyTodoInputValue, id, isCompleted);
  };

  const handleClickModifyButton = curTodo => {
    setIsModify(true);
    setTempInputValue(curTodo);
  };

  const handleClickCancelButton = () => {
    setIsModify(false);
    setModifyTodoInputValue(tempInputValue);
  };

  const handleChangeInputValue = e => {
    setModifyTodoInputValue(e.target.value);
  };

  const inputRef = useRef();

  return (
    <Container>
      <Form onSubmit={handleSubmitUpdateTodo} ref={inputRef}>
        <Title
          isCompleted={isCompleted}
          isModify={isModify}
          onClick={() => !isModify && handleIsCompleteTodo(todo, id, !isCompleted)}
        >
          <p>{modifyTodoInputValue}</p>

          {isModify && (
            <ModifyInput
              type="text"
              isModify={isModify}
              value={modifyTodoInputValue}
              onChange={handleChangeInputValue}
              placeholder="Todo를 작성해 주세요."
            />
          )}
        </Title>

        <BtnContainer>
          <ModifyBtn
            onClick={() => handleClickModifyButton(todo)}
            type="button"
            isModify={isModify}
          >
            수정
          </ModifyBtn>
          <DeleteBtn
            onClick={() => handleDeleteTodo(id, modifyTodoInputValue)}
            type="button"
            isModify={isModify}
          >
            삭제
          </DeleteBtn>

          <SubmitBtn type="submit" isModify={isModify}>
            제출
          </SubmitBtn>
          <CloseModifyBtn onClick={handleClickCancelButton} type="button" isModify={isModify}>
            취소
          </CloseModifyBtn>
        </BtnContainer>
      </Form>
    </Container>
  );
}

export default List;
