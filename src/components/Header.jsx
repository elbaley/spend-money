import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectProducts } from "../features/products/productSlice";
import { useSpring, animated } from "react-spring";

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
      </Wrapper>
      <Balance balance={products.balance} />
    </>
  );
};

function Balance({ balance }) {
  const props = useSpring({ val: balance, from: { val: 0 } });
  return (
    <BalanceWrapper className='money-area'>
      $
      <animated.span className='money'>
        {props.val.to((val) => Math.floor(val))}
      </animated.span>
    </BalanceWrapper>
  );
}

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
`;

const BalanceWrapper = styled.section`
  background: linear-gradient(180deg, #2ecc71, #1abc9c);
  font-size: 2rem;
  padding: 2rem 0;
  text-align: center;
  color: white;
  font-weight: 700;
  width: 100%;
  position: sticky;
  top: 0;
  min-width: 500px;
`;
