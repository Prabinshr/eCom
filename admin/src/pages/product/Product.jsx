import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { userReq } from "../../requestMethod";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCall";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats,setPStats] = useState([])

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)

  );

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","))
  };
  console.log(cat)
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleClick = (e) => {
    
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const product = { ...inputs, img: downloadURL, categories: cat , size: size ,color: color  };
          updateProduct(productId,product, dispatch) && window.location.replace("/products");
        });
      }
    );
   
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(()=>{
    const getStats = async () => {
      try {
        const res = await userReq.get("/order/income?pid="+productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
        setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch {}
    };
    getStats();
  },[MONTHS,productId])

  return (
    <div className="product">
        <Topbar/>
      <div className="container">

      <Sidebar/>
      <div className="body">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>   
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={product.img}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price: </span>
              <span className="productInfoValue"> {product.price}</span>
            </div>
            
            <div className="productInfoItem">
              <span className="productInfoKey">In Stock:</span>
              <span className="productInfoValue">{String(product.inStock)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
      <h1 className="updateProductTitle">Update Product</h1>
          <form className="updateProductForm">
            <div className="updateProductItem">
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="updateProductItem">
              <label>Title</label>
              <input
                name="title"
                type="text"
                placeholder={product.title}
                onChange={handleChange}
              />
            </div>
            <div className="updateProductItem">
              <label>Description</label>
              <input
                name="desc"
                type="text"
                placeholder={product.desc}
                onChange={handleChange}
              />
            </div>
            <div className="updateProductItem">
              <label>Price</label>
              <input
                name="price"
                type="number"
                placeholder={product.price}
                onChange={handleChange}
              />
            </div>
            <div className="updateProductItem">
              <label>Categories</label>
              <input
                type="text"
                placeholder={product.categories}
                onChange={handleCat}
              />
            </div>
            <div className="updateProductItem">
              <label>Size</label>
              <input type="text" placeholder={product.size} onChange={handleSize} />
            </div>
            <div className="updateProductItem">
              <label>Color</label>
              <input
                type="text"
                placeholder={product.color}
                onChange={handleColor}
              />
            </div>
            <div className="updateProductItem">
              <label>Stock</label>
              <select onChange={handleChange} name="inStock">
                <option value="" disabled selected>
                  Choose Yes or No
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <button className="updateProductButton" onClick={handleClick}>
              Update
            </button>
          </form>
      </div>
    </div>
    </div>
    </div>
  );
}
