import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';


const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();


    //total cart price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { total += item.price })
            return total.toLocaleString("en-US", { style: "currency", currency: "INR" })
        } catch (error) {
            console.log(error);
        }
    }
    //remove Cart Item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id == pid);
            console.log(index);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length >= 1 ?
                                `You have ${cart.length} items in your cart.${auth?.token ? "" : " Please login to checkout..."}` : "Your Cart is empty..."}
                        </h4>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-9">{cart?.map((p) => (
                        <div className="row m-2 card flex-row">
                            <div className="col-md-4">
                                <img src={`${import.meta.env.VITE_SERVER}/api/v1/product/product-photo/${p._id}`} className="card-img-top" height={"300px"} width={"300px"}
                                    alt="..." />
                            </div>
                            <div className="col-md-8">
                                <br />
                                <h4>{p.name}</h4><br />
                                <br />
                                <br />
                                <h4>Rs. {p.price}</h4>
                                <br />
                                <br />
                                <button className='btn btn-danger' onClick={() => { removeCartItem(p._id) }}>Remove Item</button>
                            </div>
                        </div>
                    ))}</div>
                    <div className="col-md-3 text-center">
                        <h3>Cart Summary</h3>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                ) : (
                                    <button className='btn btn-outline-warning' onClick={() => navigate("/login", { state: "/cart" })}>Please Login To Checkout</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage