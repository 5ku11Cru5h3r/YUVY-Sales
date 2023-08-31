import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';

const CategoryProducts = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    // const [total, setTotal] = useState(0);
    // const [page, setPage] = useState(1);

    // const getTotal = async () => {
    //     try {
    //       const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/product/product-count`);
    //       setTotal(data?.total)
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (params?.slug) getProductByCat()
    }, [params?.slug]);
    // useEffect(() => {
    //     getTotal();
    // }, []);
    return (
        <Layout title={`Category - category`}>
            <h4 className='text-center'>Category - {category?.name}</h4>
            <h6 className='text-center'>Results Found ({products.length})</h6>
            <div className="ror">
                <div className="d-flex flex-wrap">
                    {products?.map((p) => (
                        <div className="card d-flex m-2" style={{ width: '18rem' }}>
                            <img src={`${import.meta.env.VITE_SERVER}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <h5>{p.price}</h5>
                                <p className="card-text">{p.description.length > 200 ? `${p.description.substring(0, 200)}...` : p.description}</p>
                                <button className="btn btn-warning">Add To Cart</button>
                                <button className="btn btn-info ms-3" onClick={() => { navigate(`/product/${p.slug}`) }}>More Details</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className='m-2 p-3'>
                    {products && products.length < total && (
                        <button className="btn btn-warning" onClick={(e) => {
                            e.preventDefault();
                            setPage(page + 1);
                        }}>
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    )}
                </div> */}
            </div>
        </Layout>
    )
}

export default CategoryProducts;