import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await fetch("/spend-money/data.json").then((data) =>
      data.json()
    );

    const products = res.map((item) => {
      return {
        id: item.id,
        name: item.title,
        image: item.image,
        price: Math.round(item.price),
        count: 0,
      };
    });

    return products;
  }
);

export const productSlice = createSlice({
  name: "money",
  initialState: {
    items: [],
    loading: false,
    error: "",
    balance: 100000000000,
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
    changeCountByAmount: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      const amount = parseInt(action.payload.amount);

      console.log(
        "Trying to change count :",
        product.name,
        product.count,
        amount
      );
      // handle buy
      if (amount > product.count) {
        const amountDifference = amount - product.count;
        product.count = amount;
        state.balance = state.balance - amountDifference * product.price;
      }
      //handle sell
      else {
        const amountDifference = product.count - amount;
        product.count = amount;
        state.balance = state.balance + amountDifference * product.price;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = "";
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.error.message;
    });
  },
});

export const { increment, buyItem, sellItem, changeCountByAmount } =
  productSlice.actions;

export const selectProducts = (state) => state.products;

export default productSlice.reducer;
