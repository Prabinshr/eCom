import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import Phone from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { mobile } from "../Responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ display: "flex", flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${mobile({ fontSize: "15px", padding: "15px" })}
`;
const Logo = styled.h1`
  ${mobile({ fontSize: "20px" })}
`;
const Desc = styled.p`
  margin: 20px 0;
  text-align: justify;
`;
const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ display: "flex", alignItems: "center", justifyContent: "center" })}
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  a {
    margin-right: 162px;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
   
  }
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  text-transform: uppercase;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ fontSize: "15px", padding: "15px", backgroundColor: "#f5f3f3" })}
`;
const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Payment = styled.img`
  width: 250px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>eMart.</Logo>
        <Desc>
          There are many variations of passanger of lorem IPsum avialable , but
          the majority have suffered alternation in some form , by ijected
          humour or randomised words which dont look evem slightly believeble
        </Desc>
        <SocialContainer>
          <SocialIcon color="385999">
            <FacebookIcon></FacebookIcon>
          </SocialIcon>
          <SocialIcon color="E4405f">
            <InstagramIcon></InstagramIcon>
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <TwitterIcon></TwitterIcon>
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Center>
        <Title>UseFull Link</Title>
        <List>
          <Link to="/">
            <ListItem>Home</ListItem>
          </Link>

          <Link to="cart">
            <ListItem>Cart</ListItem>
          </Link>
          <ListItem>man fashion</ListItem>
          <ListItem>woman fashion</ListItem>
          <ListItem>accessories</ListItem>
          <ListItem>my account</ListItem>
          <ListItem>order tracking </ListItem>
          <ListItem>wish list</ListItem>
          <ListItem>terms </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <PlaceIcon></PlaceIcon>
          Ratna Chowk , Pokhara-7
        </ContactItem>
        <ContactItem>
          <Phone></Phone>
          +977 9869141423
        </ContactItem>
        <ContactItem>
          <EmailIcon></EmailIcon>
          shresthaprabin1718@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/sQzWk7V/final-payment.png"></Payment>
      </Right>
    </Container>
  );
};

export default Footer;
