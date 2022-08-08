import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectProducts } from "../features/products/productSlice";

const Receipt = () => {
  const products = useSelector(selectProducts);
  const total = 100000000000 - products.balance;

  if (total === 0) {
    return;
  }

  return (
    <Wrapper>
      <h3>Your Receipt</h3>
      <div className='receipt'>
        {products?.items.map((item) => {
          if (item.count) {
            const price = item.count * item.price;
            return (
              <div className='product' key={item.id}>
                <span className='name'>{item.name}</span>
                <span className='count'>x{item.count}</span>
                <span className='price'>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                  }).format(price)}
                </span>
              </div>
            );
          }
        })}
        <div className='total'>
          <span>Total</span>{" "}
          <span>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Receipt;

const Wrapper = styled.section`
  margin: 1rem auto;
  h3 {
    text-align: center;
  }
  .receipt {
    min-width: 300px;
    border: 1px solid rgba(168, 179, 207, 0.2);
    border-radius: 1rem;
    padding: 1rem;
    max-width: 500px;
    margin: 0 auto;
  }
  .product {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    place-items: left;
  }
  .price {
    font-weight: 700;
    color: #1fbd61;
    text-align: right;
  }
  .total {
    border-top: 1px dashed white;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
  }

  @media (prefers-color-scheme: light) {
    .total {
      border-top: 1px dashed black;
    }
  }
`;
