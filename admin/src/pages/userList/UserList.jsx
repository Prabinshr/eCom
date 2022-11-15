import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../redux/apiCall";

export default function UserList() {
  const [data, setData] = useState(userRows);
  const dispatch = useDispatch()
  
  const users = useSelector((state)=> state.user.Users)
  console.log(users)

  useEffect(()=>{
    getUsers(dispatch)
  },[dispatch])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "Username",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "firstname",
      headerName: "Firstname",
      width: 150,
    },
    {
      field: "lastname",
      headerName: "Lastname ",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address ",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
       <Topbar/>
      <div className="container">

      <Sidebar/>
      <div className="body">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>
    </div>
  );
}
