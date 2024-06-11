import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Edit = () => {
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const product = doc(db, "products", id);
    const data = {
      description: description,
      stock: stock,
      color: color,
      name: name,
      price: price,
      size: size,
    };
    await updateDoc(product, data);
    navigate("/");
  };

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "products", id));
    if (product.exists()) {
      setDescription(product.data().description);
      setStock(product.data().stock);
      setColor(product.data().color);
      setName(product.data().name);
      setPrice(product.data().price);
      setSize(product.data().size);
    } else {
      console.log("El producto no existe");
    }
  };

  useEffect(() => {
    getProductById(id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Edit Product</h1>
          <form onSubmit={update}>
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
