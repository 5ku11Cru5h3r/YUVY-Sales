import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const { Option } = Select;
const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories.");
    }
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("product_details"));
    if (data !== null) {
      setName(data.name);
      setCategory(data.category);
      setDescription(data.description);
      setPrice(data.price);
      setQuantity(data.quantity);
      setShipping(data.shipping);
    }
    getAllCategory();
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "product_details",
      JSON.stringify({ name, description, price, quantity, shipping })
    );
  }, [name, description, price, quantity, shipping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setShipping("");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Product</h1>
          <div className="m-1 w-75">
            <div className="d-flex">
              <input
                placeholder="Write a name"
                type="text"
                className="form-control w-50 me-3 mt-3 mb-4"
                value={name}
                onInput={(e) => setName(e.target.value)}
                required
              />
              <Select
                placeholder="Select a category.."
                size="large"
                className="w-50 ms-3 mt-3 mb-4 border-secondary"
                onChange={(value) => setCategory(value)}
                required
                showSearch
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  required
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <textarea
              placeholder="Write product description.."
              type="text"
              className="form-control mb-3"
              value={description}
              rows="3"
              onInput={(e) => setDescription(e.target.value)}
              required
            />
            <div className="d-flex">
              <div class="input-group-text mb-3 rounded-start">&#8377;</div>
              <input
                placeholder="What is price of unit"
                id="inlineFormInputGroupUsername"
                type="number"
                className="form-control mb-3 me-3"
                value={price}
                onInput={(e) => setPrice(e.target.value)}
                required
              />
              <input
                placeholder="Quantity available"
                type="number"
                className="form-control rounded-0 mb-3 ms-3"
                value={quantity}
                onInput={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <Select
              placeholder="Shipping Status.."
              size="large"
              value={shipping}
              className="w-50 mb-4"
              onChange={(value) => {
                setShipping(value);
              }}
              showSearch
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <br />
            <button className="btn btn-primary mb-5" onClick={handleSubmit}>
              Create Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
