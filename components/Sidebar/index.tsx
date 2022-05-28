import {
  FundProjectionScreenOutlined,
  LogoutOutlined,
  MenuOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: sticky;
  top: 65px;
  & ul {
    border-right: none;
  }
  & li {
    width: 100% !important;
  }

  & li:after {
    border-right: none !important;
  }
  .ant-menu {
    height: calc(100vh - 62px);
  }
  .ant-menu-item,
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    opacity: 0.65;
  }
  .active,
  .ant-menu-item:hover {
    color: #0a44ff !important;
    background: #d7eef8 !important;
    border-right: 3px solid #096dd9;
    font-weight: bold;
  }
`;
const Sidebar = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };
  const handleClick = (e: any) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Wrapper>
        <Menu
          theme="light"
          selectedKeys={[current]}
          onClick={(e) => handleClick(e)}
        >
          <Menu.Item
            key={"/orders"}
            onClick={() => router.push("/orders")}
            icon={<FundProjectionScreenOutlined />}
          >
            {" "}
            Orders
          </Menu.Item>
          <Menu.Item
            key={"/category"}
            onClick={() => router.push("/category")}
            icon={<UnorderedListOutlined />}
          >
            {" "}
            Categories
          </Menu.Item>
          <Menu.Item
            key={"/menu"}
            onClick={() => router.push("/menu")}
            icon={<MenuOutlined />}
          >
            {" "}
            Menu
          </Menu.Item>
          <Menu.Item onClick={handleLogout} icon={<LogoutOutlined />}>
            {" "}
            Logout
          </Menu.Item>
        </Menu>
      </Wrapper>
    </>
  );
};
export { Sidebar };
