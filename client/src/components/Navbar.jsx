import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { mobile } from "../Responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCall";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 1px solid gray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "8px" })}
`;
const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  a {
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: black;
    ${mobile({ fontSize: "12px" })}
  }
`;
const Logo = styled.h1`
  ${mobile({ marginLeft: "10px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  a {
    font-size: 14px;
    cursor: pointer;
    text-transform: uppercase;
    color: black;
    text-decoration: none;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "0px" })}
  }
  ${mobile({ justifyContent: "center", flex: "2" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const MenuItem1 = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 30px;
  font-weight: bold;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);;
  const dispatch = useDispatch()
  const quantity = useSelector((state)=>state.cart.quantity)
  
  const handleClick = (e) => {
    e.preventDefault();
    logout(dispatch);
  };
  const handleCart = () => {
    if(!user){
      window.location.replace("/login")
    } else{
      window.location.replace("/cart")
    }
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search"></Input>
            <SearchIcon
              style={{ color: "gray", fontSize: "16px" }}
            ></SearchIcon>
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>eMart.</Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <>
            <Link to="/">
              <MenuItem1>{user.username}</MenuItem1>
            </Link>
            <Link to="/">
              <MenuItem onClick={handleClick}>Logout</MenuItem>
            </Link>
            </>
          ) : (
            <>
              <Link to="/register">
                <MenuItem>Register</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>Sign in</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem onClick={handleCart}>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
