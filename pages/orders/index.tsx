import { Button, Layout, Table } from "antd";
import React, { useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import styled from "styled-components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getOrders } from "../../service/orders";
import moment from "moment";

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

const Orders = () => {
  const { Header, Sider, Content } = Layout;
  const router = useRouter();
  const {
    data: ordersList,
    refetch,
    isLoading,
  } = useQuery("get-orders", getOrders, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/");
    }
  }, []);

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNo",
      render: (_: any, record: any) => <p>{record.orderNo}</p>,
    },
    {
      title: "Food Name",
      dataIndex: "foodName",
      render: (_: any, record: any) => (
        <>
          <p>
            {console.log(record.orderDetail.foodName)}
            {record.orderDetail?.foodName}
          </p>
        </>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      render: (_: any, record: any) => (
        <>
          <p>{moment(record.orderDate).format("YYYY:MM:DD")}</p>
          <p>{moment(record.orderDate).format("HH:mm:ss")}</p>
        </>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_: any, record: any) => <p>{record.orderDetail.quantity}</p>,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      render: (_: any, record: any) => <p>{record.orderDetail[0].rate}</p>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (_: any, record: any) => <p>{record.orderDetail[0].amount}</p>,
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
                <Table columns={columns} dataSource={ordersList} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Wrapper>
    </>
  );
};

export default Orders;
