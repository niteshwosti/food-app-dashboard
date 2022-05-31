import {
  Alert,
  Button,
  Layout,
  message,
  notification,
  Popconfirm,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { deleteCategory, fetchCategoryList } from "../../service/category";

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
`;

const ButtonWrapper = styled.div`
  margin-bottom: 8px;
  float: right;
`;

const ActionWrapper = styled.div`
  max-width: 55px;
  display: flex;
  justify-content: space-between;
`;
const Category = () => {
  const { Header, Sider, Content } = Layout;
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const { data: categoryList, refetch } = useQuery(
    "fetch-categories",
    fetchCategoryList,
    { refetchOnWindowFocus: false }
  );

  const { mutate: handleCategoryDelete } = useMutation(deleteCategory, {
    onSuccess: () => {
      notification.success({
        type: "success",
        message: "Deleted Successfully",
      });
      refetch();
    },
    onError: () => {
      notification.error({
        type: "error",
        message: "Error Occured",
      });
    },
  });
  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleDelete = (id: any) => {
    handleCategoryDelete(id);
    setModalVisible(false);
  };
  useEffect(() => {
    refetch()
  }, []);

  const columns = [
    {
      title: "Category",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_id: any) => (
        <>
          <ActionWrapper>
            <div
              onClick={() => {
                router.push(`/category/edit/${_id}`);
              }}
            >
              <EditOutlined />
            </div>
            <div>
              <Popconfirm
                title={"Are you sure you want to delete?"}
                onConfirm={() => handleDelete(_id)}
                onCancel={() => setModalVisible(false)}
              >
                <DeleteOutlined onClick={() => handleModalOpen()} />
              </Popconfirm>
            </div>
          </ActionWrapper>
        </>
      ),
    },
  ];

  return (
    <>
      <Wrapper>
        <Layout>
          <Header></Header>
          <Layout>
            <Sider>
              <Sidebar />
            </Sider>
            <Layout style={{ padding: "24px" }}>
              <Content>
                <ButtonWrapper>
                  <Button onClick={() => router.push("/category/add")}>
                    Add Category
                  </Button>
                </ButtonWrapper>
                <Table
                  rowKey={`_id`}
                  onRow={(category) => {
                    return {
                      id: category._id,
                    };
                  }}
                  columns={columns}
                  dataSource={categoryList}
                ></Table>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Wrapper>
    </>
  );
};

export default Category;
