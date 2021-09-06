import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = (props) => {
  return (
    <>
      <div className="cards">
        <div className="card" style={{ width: "235px" }}>
          <img src={props.img} className="card-img-top" alt="mypic" />
          <div className="card-body">
            <h6 className="card-title">{props.product}</h6>
            <div className="card-text">
              <b>{props.brand}</b>
              <div className="size">{props.sizes}</div>
              <span className="price">Rs.{props.price}</span>
              <span className="mrp">Rs.{props.mrp}</span>
              <span className="discount">{props.dis}</span>
            </div>
            <button className="btn btn-primary cart_btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
