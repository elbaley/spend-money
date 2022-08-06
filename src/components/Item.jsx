import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const canBuy = products.balance / item.price > 0;
  const canSell = item.count > 0;

  // when count is updated dispatch
  useEffect(() => {
    dispatch(changeCountByAmount({ ...item, amount: Number(count) }));
  }, [count]);

  const handleCountChange = (value, item) => {
    const maxAmount = Math.floor(
      products.balance / item.price + Number(item.count)
    );

    if (!value || value < 0) {
      setCount(Number("0"));
    }
    if (value <= maxAmount) {
      setCount(value);
    }
    if (value >= maxAmount) {
      setCount(maxAmount);
    }
  };
  return (
    <article className='item'>
      <img className='item-img' src={item.image} />
      <h3>{item.name}</h3>
      <span>{item.price}₺</span>
      <div className='controls'>
        <button
          disabled={!canSell}
          onClick={() => {
            dispatch(sellItem({ id: item.id }));
            setCount(count - 1);
          }}
        >
          Sell
        </button>
        <input
          type='number'
          value={Number(count).toFixed(0)}
          onChange={(e) => handleCountChange(parseInt(e.target.value), item)}
        />

        <button
          className='buy'
          disabled={!canBuy}
          onClick={() => {
            dispatch(buyItem({ id: item.id }));
            setCount(count + 1);
          }}
        >
          Buy
        </button>
      </div>
    </article>
  );
};

export default Item;
