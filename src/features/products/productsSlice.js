import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`${PRODUCTS_URL}`);
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (initialProduct) => {
    const response = await axios.post(PRODUCTS_URL, initialProduct);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // There is no action payload I think
        state.status = "failed";
        console.log(action);
        state.error = action.error.message;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        let min = 1;
        action.payload = action.payload.reverse().map((product) => {
          product.date = sub(new Date(), { minutes: min++ }).toISOString();
          return product;
        });

        state.products = state.products.concat(action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        action.payload.date = new Date().toISOString();
        action.payload.id = state.products[0].id + 1;
        state.products.unshift(action.payload);
      });
  },
});

export const selectAllProducts = (state) => state.products.products;
export const getProductsError = (state) => state.products.error;
export const getProductsStatus = (state) => state.products.status;

export default productsSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { sub } from "date-fns";
// import axios from "axios";

// const PRODUCTS_URL = "https://fakestoreapi.com/products";

// const initialState = {
//   products: [],
//   status: "idle", // idle || loading || succeeded || failed
//   error: null,
// };

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const response = await axios.get(PRODUCTS_URL);
//     return response.data;
//   }
// );

// export const addProduct = createAsyncThunk(
//   "products/addProduct",
//   async (initialProduct) => {
//     const response = await axios.post(PRODUCTS_URL, initialProduct);
//     return response.data;
//   }
// );

// const products = createSlice({
//   name: "products",
//   initialState,
//   extraReducers(builder) {
//     builder
//       .addCase(fetchProducts.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         const { payload } = action;
//         let min = 1;

//         state.status = "succeeded";

//         const loadedProducts = payload.reverse().map((product) => {
//           product.date = sub(new Date(), { minutes: min++ }).toISOString();
//           return product;
//         });
//         state.products = state.products.concat(loadedProducts);
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         const { products } = state;
//         const { payload } = action;

//         const listFirstProduct = products[0];
//         payload.id = listFirstProduct.id + 1;
//         payload.date = new Date().toISOString();
//         state.products.unshift(payload);
//       });
//   },
// });

// export const selectAllProducts = (state) => state.products.products;
// export const getProductsStatus = (state) => state.products.status;
// export const getProductsError = (state) => state.products.error;

// export default products.reducer;
