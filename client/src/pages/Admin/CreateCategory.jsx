import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import { Modal } from 'antd';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import CategoryForm from '../../components/Form/categoryForm';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");


    //handle form to create Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/category/create-category`, { name });
            if (data?.success) {
                toast.success(`Category "${name}" created .`);
                getAllCategory();
            } else {
                toast.error(`${data.message}`);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form!");
        }
    };

    //Handle attempt to update(edit) Category
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_SERVER}/api/v1/category/update-category/${selected?._id}`, { name: updatedName });
            if (data.success) {
                toast.success(data.message);
                setSelected(null);
                setVisible(false);
                setUpdatedName("");
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went Wrong!");
            console.log(error);
        }
    };

    //Handle attempt to delete a category
    const [deleted, setDeleted] = useState(name);
    const [dvisible, setDVisible] = useState(false);
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/category/delete-category/${deleted._id}`, { name: deleted?.name });
            if (data.success) {
                toast.success(data.message);
                setDVisible(false);
                setDeleted(null);
                getAllCategory();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went Wrong!");
            console.log(error);
        }
    };

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/category/get-category`);
            if (data.success) {
                setCategories(data.categories);
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in getting categories.")
        }
    };

    useEffect(() => { getAllCategory() }, []);

    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className='row'>
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Manage Categories</h1>
                    <div className="p-3 w-50">
                        <CategoryForm
                            value={name}
                            setValue={setName}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                    <table className="table table-striped table-hover w-50 ms-3 mb-5">
                        <thead>
                            <tr>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>


                            {categories?.map((c) => (
                                <>
                                    <tr>
                                        <td key={c._id}>{c.name}</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c); }}>
                                                Edit
                                            </button>
                                            &nbsp;&nbsp;
                                            <button className='btn btn-danger' onClick={() => { setDVisible(true); setDeleted(c); }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    <Modal title={`Rename ${selected?.name}`} onCancel={() => setVisible(false)} footer={null} open={visible}>

                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                    </Modal>
                    <Modal footer={null} open={dvisible} onCancel={() => setDVisible(false)}>
                        <p className='h5'>Delete Category</p>
                        <br /><p className='h6'>Are you sure you want to delete category, "{deleted?.name}"?</p><br />
                        <button onClick={handleDelete} className="btn btn-primary me-2">OK</button>
                        <button onClick={() => setDVisible(false)} className="btn btn-secondary">Cancel</button>
                    </Modal>
                </div>
            </div >
        </Layout >
    )
}

export default CreateCategory