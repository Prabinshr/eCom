import "./orderProduct.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getOrders, getProducts } from "../../redux/apiCall";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { userReq } from "../../requestMethod";

export default function OrderProduct() {
    const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orders);
//   console.log(order);

  {order.map((item)=>{
    {item.products.map((color)=>{
        console.log(color)
    })}  
  })}

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

//   const handleDelete = (id) => {
//     deleteProduct(id, dispatch);
//   };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit">Order Complete</button>

            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            /> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
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
