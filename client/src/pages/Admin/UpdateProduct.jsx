import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { Select } from 'antd';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

const { Option } = Select;

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    //get Single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setCategory(data.product.category._id);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setId(data.product._id);
        } catch (error) {
            console.log(error);

        }
    }

    //get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.categories);
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in getting categories.")
        }
    };
    useEffect(() => {
        getAllCategory();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("category", category);
            productData.append("description", description);
            productData.append("price", price);
            photo && productData.append("photo", photo);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            const { data } = await axios.patch(`${import.meta.env.VITE_SERVER}/api/v1/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.success(data?.message);
                navigate("/dashboard/admin/products");
            }
            else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong!");
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, [])
    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className='row'>
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Update Product</h1>
                    <div className="m-1 w-75">
                        <div className="d-flex">
                            <input
                                placeholder='Write a name'
                                type="text"
                                className="form-control w-50 me-3 mt-3 mb-4"
                                value={name}
                                onInput={(e) => setName(e.target.value)}
                                required
                            />
                            <Select
                                placeholder="Select a category.."
                                size="large"
                                value={category}
                                className='w-50 ms-3 mt-3 mb-4 border-secondary'
                                onChange={(value) => setCategory(value)}
                                required
                                showSearch
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                )
                                )}
                            </Select>
                        </div>
                        <div className="mb-3">
                            <label className='btn btn-outline-secondary col-md-12'>
                                {photo ? photo.name : "upload photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    required
                                    hidden />
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo ? (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className="img img-responsive" />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img src={`${import.meta.env.VITE_SERVER}/api/v1/product/product-photo/${id}`} alt="product_photo" height={"200px"} className="img img-responsive" />
                                </div>
                            )}
                        </div>
                        <textarea
                            placeholder='Write product description..'
                            type="text"
                            className="form-control mb-3"
                            value={description}
                            rows="3"
                            onInput={(e) => setDescription(e.target.value)}
                            required
                        />
                        <div className="d-flex">
                            <div className="input-group-text mb-3 rounded-start">&#8377;</div>
                            <input
                                placeholder='What is price of unit'
                                id="inlineFormInputGroupUsername"
                                type="number"
                                className='form-control mb-3 me-3'
                                value={price}
                                onInput={(e) => setPrice(e.target.value)}
                                required
                            />
                            <input
                                placeholder='Quantity available'
                                type="number"
                                className='form-control rounded-0 mb-3 ms-3'
                                value={quantity}
                                onInput={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                        <Select
                            placeholder="Shipping Status.."
                            size="large"
                            value={shipping ? "Yes" : "No"}
                            className='w-50 mb-4'
                            onChange={(value) => { setShipping(value) }}
                            showSearch
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>
                        <br />
                        <button className='btn btn-primary mb-5' onClick={handleUpdate}>Update Changes</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default UpdateProduct