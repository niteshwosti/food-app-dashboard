import { useRouter } from "next/router";
import React from "react";
import CategoryForm from "../../../components/CategoryForm";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <CategoryForm isEdit={true} cId={id} />
    </>
  );
};
export default Edit;
