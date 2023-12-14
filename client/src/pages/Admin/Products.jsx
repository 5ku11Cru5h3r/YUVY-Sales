import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { get } from "mongoose";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    try {
      let answer = window.prompt(
        "Are you sure, you want to delete this product?(Y/N)"
      );
      if (answer == "y" || answer == "Y") {
        const { data } = await axios.delete(
          `/api/v1/product/delete-product/${id}`
        );
        if (data?.success) {
          toast.success(data?.message);
          getAllProducts();
        } else {
          toast.error(data?.message);
        }
      } else return;
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!");
    }
  };

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    getAllProducts();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div className="card d-flex m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.length > 200
                      ? `${p.description.substring(0, 200)}...`
                      : p.description}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Price: Rs.{p.price}</li>
                  <li className="list-group-item">Quantity: {p.quantity}</li>
                  <li className="list-group-item">
                    Shipping: {p.shipping ? "Yes" : "No"}{" "}
                  </li>
                </ul>
                <div className="card-body">
                  <Link
                    to={`/dashboard/admin/product/${p.slug}`}
                    key={p._id}
                    className="card-link"
                  >
                    <button className="btn btn-outline-warning btn-sm">
                      Update Product
                    </button>
                  </Link>
                  <button
                    onClick={(e) => {
                      handleDelete(e, p._id);
                    }}
                    className="btn btn-outline-danger btn-sm ms-3"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
