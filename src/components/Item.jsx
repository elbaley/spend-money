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

  const handleCountChange = (value, item) => {
    const maxAmount = Math.floor(products.balance / item.price);

    dispatch(changeCountByAmount({ ...item, amount: Number(value) }));
  };
  return (
    <article className='item'>
      <img className='item-img' src={item.image} />
      <h3>{item.name}</h3>
      <span>{item.price}₺</span>
      <div className='controls'>
        <button onClick={() => dispatch(sellItem({ id: item.id }))}>
          Sell
        </button>
        <input
          type='number'
          value={item.count}
          onChange={(e) => handleCountChange(e.target.value, item)}
        />

        <button
          className='buy'
          onClick={() => dispatch(buyItem({ id: item.id }))}
        >
          Buy
        </button>
      </div>
    </article>
  );
};

export default Item;
