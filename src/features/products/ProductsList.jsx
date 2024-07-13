import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProducts,
  getProductsStatus,
  getProductsError,
  fetchProducts,
} from "./productsSlice";
import Product from "./Product";
import AddProduct from "./AddProduct";
import { useEffect } from "react";

const ProductsList = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  const renderedProducts = products.map((product) => {
    return <Product key={product.id} product={product} />;
  });

  function getContent() {
    if (productsStatus === "loading") {
      return <div>Loading...</div>;
    } else if (productsStatus === "error") {
      return <div>{error}</div>;
    } else {
      return <div>{renderedProducts}</div>;
    }
  }

  const content = getContent();

  return (
    <div>
      <h2 className="products-heading">Products</h2>
      <AddProduct />
      <div>{content}</div>
    </div>
  );
};

export default ProductsList;
