import { useSelector } from "react-redux";
import { selectProducts } from "../features/products/productSlice";

const Receipt = () => {
  const products = useSelector(selectProducts);
  return (
    <section className='receipt'>
      <h3>Your Receipt</h3>
      <ul>
        {products?.items.map((item) => {
          if (item.count) {
            return (
              <li key={item.id}>
                {item.name} x {item.count} = ${item.count * item.price}
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
};

export default Receipt;
