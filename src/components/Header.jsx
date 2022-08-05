import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectProducts } from "../features/products/productSlice";

const Header = () => {
  const products = useSelector(selectProducts);
  return (
    <>
      <Wrapper>
        <img
          className='profile'
          src='https://neal.fun/spend/billgates.jpg'
          alt=''
        />
        <h2>Spend Money</h2>
        <section className='money-area'>
          <span className='money'>{products.balance}₺</span>
        </section>
      </Wrapper>
    </>
  );
};

export default Header;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Header */
  .profile {
    border-radius: 50%;
    max-width: 150px;
  }
  .money-area {
    background: #42d742;
    color: white;
    font-weight: 700;
    width: 100%;
  }
`;
