import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../Responsive";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  width: 100%;
  height: 60vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  background-color: #f3f6f9;
  object-fit: cover;
  ${mobile({height:"30vh"})}
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
const Title = styled.h1`
  margin-bottom: 10px;
  text-transform: uppercase;
  color: black;
`;
const Button = styled.button`
  background-color: white;
  text-transform: uppercase;
  padding: 10px;
  font-weight: 600;
  color: gray;
  cursor: pointer;
  border: none;
`;


const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
      <Image src={item.img}></Image>
      <Info>
        <Title>{item.title}</Title>
        <Button>Shop now</Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
