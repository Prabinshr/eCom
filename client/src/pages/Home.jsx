import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newletter from '../components/Newletter'
import Products from '../components/Products'
import Slider from '../components/Slider'
import styled from "styled-components";

const Container = styled.div`
height: 100vh;
 overflow-y: scroll;
   &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-track{
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #9b9a9a;
  }


`

const Home = () => {
  return (
    <Container>
      <Announcement></Announcement>
        <Navbar></Navbar>
       <Slider></Slider>
       <Categories></Categories>
       <Products></Products>
       <Newletter></Newletter>
       <Footer></Footer>
    </Container>
  )
}

export default Home