import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useSearch } from '../../context/search';

const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    return (
        <Layout title={"Search Results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? 'No Products Found' : `${values?.results.length} Products Found`}</h6>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {values?.results.map((p) => (
                    <div className="card d-flex m-2" style={{ width: '18rem' }}>
                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
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
        </Layout >
    )
}

export default Search