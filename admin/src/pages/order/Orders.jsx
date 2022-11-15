import "./order.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/apiCall";

export default function Orders() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orders);
  console.log(order)
 

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);



  const columns = [
    { field: "userId", headerName: "userId", width: 220 },
    {
      field: "user",
      headerName: "Address",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.address}</div>;
      },
    },
    { field: "amount", headerName: "Amount", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
              <Link to={"/orderProduct/"+ params.row.userId }>
                <button className="userListEdit">Check Products</button>
              </Link>;
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="body">
          <DataGrid
            rows={order}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
