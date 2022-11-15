import "./orderProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrders } from "../../redux/apiCall";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { userReq } from "../../requestMethod";
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

export default function OrderProduct() {
  // const dispatch = useDispatch();
  // const order = useSelector((state) => state.order.orders);
  // //   console.log(order);

  // useEffect(() => {
  //   getOrders(dispatch);
  // }, [dispatch]);

  //   const handleDelete = (id) => {
  //     deleteProduct(id, dispatch);
  //   };

  const [products, setProducts] = useState([]);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userReq.get("/order/find/" + userId);
        setProducts(res.data);
      } catch {}
    };
    getProducts();
  }, [userId]);

  return (
    <div className="productList">
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="body">
          <div className="productTable">
            <table border={1}>
              <tr>
                <th>Product Id</th>
                <th>Title</th>
                <th>Image</th>
                <th>Category</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>

              </tr>
              {products.map((item) =>
                item.products.map((product) =>
                  // console.log(product)
                  <tr>
                    <td>{product.productId}</td>
                    <td>{product.title}</td>
                    <td>
                      <img src={product.img} alt="" />  
                    </td>
                    <td>{product.categories}</td>
                    <td>{product.color}</td>
                    <td>{product.size}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{(product.price)*(product.quantity)}</td>
                    <td>
                      <button>Complete Order</button>  
                    </td>
                  </tr>
                )
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
