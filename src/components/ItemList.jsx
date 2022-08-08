import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProducts, selectProducts } from "../features/products/productSlice";
import Item from "./Item";

const ItemList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const products = useSelector(selectProducts);

  return (
    <Wrapper>
      {products.loading && <div className='loading'>Loading products...</div>}
      {products?.items?.map((item) => {
        return <Item key={item.id} item={item} />;
      })}
    </Wrapper>
  );
};

export default ItemList;

const Wrapper = styled.section`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  .loading {
    text-align: center;
    font-weight: bold;
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
