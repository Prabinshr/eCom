import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../redux/apiCall";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function ProductList() {
  const dispatch = useDispatch()
  const product = useSelector((state)=>state.product.products)
  console.log(product)

  useEffect(()=>{
    getProducts(dispatch)
  },[dispatch])

  const handleDelete = (id) => {
    deleteProduct(id,dispatch)
  };

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
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Topbar/>
      <div className="container">

      <Sidebar/>
      <div className="body">
      <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      <DataGrid
        rows={product}
        disableSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
    </div>
    </div>
  );
}
