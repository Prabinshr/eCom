import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newletter from "../components/Newletter";
import Products from "../components/Products";
import { mobile } from "../Responsive";
import { useLocation } from "react-router";
import { useState } from "react";


const Container = styled.div``;
const FilContainer = styled.div`
  background-color: #f5fbfd;
`;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({margin:" 0 10px",display:"flex",flexDirection:"column"})}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({fontSize:"15px",marginRight:"0"})}
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 20px;
  ${mobile({margin:"5px 0"})}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split("/")[2]
  const [filter,setFilter] = useState({})
  const [sort,setSort] = useState("newest")

  const handleFilter = (e)=>{
    const value = e.target.value
    setFilter({
      ...filter,
      [e.target.name]: value
    })
  }
  
  return (
    <Container>
      <Announcement></Announcement>
      <Navbar></Navbar>
      <FilContainer>
        <Title>{cat}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Product:</FilterText>
            <Select name="color" onChange={handleFilter}>
              <Option disabled >
                Color
              </Option>
              <Option>white</Option>
              <Option>black</Option>
              <Option>blue</Option>
              <Option>red</Option>
              <Option>pink</Option>
              <Option>yellow</Option>
            </Select>
            <Select name="size" onChange={handleFilter}>
              <Option disabled >
                Size
              </Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              <Option>XXL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Product:</FilterText>
            <Select onChange={e=>setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price Asce</Option>
              <Option value="des">Price Desc</Option>
            </Select>
          </Filter>
        </FilterContainer>
      </FilContainer>
      <Products cat={cat} filter={filter} sort={sort}></Products>
      <Newletter></Newletter>
      <Footer></Footer>
    </Container>
  );
};

export default ProductList;
