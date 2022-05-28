import { Button, Form, Input, Layout, Select, Upload } from "antd";
import React from "react";
import { Sidebar } from "../../components/Sidebar";
import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";
import { useFormik } from "formik";
import { UploadOutlined } from "@ant-design/icons";
// import "../../public/logo.png"

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
const TextAreaWrapper = styled.div`
  min-height: 170px;
`;
const ButtonWrapper = styled.div`
  margin-bottom: 8px;
`;

const AddFood = () => {
  const { Header, Sider, Content } = Layout;

  const handleSubmit = () => {};
  const formik = useFormik({
    initialValues: {
      foodName: "",
      category: "",
      description: "",
      image: "",
      price: "",
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
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
                <Header className="inside-header">Add Food</Header>
                <FormWrapper>
                  <Form onFinish={formik.handleSubmit}>
                    <FormItemWrapper>
                      <label>Food Name</label>
                      <Input
                        type="text"
                        name="foodName"
                        onChange={formik.handleChange}
                        value={formik.values.foodName}
                      />
                    </FormItemWrapper>
                    <FormItemWrapper>
                      <label>Categories</label>
                      <br />
                      <Select
                        style={{ width: 200 }}
                        allowClear
                        value={formik.values.category}
                        onChange={(value) =>
                          formik.setFieldValue("categories", value)
                        }
                      />
                    </FormItemWrapper>
                    <FormItemWrapper>
                      <label>Upload Image</label>
                      <br />
                      <Upload name="image" onChange={formik.handleChange}>
                        <Button icon={<UploadOutlined />}>
                          {" "}
                          Click to upload
                        </Button>
                      </Upload>
                    </FormItemWrapper>
                    <TextAreaWrapper>
                      <label>Description</label>
                      <br />
                      <TextArea
                        name="description"
                        rows={5}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                      />
                    </TextAreaWrapper>
                    <FormItemWrapper>
                      <label>Price</label>
                      <br />
                      <Input
                        type="text"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                      />
                    </FormItemWrapper>
                    <ButtonWrapper>
                      <Button type="primary">Add</Button>
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
export default AddFood;
