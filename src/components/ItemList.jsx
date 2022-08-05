import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { buyItem, sellItem } from "../features/products/productSlice";
import { selectProducts } from "../features/products/productSlice";

const ItemList = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  return (
    <Wrapper className='items'>
      {products?.items?.map((item) => {
        return (
          <article className='item'>
            <img className='item-img' src={item.image} />
            <h3>{item.name}</h3>
            <span>{item.price}₺</span>
            <div className='controls'>
              <button onClick={() => dispatch(sellItem({ id: item.id }))}>
                Sell
              </button>
              <input type='number' value={0} />

              <button
                className='buy'
                onClick={() => dispatch(buyItem({ id: item.id }))}
              >
                Buy
              </button>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

export default ItemList;

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .item-img {
    max-width: 200px;
  }
  .buy {
    background: linear-gradient(180deg, #2ecc71, #1abc9c);
    color: white;
  }
`;
