import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Slider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const HomePage = () => {
  const navigate = useNavigate();
  const filtermax = 20000;
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: filtermax });
  const [loading, setLoading] = useState(false);

  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories.");
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //handle filtering using category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  //get filtered Products
  const filterProduct = async () => {
    try {
      const range = [priceFilter.min, priceFilter.max];
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        range,
      });
      if (data?.success) {
        setProducts(data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      !checked.length &&
      priceFilter.min == 0 &&
      priceFilter.max == filtermax
    ) {
      getAllProducts();
    }
  }, [!checked.length, priceFilter.min == 0, priceFilter.max == filtermax]);
  useEffect(() => {
    if (
      checked.length ||
      priceFilter.min != 0 ||
      priceFilter.max != filtermax
    ) {
      filterProduct();
    }
  }, [checked, priceFilter]);

  return (
    <Layout title={"YUVY SALES- BEST OFFERS"}>
      <div className="row">
        <div className="col-md-3 mt-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="ms-3">
            {categories?.map((c) => (
              <div className="d-flex flex-column">
                <Checkbox
                  key={c._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, c._id);
                  }}
                >
                  {c.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <br />
          <br />
          <h4 className="text-center">Filter By Price</h4>
          <div className="ms-5">
            <Slider
              range
              defaultValue={[0, filtermax]}
              max={filtermax * 2}
              onChange={(value) => {
                setPriceFilter({ min: value[0], max: value[1] });
              }}
            />
            <br />
            <input
              className="w-25 ms-4"
              type="number"
              placeholder="Min"
              onChange={(e) =>
                setPriceFilter({ ...priceFilter, min: e.target.value })
              }
              value={priceFilter.min}
            />
            <input
              className="w-25 ms-3"
              type="number"
              placeholder="Max"
              onChange={(e) =>
                setPriceFilter({ ...priceFilter, max: e.target.value })
              }
              value={priceFilter.max}
            />
          </div>
          <br />
          <br />
          <button
            className="btn btn-danger ms-4"
            onClick={() => {
              window.location.reload();
            }}
          >
            Remove Filters
          </button>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card d-flex m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5>{p.price}</h5>
                  <p className="card-text">
                    {p.description.length > 200
                      ? `${p.description.substring(0, 200)}...`
                      : p.description}
                  </p>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Product Added to Cart");
                    }}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="btn btn-info ms-3"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
