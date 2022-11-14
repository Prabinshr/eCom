import React from 'react'
import { categories } from '../Data'
import styled from "styled-components"
import CategoryItem from './CategoryItem'
import { mobile } from '../Responsive'

const Container = styled.div`
    display:  flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({padding:"0", flexDirection:"column"})}
`

const Categories = () => {
  return (
    <Container>
        {categories.map(item =>(
            <CategoryItem item={item} key={item.id}></CategoryItem>
        ))}
    </Container>
  )
}

export default Categories