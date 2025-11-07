import React, { useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Orders from "./Orders";

const OrdersList: React.FC = () => {
  const [limit, setlimit] = useState(10);
  return (
    <>
      <PageBreadcrumb pageTitle="Orders" />
      <PageMeta
        title="Orders List"
        description="Manage all Orders in the TailAdmin dashboard."
      />
      <div className="rounded-2xl border border-gray-200 bg-white !px-7 !py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <Orders limit={limit} setlimit={setlimit} />
      </div>
    </>
  );
};

export default OrdersList;
