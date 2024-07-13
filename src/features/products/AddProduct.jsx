import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./productsSlice";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
  });

  function onProductChange(event, prop) {
    const value = event.target.value;
    setProduct((prevProduct) => ({ ...prevProduct, [prop]: value }));
  }

  const canSave =
    [product.title, product.description, product.price].every(Boolean) &&
    addRequestStatus === "idle";

  function handleSubmit(event) {
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        // unwrap so it returns a promise, if there error will move
        // our function to catch error
        dispatch(addProduct(product)).unwrap();

        setProduct({
          title: "",
          description: "",
          price: 0,
        });
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  }

  return (
    <article>
      <form>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          onChange={(e) => onProductChange(e, "title")}
          value={product.title}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={(e) => onProductChange(e, "description")}
          value={product.description}
        ></textarea>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          onChange={(e) => onProductChange(e, "price")}
          value={product.price}
        />
        <button type="button" onClick={handleSubmit} disabled={!canSave}>
          Add Product
        </button>
      </form>
    </article>
  );
};

export default AddProduct;
