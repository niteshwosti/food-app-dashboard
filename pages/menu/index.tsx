import { Button, Layout, notification, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { deleteFood, getFoodList } from "../../service/menu";

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

const ActionWrapper = styled.div`
  max-width: 55px;
  display: flex;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  margin-bottom: 8px;
  float: right;
`;

const Menu = () => {
  const { Header, Sider, Content } = Layout;
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const columns = [
    {
      title: "Food Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
                router.push(`/menu/edit/${_id}`);
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

  const { data: foodList, refetch } = useQuery("get-foodList", getFoodList, {
    refetchOnWindowFocus: false,
  });

  const { mutate: handleFoodDelete } = useMutation(deleteFood, {
    onSuccess: () => {
      notification.success({
        message: "Deleted Successfully",
        type: "success",
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
    handleFoodDelete(id);
    setModalVisible(false);
  };

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
                  <Button onClick={() => router.push("/menu/add")}>
                    Add Food
                  </Button>
                </ButtonWrapper>
                <Table
                  rowKey={`_id`}
                  onRow={(food) => {
                    return {
                      id: food._id,
                    };
                  }}
                  columns={columns}
                  dataSource={foodList}
                ></Table>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Wrapper>
    </>
  );
};

export default Menu;
