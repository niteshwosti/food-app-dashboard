import { Button, Layout, Table } from "antd";
import React from "react";
import { Sidebar } from "../../components/Sidebar";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
`;

const ButtonWrapper = styled.div`
  margin-bottom: 8px;
  float: right;
`;
const columns = [
  {
    title: "Food Item",
    dataIndex: "food-item",
    key: "food-item",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: () => (
      <>
        <EditOutlined />
        <DeleteOutlined />
      </>
    ),
  },
];

const Menu = () => {
  const { Header, Sider, Content } = Layout;
  const router = useRouter();
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
                  <Button onClick={() => router.push("/add-food")}>
                    Add Food
                  </Button>
                </ButtonWrapper>
                <Table columns={columns}></Table>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Wrapper>
    </>
  );
};

export default Menu;
