import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../common/utils/constant';
import { checkEmail, checkPassword } from '../../common/utils/checkValid';
import { post } from '../../api/api';
import { Container, Span } from './AuthForm.style';
import getMessage from '../../common/utils/getMessage';
import useInput from '../../hooks/useInput';

function AuthForm({ isLoginPage, handleSetIsLoginPage }) {
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassWord, passwordValue] = useInput('');

  const postForm = async e => {
    e.preventDefault();
    try {
      if (isLoginPage) {
        const token = await post('/auth/signin', { email, password });

        localStorage.setItem('token', token.access_token);
        redirectToTodoPage();
      } else {
        await post('/auth/signup', { email, password });
        changeRegisterToLogin();
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const changeRegisterToLogin = () => {
    alert(getMessage('SIGNUP'));
    passwordValue('');
    handleSetIsLoginPage(true);
  };

  const redirectToTodoPage = () => {
    navigate(ROUTE.TODO);
  };

  const [isValidEmail, setIsValidEmail] = useState(false);
  const emailValidation = () => {
    email.length > 0 && !checkEmail(email) ? setIsValidEmail(false) : setIsValidEmail(true);
  };

  const [isValidPw, setIsValidPw] = useState(false);
  const pwValidation = () => {
    password.length > 0 && !checkPassword(password) ? setIsValidPw(false) : setIsValidPw(true);
  };

  useEffect(() => {
    emailValidation();
    pwValidation();
  });

  return (
    <form onSubmit={postForm}>
      <Container>
        <label>
          이메일
          <input type="email" name="email" value={email} onChange={onChangeEmail} autoFocus />
        </label>
        {!isValidEmail && <Span>이메일 주소를 정확히 입력해주세요.</Span>}
      </Container>
      <Container>
        <label>
          비밀번호
          <input
            type="password"
            name="password"
            value={password}
            autoComplete="true"
            onChange={onChangePassWord}
          />
        </label>
        {!isValidPw && <Span>8글자 이상 입력해주시요.</Span>}
      </Container>
      {
        <input
          type="submit"
          value="Submit"
          disabled={!(checkEmail(email) && checkPassword(password))}
        />
      }
    </form>
  );
}

export default AuthForm;
