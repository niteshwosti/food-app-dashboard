import {
  Button,
  Form,
  Input,
  Layout,
  notification,
  Select,
  Upload,
} from "antd";
import React, { Children, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";
import { useFormik } from "formik";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { addFood, getFoodById, updateFood } from "../../service/menu";
import { fetchCategoryList } from "../../service/category";

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
interface Props {
  isEdit?: boolean;
  mId?: any;
}
const { Option } = Select;
const MenuForm = ({ isEdit, mId }: Props) => {
  const { Header, Sider, Content } = Layout;
  const router = useRouter();

  const { mutate: handleFoodSubmit, isLoading } = useMutation(addFood, {
    onSuccess: () => {
      router.push("/menu");
      notification.success({
        type: "success",
        message: "Added Successfully.",
      });
    },
    onError: () => {
      notification.error({
        type: "error",
        message: "Something went wrong",
      });
    },
  });

  const { mutate: handleFoodEdit, isLoading: loading } = useMutation(
    updateFood,
    {
      onSuccess: () => {
        router.push("/menu");
        notification.success({
          type: "success",
          message: "Edited Successfully.",
        });
        refetch();
      },
      onError: () => {
        notification.error({
          type: "error",
          message: "Something went wrong",
        });
      },
    }
  );

  const { data: foodItem, refetch } = useQuery(
    ["fetch-foods", mId],
    getFoodById,
    {
      refetchOnWindowFocus: false,
      enabled: isEdit,
    }
  );

  const { data: categoryList } = useQuery(
    ["fetch-categories"],
    fetchCategoryList,
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleSubmit = () => {
    handleFoodSubmit({
      ...formik.values,
    });
  };
  const handleEdit = () => {
    handleFoodEdit({
      ...formik.values,
      mId,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: foodItem?.name || "",
      categoryName: foodItem?.categoryName || "",
      description: foodItem?.description || "",
      imageUrl: foodItem?.imageUrl || "",
      calories: foodItem?.calories || "",
      price: foodItem?.price || "",
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
                {!isEdit ? (
                  <Header className="inside-header">Add Food</Header>
                ) : (
                  <Header className="inside-header">Edit Food</Header>
                )}

                <FormWrapper>
                  <Form onFinish={formik.handleSubmit}>
                    <FormItemWrapper>
                      <label>Food Name</label>
                      <Input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                    </FormItemWrapper>
                    <FormItemWrapper>
                      <label>Categories</label>
                      <br />
                      <Select
                        style={{ width: 200 }}
                        allowClear
                        value={formik.values.categoryName}
                        onChange={(value) =>
                          formik.setFieldValue("categoryName", value)
                        }
                      >
                        {categoryList?.map((data: any) => {
                          return <Option value={data.name}>{data.name}</Option>;
                        })}
                      </Select>
                    </FormItemWrapper>
                    <FormItemWrapper>
                      <label>Upload Image</label>
                      <br />
                      <Input
                        type="url"
                        name="iamgeUrl"
                       onChange={formik.handleChange}
                       value={formik.values.imageUrl}
                      />
                    </FormItemWrapper>
                    <FormItemWrapper>
                      <label>Calories</label>
                      <Input
                        type="text"
                        name="calories"
                        onChange={formik.handleChange}
                        value={formik.values.calories}
                      />
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
                      {!isEdit ? (
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={isLoading}
                        >
                          Add
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                        >
                          Edit
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
export default MenuForm;
