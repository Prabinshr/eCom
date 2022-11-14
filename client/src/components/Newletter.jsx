import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { mobile } from "../Responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({height:"50vh"})}
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({fontSize:"50px"})}
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin: 20px;
  ${mobile({fontSize:"20",textAlign:"center"})}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
 background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 5px;
  ${mobile({width:"80%"})}
`;
const Input = styled.input`
  flex: 8;
  border: none;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  border-radius:0 5px 5px 0;
`;

const Newletter = () => {
  return (
    <Container>
      <Title>New Letter</Title>
      <Description>Get timely update from favorite products</Description>
      <InputContainer>
        <Input placeholder="Your Email"></Input>
        <Button>
          <SendIcon></SendIcon>
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newletter;
