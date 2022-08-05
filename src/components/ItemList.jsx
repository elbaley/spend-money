import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { buyItem, sellItem } from "../features/products/productSlice";
import { selectProducts } from "../features/products/productSlice";
import Item from "./Item";

const ItemList = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  return (
    <Wrapper className='items'>
      {products?.items?.map((item) => {
        return <Item item={item} />;
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
