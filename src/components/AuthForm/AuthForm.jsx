import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../common/utils/constant";
import { checkEmail, checkPassword } from "../../common/utils/checkValid";
import { post } from "../../api/api";
import { Container } from "./AuthForm.style";
import useInput from "../../hooks/useInput";

function AuthForm({ isLoginPage, handleSetIsLoginPage }) {
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassWord, passwordValue] = useInput("");

  const postForm = async (e) => {
    e.preventDefault();
    try {
      if (isLoginPage) {
        const token = await post("/auth/signin", {email, password});

        localStorage.setItem("token", token.access_token);
        redirectToTodoPage();
      } else {
        await post("/auth/signup",{email, password});
        changeRegisterToLogin();
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const changeRegisterToLogin = () => {
    alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
    passwordValue('');
    handleSetIsLoginPage(true);
  };

  const redirectToTodoPage = () => {
    navigate(ROUTE.TODO);
  };

  return (
    <form onSubmit={postForm}>
      <Container>
        <label>
          이메일
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
        </label>
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
      </Container>
      {
        <input
          type="submit"
          value="Submit"
          disabled={
            !(
              checkEmail(email) && checkPassword(password)
            )
          }
        />
      }
    </form>
  );
}

export default AuthForm;
