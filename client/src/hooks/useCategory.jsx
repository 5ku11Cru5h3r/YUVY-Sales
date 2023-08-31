import { useEffect, useState } from "react";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/category/get-category`
      );
      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default useCategory;