import styled from "styled-components";
import "./App.css";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import Receipt from "./components/Receipt";
function App() {
  return (
    <Wrapper className='App'>
      <Header />
      <ItemList />
      <Receipt />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin-top: 1rem;
  max-width: 1000px; ;
`;

export default App;
