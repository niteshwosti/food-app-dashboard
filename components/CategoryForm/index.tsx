import { Alert, Button, Form, Input, Layout } from "antd";
import React from "react";
import { Sidebar } from "../../components/Sidebar";
import styled from "styled-components";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { addCategory, getCategoryById } from "../../service/category";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  .ant-layout {
    background: #f0f2f5;
  }
  .ant-layout-content {
    padding: 24px;
    margin: 0;
    min-height: 280px;
    background-color: white;
  }
  .inside-header {
    font-size: 24px;
    padding-left: 24px;
    font-weight: bold;
    background-color: #fff;
    margin-bottom: 8px;
  }
`;
const FormWrapper = styled.div`
  padding: 24px;
  max-width: 500px;
`;
const FormItemWrapper = styled.div`
  min-height: 80px;
`;
const ButtonWrapper = styled.div`
  margin-bottom: 8px;
`;

interface Props {
  isEdit?: boolean;
}

const CategoryForm = ({ isEdit }: Props) => {
  const { Header, Sider, Content } = Layout;
  const router = useRouter();

  const { mutate: handleCategorySubmit, isLoading } = useMutation(addCategory, {
    onSuccess: () => {
      router.push("/category");
      Alert({
        type: "success",
        message: "Added Successfully.",
      });
    },
    onError: () => {
      Alert({
        type: "error",
        message: "Something went wrong",
      });
    },
  });
  const { mutate: handleCategoryEdit, isLoading: loading } = useMutation(
    getCategoryById,
    {
      onSuccess: () => {
        router.push("/category");
        Alert({
          type: "success",
          message: "Edited Successfully.",
        });
      },
      onError: () => {
        Alert({
          type: "error",
          message: "Something went wrong",
        });
      },
    }
  );
  const handleSubmit = () => {
    handleCategorySubmit({
      ...formik.values,
    });
  };

  const handleEdit = () => {
    handleCategoryEdit({
      data: {
        ...formik.values,
      },
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    enableReinitialize: true,
    onSubmit: !isEdit ? handleSubmit : handleEdit,
  });

  return (
    <>
      <Wrapper>
        <Layout>
          <Header />
          <Layout>
            <Sider>
              <Sidebar />
            </Sider>
            <Layout style={{ padding: "24px" }}>
              <Content>
                <Header className="inside-header">Add Category</Header>
                <FormWrapper>
                  <Form onFinish={formik.handleSubmit}>
                    <FormItemWrapper>
                      <label>Category Name</label>
                      <Input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                    </FormItemWrapper>
                    <ButtonWrapper>
                      {!isEdit ? (
                        <Button
                          loading={isLoading}
                          htmlType="submit"
                          type="primary"
                        >
                          Add Category
                        </Button>
                      ) : (
                        <Button
                          loading={loading}
                          htmlType="submit"
                          type="primary"
                        >
                          Update Category
                        </Button>
                      )}
                    </ButtonWrapper>
                  </Form>
                </FormWrapper>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Wrapper>
    </>
  );
};
export default CategoryForm;
