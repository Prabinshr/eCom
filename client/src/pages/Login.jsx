import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCall";
import { mobile } from "../Responsive";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(https://i.ibb.co/GWQ78Qq/360-F.jpg) center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  ${mobile({backgroundSize:"cover"})}
  
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  border-radius: 5px;
  ${mobile({width:"80vw",height:"50vh"})}
  a{
    color: black;
  }
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input2 = styled.input`
  flex: 1;
  min-width: 90%;
  margin: 10px 0px ;
  padding: 10px;
`;
const Button = styled.button`
  margin: 0 auto;
  border-radius: 8px;
  width: 40%;
  border: none;
  padding: 10px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 17px;
  background-color: #1d7676;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: teal;
  }
  &:disabled{
    color: red;
    cursor: not-allowed;
  }
`;

const Link1 = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  cursor: pointer;
  font-size: 13px;
  text-decoration: underline;
  
`;
const Error = styled.span`
  color: red;
  display: flex;
 align-items: center;
 justify-content: center;
  margin-top: 10px;
`

const Login = () => { 
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()
  const {isFetching,error} = useSelector((state)=>state.user)

  const handleClick = (e)=>{
    e.preventDefault()  
    login(dispatch,{username,password}) 
  }
  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form>
          <Input2 placeholder="USERNAME" onChange={(e)=>setUsername(e.target.value)}></Input2>
          <Input2 placeholder="PASSWORD" onChange={(e)=>setPassword(e.target.value)} type="password"></Input2>

          <Button onClick={handleClick} disabled={isFetching}>Login</Button>
        </Form>
        {error && <Error >Something Went Wrong!!</Error>}
        <Link to="/register">
        <Link1>Create a new account</Link1>
        
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Login;
