import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Logo = styled.div``;
const Button = styled.button`
  border: none;
  background-color: #0e4e0e;
  color: white;
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  border-radius: 5px;
`;
const Desc = styled.span``;

const Success = () => {
    const location = useLocation()
    console.log(location)
  return (
    <Container>
      <Wrapper>
        <Logo>eMart.</Logo>
        <Link to="/">
        <Button>Successfull </Button>
        
        </Link>
        <Desc>Thank you for choosing Us</Desc>
      </Wrapper>
    </Container>
  );
};

export default Success;
