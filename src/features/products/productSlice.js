import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const productSlice = createSlice({
  name: "money",
  initialState: {
    balance: 1000,
    items: [
      {
        id: 1,
        name: "Big Mac",
        image: "https://neal.fun/spend/images/big-mac.jpg",
        price: 50,
        count: 0,
      },
      {
        id: 2,
        name: "Smartphone",
        image: "https://neal.fun/spend/images/smartphone.jpg",
        price: 699,
        count: 0,
      },
    ],
  },
  reducers: {
    buyItem: (state, action) => {
      // find the product and check whether there is enough money to buy
      const product = state.items.find((item) => item.id === action.payload.id);
      const canBuy = state.balance >= product.price;
      // increment the count by one
      if (canBuy) {
        product.count++;
        state.balance -= product.price;
      }
    },
    sellItem: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      // only sell if the count is greater than 0
      if (product.count) {
        product.count--;
        state.balance += product.price;
      }
    },
  },
});

export const { increment, buyItem, sellItem } = productSlice.actions;

export const selectProducts = (state) => state.products;

export default productSlice.reducer;
