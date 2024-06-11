import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Create = () => {
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const navigate = useNavigate();

  const productsCollection = collection(db, "products");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(productsCollection, {
      description: description,
      stock: stock,
      color: color,
      name: name,
      price: price,
      size: size,
    });
    navigate("/");
  };

  return (
    <div className="container-1">
      <div className="row">
        <div className="col">
          <h1>Create Product</h1>
          <form onSubmit={store}>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Color</label>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Size</label>
              <input
                value={size}
                onChange={(e) => setSize(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Store
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
