import { useRouter } from "next/router";
import React from "react";
import MenuForm from "../../../components/MenuForm";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <MenuForm isEdit={true} mId={id} />
    </>
  );
};
export default Edit;
