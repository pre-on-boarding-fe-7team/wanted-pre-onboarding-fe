import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../common/utils/constant';
import { checkEmail, checkPassword } from '../../common/utils/checkValid';
import { post } from '../../api/api';
import { Container, Span } from './AuthForm.style';

function AuthForm({ isLoginPage, handleSetIsLoginPage }) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormValues(cur => {
      const newValues = { ...cur };
      newValues[e.target.name] = e.target.value;
      return newValues;
    });
  };

  const postForm = async e => {
    e.preventDefault();
    try {
      if (isLoginPage) {
        const token = await post('/auth/signin', formValues);

        localStorage.setItem('token', token.access_token);
        redirectToTodoPage();
      } else {
        await post('/auth/signup', formValues);
        changeRegisterToLogin();
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const changeRegisterToLogin = () => {
    alert('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.');
    setFormValues(cur => {
      return {
        ...cur,
        password: '',
      };
    });
    handleSetIsLoginPage(true);
  };

  const redirectToTodoPage = () => {
    navigate(ROUTE.TODO);
  };

  const [isValidEmail, setIsValidEmail] = useState(false);
  const emailValidation = () => {
    formValues.email.length > 0 && !checkEmail(formValues.email)
      ? setIsValidEmail(false)
      : setIsValidEmail(true);
  };

  const [isValidPw, setIsValidPw] = useState(false);
  const pwValidation = () => {
    formValues.password.length > 0 && !checkPassword(formValues.password)
      ? setIsValidPw(false)
      : setIsValidPw(true);
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
          <input type="email" name="email" value={formValues.email} onChange={handleChange} />
        </label>
        {!isValidEmail && <Span>이메일 주소를 정확히 입력해주세요.</Span>}
      </Container>
      <Container>
        <label>
          비밀번호
          <input
            type="password"
            name="password"
            value={formValues.password}
            autoComplete="true"
            onChange={handleChange}
          />
        </label>
        {!isValidPw && <Span>8글자 이상 입력해주시요.</Span>}
      </Container>
      {
        <input
          type="submit"
          value="Submit"
          disabled={!(checkEmail(formValues.email) && checkPassword(formValues.password))}
        />
      }
    </form>
  );
}

export default AuthForm;
