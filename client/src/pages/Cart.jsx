import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../Responsive";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { removeProduct } from "../redux/cartRedux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { userReq } from "../requestMethod";
import { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { orderItem } from "../redux/apiCall";

const KEY =
  "pk_test_51LjeF1IPoF6qugMKXUvntn2cGP1wgxj5EWjdsAhtBdFO8GESEWlWJO78qgQLvkJn0o7kMHA9OyvDEFmpXS2sgcFf006Y5GAN0m";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;
  ${mobile({ fontSize: "25px" })}
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "15px" })}
`;
const TopButton = styled.button`
  padding: 10px;
  text-transform: uppercase;
  font-weight: 600;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  border-radius: ${(props) => props.type === "filled" && "5px"};
  cursor: pointer;
  ${mobile({ padding: "10px" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  font-weight: 300;
  cursor: pointer;
  margin: 0 10px;
  ${mobile({ fontSize: "15px", display: "flex" })}
`;
const Buttom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ flexDirection: "row" })}
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ margin: "5px 25px" })}
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 25px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginLeft: "20px" })}
`;
const Hr = styled.hr`
  border: none;
  background-color: #eee;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 55vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  text-transform: uppercase;
  padding: 10px;
  width: 100%;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
const DeleteIcon = styled(DeleteOutlineIcon)`
  cursor: pointer;
  color: red;
  font-size: 25px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();
  const history = useNavigate();

  const [userId, setUserId] = useState(cart._id);
  const [products, setProducts] = useState(cart.products);
  const [amount, setAmount] = useState(cart.total);
  const [address, setAddress] = useState("abc");
  const [status, setStatus] = useState("pending");

  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userReq.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        history("/success", { stripeData: res.data });
      } catch {}
      try {
        const res = await orderItem({
          userId,
          products,
          amount,
          address,
          status,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [
    stripeToken,
    cart.total,
    history,
    cart,
    cart.products,
    address,
    products,
    amount,
    status,
    userId,
  ]);

  const handleClick = (id, e) => {
    dispatch(removeProduct(id));
    // console.log(cart.products[0].price)
    const find = cart.products.find((item) => item._id === cart.products);
    console.log(find);
  };
  const handleCheckout = () => {
    <>
      {user ? (
        <StripeCheckout
          name="eMart"
          shippingAddress
          billingAddress
          description={`Your total is Rs. ${cart.total}`}
          amount={cart.total * 100}
          token={onToken}
          stripeKey={KEY}
        >
          <Button>Checkout now</Button>
        </StripeCheckout>
      ) : (
        window.location.replace("/login")
      )}
    </>;
  };

  return (
    <Container>
      <Navbar></Navbar>
      <Announcement />
      <Wrapper>
        <Title>your bag</Title>
        <Top>
          <TopButton>continue shopping</TopButton>

          <TopTexts>
            <TopText>Shopping Bag (2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <StripeCheckout
              name="eMart"
              shippingAddress
              billingAddress
              description={`Your total is Rs. ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
          <TopButton type="filled" onClick={handleCheckout}>checkout now</TopButton>
            </StripeCheckout>

        </Top>
        <Buttom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetails>
                  <Image src="https://i.ibb.co/Bf6Ky4q/pngwing-com-8.png"></Image>
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                      {product._id}
                    </ProductId>
                    <ProductColor color="#2B3940">{product.color}</ProductColor>
                    <ProductSize>
                      <b>Size:</b>
                      {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetails>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon></AddIcon>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <RemoveIcon></RemoveIcon>
                  </ProductAmountContainer>
                  <ProductPrice>
                    Rs. {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
                <Icon>
                  <DeleteIcon
                    sx={{ fontSize: "30px" }}
                    onClick={() => handleClick(product._id)}
                  />
                </Icon>
              </Product>
            ))}
            <Hr></Hr>
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Sub Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Delivery</SummaryItemText>
              <SummaryItemPrice>Rs. 150</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Delivery Discount</SummaryItemText>
              <SummaryItemPrice>Rs. 150</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>

            <StripeCheckout
              name="eMart"
              shippingAddress
              billingAddress
              description={`Your total is Rs. ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button onClick={handleCheckout}>Checkout now</Button>
            </StripeCheckout>
          </Summary>
        </Buttom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
