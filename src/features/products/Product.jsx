import TimeAgo from "./TimeAgo";

const Product = ({ product }) => {
  return (
    <div className="product">
      <h3>Title: {product.title}</h3>
      <p>Description: {product.description}</p>
      <small>Price: {product.price}</small>
      <div>
        <TimeAgo timeStamp={product.date} />
      </div>
    </div>
  );
};

export default Product;
