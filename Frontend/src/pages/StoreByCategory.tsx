import Card from "../components/storeitem";

import Footer from "../components/footer";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "../context/pagination";

interface Product {
  _id: string;
  category: string;
  title: string;
  price: number;
  imgurl: {
    mainimg: string;
    secimg: string;
    thirdimg: string;
  };
  Countity: number;
  descreption: string;
  stock: boolean;
  mark: string;
  quantity: number;
}
import axios from "axios";
export default function StoreByCategory() {
  const { category } = useParams();
  const [items, setItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMark, setSelectedMark] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [posteperpage, setposteperpage] = useState(8);
  const [filtreditems, setfiltereditems] = useState(items);
  const lastpostindex = currentPage * posteperpage;
  const firstpostindex = lastpostindex - posteperpage;
  const currentposts = filtreditems.slice(firstpostindex, lastpostindex);

  const fetchItems = async () => {
    axios
      .get<Product[]>(
        `https://alakifekbackend.onrender.com/api/products/filter/category/${category}`
      )
      .then((response) => {
        setItems(response.data);
      });
  };
  useEffect(() => {
    fetchItems();
  }, [category]);

  useEffect(() => {
    let newFilteredItems = items;

    if (selectedCategory !== "All") {
      newFilteredItems = newFilteredItems.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (selectedMark !== "All") {
      newFilteredItems = newFilteredItems.filter(
        (item) => item.mark === selectedMark
      );
    }

    setfiltereditems(newFilteredItems);
  }, [selectedCategory, selectedMark, items]);

  const sortByPriceAscending = () => {
    const sortedProducts = [...items].sort((a, b) => a.price - b.price);
    setfiltereditems(sortedProducts);
  };
  const sortByPricedescending = () => {
    const sortedProducts = [...items].sort((a, b) => b.price - a.price);
    setfiltereditems(sortedProducts);
  };

  const catagorybt = [...new Set(items.map((item) => item.category))];
  const marks = [...new Set(items.map((item) => item.mark))];
  if (!items) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column h-100vh">
        <div className="position-absolute start-50 top-50" role="status">
          <i className="fa-solid fa-fan fa-spin fs-1 text-warning"></i>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-body-secondry">
      <section className="landing">
        <img
          className="hero__image"
          src="https://lh3.googleusercontent.com/pw/AJFCJaUasG62EicCrBRy_XuqMeyMvMuNGLqhKCXTVD0fvDC1eQWZqWWx9cD60oeGCpK6zWGK6XnoGcHeyf5dC0DXPYc-ERuGU9w-phFE2J3HLLo11AwkwHS-6TOWfASaVWVt53SjKJyMk54NH0oGKXfE7gNLp5-NMe84bj_Oa5Q5qxfj4iGJ7CekMGGN1EKcDfKIgizGKeSwZ8MDnp64FzqT6tUL3fyWaz6jPJn4yFo_hrZUs5XjsIhCQts5D4W2OLaek0oemIdE1uxOP3Z2jFEaynAuOHhvK4ICekAXeXgrU1mgZ3R44W_tadcyLyREwtCb_20WQ9f99puha8IohTFHu5vG_CsEpMc8-c8aL6AuU576fMAnwV3cXYY2hUz0Viq142nv5_h736UwnxEbRbyfayt1GHSBouPZfGQrcjj2M8MNKf-ds651of0SYi91Bm0mPW5feiZkWVIfCrfqLtmbUtNVYjgIeifyChD35qGGs8XUabGMmqJwoGkl5065edUaELeiDiKJxRl64c2dLtgdFOGdE-glYK08IcmABybO5kPTRzcwnGZjULmv0CYEHs7MjxawAgYzZJhC0XNoCsMNN2aedpBOXVrrs-_u7dq_VYfAihFRA29sK3ODSyH6pTwH-OigfnLBLwXkPzqWhwRqKZbGd_iWyK_4ndBoAYH53tJB09OfErySrGehCKxavWlrg7kEcyVLrPGvFKttCDnDwtm7rLQh7uugzi8s4kKeJSAIiqZGIWAsUVbYj_6avat1hjMTp8EKVUq_VrMjsvA54vQXf9V2pt3WCXJr98Zscu0oeYzbs1jJlPSNBh_yUwzAdBQb38x490T0un63ypTcbSyLD17MIwJoUnDxu47_IpcqifOnBXZsTgoJxskUnp0J3MbvhgeTmMQ3okJfH-sRg1uRv3p6uw383zq1Q4onnL8Jb-rSNPGagTcO0_YNi7ZIbV_rfhR4kqFELcQ7OEJ2l8bjeCzp66PrkU1QrotIXZ8eR7GMW7qtPsF6OOovGUH7gA=w1920-h350-s-no?authuser=0"
        />
      </section>
      <section className="container-fluid ">
        <div className="row ">
          <div className="col-xl-3 col-xxl-2  col-lg-4 bg-light  mx-auto mt-lg-3 mt-1 ">
            <h1 className="fw-bold text-bg-warning text-center p-3 fs-2 rounded-3 mt-5 mx-auto mt-lg-2">
              Filter
            </h1>
            <div className="d-flex flex-lg-column rounded-4 align-content-center  justify-content-center flex-wrap border bg-white px-3 py-2 align-items-start position-relative mx-auto mb-3">
              <p className=" w-100 rounded-4  p-2   text-center m-2 fs-6  fw-bolder border">
                Categorys
              </p>
              <button
                className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn  text-center m-2 fw-bolder catbtn"
                onClick={() => setfiltereditems(items)}
              >
                <span className="text-muted">All</span>
                <i className="fa-solid fa-angle-right ms-auto"></i>
              </button>

              {catagorybt.map((category: string) => {
                return (
                  <button
                    className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn text-center m-2 fw-bolder btn-outline-warning border-0 catbtn"
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span className="text-muted">{category}</span>
                    <i className="fa-solid fa-angle-right ms-auto"></i>
                  </button>
                );
              })}

              <div className="d-flex flex-column w-100 ">
                <p className="  rounded-4  p-2   text-center m-2  fs-6 fw-bolder border">
                  Sort By Price
                </p>
                <button
                  className="btn btn-outline-dark  mt-3 rounded-4 border-0"
                  onClick={sortByPriceAscending}
                >
                  Ascending
                  <i className="fa-solid fa-arrow-down-9-1 mx-2 fs-4"></i>
                </button>
                <button
                  className="btn btn-outline-dark  mt-3 rounded-4 border-0"
                  onClick={sortByPricedescending}
                >
                  Descending
                  <i className="fa-solid fa-arrow-up-9-1 mx-2 fs-4 "></i>
                </button>
              </div>

              <p className="rounded-4 w-100 p-2   text-center m-2 fs-6 fw-bolder border">
                Mark
              </p>

              {marks.map((mark: string) => {
                return (
                  <button
                    className="rounded-4 p-2 w-100 text-capitalize d-flex jsutfy-content-space-between align-items-center  btn text-center btn-outline-warning border-0 m-2 fw-bolder catbtn"
                    key={mark}
                    onClick={() => setSelectedMark(mark)}
                  >
                    <span className="text-muted">{mark}</span>
                    <i className="fa-solid fa-angle-right ms-auto"></i>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="col-xl-8 col-xxl-9 mx-auto col-md-6  mx-auto my-4">
            <div className="d-flex align-content-center justify-content-center flex-wrap mx-atuo gap-4 my-3">
              {currentposts.map((item) => {
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    imgurl={item.imgurl.mainimg}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                  />
                );
              })}
            </div>

            <Pagination
              totalposts={items.length}
              postperpage={posteperpage}
              setcurrentpage={setCurrentPage}
              currentpage={currentPage}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
