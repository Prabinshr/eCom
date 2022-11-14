import styled from "styled-components";
import { mobile } from "../Responsive";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  ${mobile({fontSize:"12px" , letterSpacing:"1px"})}
`;

const Announcement = () => {
  return (
  <Container>
        Super Deal ! Free Shipping on Orders Over $50
  </Container>
  )
};

export default Announcement;
