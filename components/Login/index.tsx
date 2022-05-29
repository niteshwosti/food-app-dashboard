import { Alert, Button, Form, Input, notification } from "antd";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { executeLogin } from "../../service/login";

const MainWrapper = styled.div`
  background-image: url("background.jpeg");
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background: white; */
  .ant-form {
    margin-top: 24px;
  }
`;
const FormItemWrapper = styled.div`
  display: block;
  margin-top: 24px;
  .ant-input {
    height: 40px;
  }
`;
const Container = styled.div`
  margin-top: -50px;
  background: white;
  border: 1px solid #cccccc73;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 22px 70px 4px rgb(0 0 0 / 56%);
  min-width: 400px;
  @media (max-height: 430px) {
    margin-top: 0px;
  }
`;

const Label = styled.span`
  line-height: 22px;
`;
const StyledFormItem = styled.div`
  display: flex;
  justify-content: center;
  min-width: 300px;
  margin-top: 30px;
  & .ant-btn-primary {
    border-radius: 5px;
    width: 200px;
  }
`;

const ForgotPasswordDiv = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: #ff6b00;
  font-size: 12px;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Login = () => {
  const router = useRouter();

  const { mutate: handleLoginSubmit, isLoading } = useMutation(executeLogin, {
    onSuccess: (res) => {
      console.log(res);
      localStorage.setItem("access_token", res.access_token);
      router.push("/orders");
    },
    onError: () => {
      notification.open({
        message: "Email or Password is incorrect",
      });
    },
  });

  const handleSubmit = () => {
    handleLoginSubmit({
      ...formik.values,
    });
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <MainWrapper>
        <Container>
          <ImageContainer>
            <img src="FitFood.png" height={80} />
          </ImageContainer>
          <Form onFinish={formik.handleSubmit} layout="vertical">
            <FormItemWrapper>
              <Label>Email Address</Label>
              <Input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </FormItemWrapper>
            <FormItemWrapper>
              <Label>Password </Label>
              <Input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormItemWrapper>
            <StyledFormItem>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                loading={isLoading}
              >
                Login
              </Button>
            </StyledFormItem>
          </Form>
        </Container>
      </MainWrapper>
    </>
  );
};
export { Login };
