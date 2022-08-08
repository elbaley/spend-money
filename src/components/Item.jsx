import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  buyItem,
  selectProducts,
  sellItem,
  changeCountByAmount,
} from "../features/products/productSlice";

const Item = ({ item }) => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const [count, setCount] = useState(Number(item.count));
  const canBuy = Math.floor(products.balance / item.price) > 0;
  const canSell = item.count > 0;

  // when count is updated dispatch
  useEffect(() => {
    if (item.count !== count) {
      dispatch(changeCountByAmount({ ...item, amount: Number(count) }));
    }
  }, [count]);

  const handleCountChange = (value, item) => {
    const maxAmount = Math.floor(
      products.balance / item.price + Number(item.count)
    );
    // if value is negative setCount to 0
    if (value <= 0) {
      setCount(0);
    } else if (value <= maxAmount) {
      setCount(value);
    } else if (value >= maxAmount) {
      setCount(maxAmount);
    }
  };
  return (
    <Wrapper>
      <img className='item-img' src={item.image} />
      <h3>{item.name}</h3>
      <span className='price'>
        {" "}
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </span>
      <div className='controls'>
        <button
          disabled={!canSell}
          className='sell btn'
          onClick={() => {
            dispatch(sellItem({ id: item.id }));
            setCount(count - 1);
          }}
        >
          Sell
        </button>
        <input
          type='number'
          className='count'
          value={Number(count).toFixed(0)}
          onChange={(e) => handleCountChange(parseInt(e.target.value), item)}
        />

        <button
          className={`buy btn ${!canBuy ? "disabled-buy" : "0"}`}
          disabled={!canBuy}
          onClick={() => {
            dispatch(buyItem({ id: item.id }));
            setCount(count + 1);
          }}
        >
          Buy
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(168, 179, 207, 0.2);
  box-shadow: var(--shadow-2);
  border-radius: 1rem;
  padding: 1rem;
  .item-img {
    height: 150px;
    max-width: 100%;
    object-fit: contain;
  }
  h3 {
    margin: 0;
  }
  .price {
    color: #1fbd61;
    font-weight: bold;
  }

  .controls {
    margin-top: 1rem;
    display: flex;
  }

  .count {
    width: 10ch;
    margin: 0 0.5rem;
  }
  .buy {
    background: linear-gradient(180deg, #2ecc71, #1abc9c);
    color: white;
  }
  .disabled-buy:disabled {
    background: #919191;
  }
  .sell {
  }
  .btn {
  }
`;

export default Item;
