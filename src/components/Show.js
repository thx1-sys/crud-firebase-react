import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { async } from "@firebase/util";
const MySwal = withReactContent(Swal);

const Show = () => {
  //1 - configuramos los hooks
  const [products, setProducts] = useState([]);

  //2 - referenciamos a la DB firestore
  const productsCollection = collection(db, "products");

  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    //console.log(data.docs)
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //console.log(products)
  };
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: "¿Elimina el producto?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la fcion para eliminar
        deleteProduct(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  //6 - usamos useEffect
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);
  //7 - devolvemos vista de nuestro componente
  // ... (resto del código)

  return (
    <div className="container-2">
      <div className="container-1 mt-5 margin-auto">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-8">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn-create">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                    ></path>
                  </svg>{" "}
                  Create
                </span>
              </Link>
            </div>
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>{product.color}</td>
                    <td>{product.price}</td>
                    <td>{product.size}</td>
                    <td className="btn-space">
                      <Link
                        to={`/edit/${product.id}`}
                        className="btn btn-light"
                        style={{ marginRight: "10px" }} // Agrega espacio a la derecha del botón
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(product.id);
                        }}
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
