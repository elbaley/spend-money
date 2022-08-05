import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "./App.css";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import Receipt from "./components/Receipt";
function App() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <Wrapper className='App'>
      <Header />
      <ItemList />
      <Receipt />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default App;
