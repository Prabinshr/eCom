import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newletter from "../components/Newletter";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile } from "../Responsive";
import { useLocation } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { publicReq } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  ${mobile({flexDirection:"column"})}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({height:"60vh"})}
`;
const InfoContainer = styled.div`
  flex: 1;
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
  text-align: justify;
  ${mobile({margin:"10px 0"})}
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 100%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({width:"100%"})}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
    ${mobile({width:"100%"})}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`
const Button = styled.button`
    padding: 10px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover{
        background-color: #f8f4f4;
    }
`

const Remove = styled(RemoveIcon)`
  cursor: pointer;
`
const Add = styled(AddIcon)`
  cursor: pointer;
`

const Product = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);

  const [product,setProduct] = useState({})
  const [quantity,setQuantity] = useState(1)
  const [color,setColor] = useState("")
  const [size,setSize] = useState("")

  useEffect(()=>{
    const getProduct = async ()=>{
      try{
        const res =await publicReq.get("/product/find/"+id)
        setProduct(res.data)
      }catch(err){}
    }
    getProduct()
  },[id])

  const handleQuantity = (type) =>{
    if(type === "desc"){
      quantity >1 && setQuantity(quantity -1)
    }
    else{
      setQuantity(quantity +1)
      
    }
  }
  const handleClick = ()=>{
    if(!user){
      window.location.replace("/login")
    } else{
      dispatch(addProduct({ ...product, quantity, color, size }));
    }
  }

  return (
    <Container>
      <Navbar></Navbar>
      <Announcement></Announcement>
      <Wrapper>
        <ImageContainer>
          <Image src={product.img}></Image>
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
          {product.desc}
          </Desc>
          <Price>{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c)=>(
                <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>

              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onClick={(e)=>setSize(e.target.value)}>
                {product.size?.map((s)=>(
                  <FilterSizeOption key={s} >{s}</FilterSizeOption>

                ))}
               
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
                <Remove onClick={()=>handleQuantity("desc")}></Remove>
                <Amount>{quantity}</Amount>
                <Add onClick={()=>handleQuantity("inc")}></Add>
            </AmountContainer>
            <Button onClick={handleClick}>Add to cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <Newletter></Newletter>
      <Footer></Footer>
    </Container>
  );
};

export default Product;
