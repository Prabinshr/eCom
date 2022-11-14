import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { register } from "../redux/apiCall";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(https://i.ibb.co/9ZCF5Tq/istockphoto-538035798-612x612.jpg) center ;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
`;
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
    border-radius: 5px;
    ${mobile({width:"75vw",height:"80vh"})}
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
   flex-wrap: wrap;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
    ${mobile({padding:"7px"})}
`;
const Input2 = styled.input`
    flex: 1;
    min-width: 90%;
    margin: 20px 10px 0 0;
    padding: 10px;
   ${mobile({padding:"7px"})}

`;
const Aggrement = styled.span`
    margin: 20px 0;
    font-size: 12px;
    ${mobile({margin:"15px 0"})}
`;
const Button = styled.button`
    margin: 0 auto;
    border-radius: 8px;
    min-width: 70%;
    border: none;
    padding: 10px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 17px;
    background-color: #1d7676;
    color: white;
    cursor: pointer;

    &:hover{
        background-color: teal;
    }
    ${mobile({padding:"7px"})}
`;
const Error = styled.span`
min-width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin-top: 15px;
  color: red;
`
const Link1 = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  cursor: pointer;
  font-size: 13px;
  text-decoration: underline;
  
`;

const Register = () => {
  const [firstname ,setFirstname] = useState("")
  const [lastname ,setLastname] = useState("")
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError(false)
    try {
      const res = await register({
        firstname,
        lastname,
        username,
        email,
        address,
        password,
      });
      window.location.replace("/login")  
    } catch (err) {
      setError(true);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="First name" onChange={(e) => setFirstname(e.target.value)}></Input>
          <Input placeholder="Last name" onChange={(e) => setLastname(e.target.value)}></Input>
          <Input2 placeholder="Username" onChange={(e) => setUsername(e.target.value)}></Input2>
          <Input2 placeholder="Email" onChange={(e) => setEmail(e.target.value)} type="email"></Input2>
          <Input2 placeholder="Address" onChange={(e) => setAddress(e.target.value)} type="text"></Input2>
          <Input2 placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></Input2>
          <Input2 placeholder="Confirm Password" type="password"></Input2>
          <Aggrement>
            By creating an account , I consent to the processing of my personal
            data in accordance with the <b>PRAVICY POLICY</b>
          </Aggrement>
          <Button type="submit">Create</Button>
          {error && <Error>Something went wrong</Error>}
        </Form>
        <Link to="/login">
        <Link1>Have an account</Link1>
        
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
