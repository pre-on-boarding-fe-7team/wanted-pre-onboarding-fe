import { useEffect, useState } from 'react';
import { ROUTE } from '../../common/utils/constant';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';
import { Container, Form, SwitchButton, Title } from './Main.style';

function Main() {
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleSetIsLoginPage = isLogin => {
    setIsLoginPage(isLogin);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate(ROUTE.TODO);
    }
  }, []);

  return (
    <Container>
      <Title>Welcome To Wanted pre onboarding Todo List</Title>
      <Form>
        {isLoginPage ? (
          <SwitchButton onClick={() => setIsLoginPage(false)}>회원가입 페이지로 이동</SwitchButton>
        ) : (
          <SwitchButton onClick={() => setIsLoginPage(true)}>로그인 페이지로 이동</SwitchButton>
        )}
        <AuthForm isLoginPage={isLoginPage} handleSetIsLoginPage={handleSetIsLoginPage} />
      </Form>
    </Container>
  );
}

export default Main;
