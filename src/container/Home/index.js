import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsData } from "./store/actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import Radio from "../../components/Radio";
import Checkbox from "../../components/Checkbox";
import Products from "../../components/Products";
import "../../App.css";
function Home() {
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");

  const productsData = useSelector((state) => state?.reducerProducts?.data);
  const genderData = useSelector((state) => state?.reducerProducts?.genderData);
  const brandData = useSelector((state) => state?.reducerProducts?.brandData);
  const categoryData = useSelector(
    (state) => state?.reducerProducts?.categoryData
  );

  const loading = useSelector((state) => state.reducerProducts.loading);
  const error = useSelector((state) => state.reducerProducts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsData());
  }, [dispatch]);

  const brandFilter = (event) => {
    setSelectedSearch("");
    if (event.target.checked) {
      setSelectedBrand([...selectedBrand, event.target.value]);
    } else {
      setSelectedBrand(
        selectedBrand.filter((elem) => elem !== event.target.value)
      );
    }
  };

  const catFilter = (event) => {
    setSelectedSearch("");
    if (event.target.checked) {
      setSelectedCategory([...selectedCategory, event.target.value]);
    } else {
      setSelectedCategory(
        selectedCategory.filter((elem) => elem !== event.target.value)
      );
    }
  };

  const searchProducts = (searchQuery, array, objectKey = null) => {
    return array.filter((d) => {
      let data = objectKey ? d[objectKey] : d; //Incase If It's Array Of Objects.
      let dataWords =
        typeof data == "string" &&
        data
          ?.split(" ")
          ?.map((b) => b && b.toLowerCase().trim())
          .filter((b) => b);
      let searchWords =
        typeof searchQuery == "string" &&
        searchQuery
          ?.split(" ")
          .map((b) => b && b.toLowerCase().trim())
          .filter((b) => b);

      let matchingWords = searchWords.filter((word) =>
        dataWords.find((a) => a.includes(word))
      );

      return matchingWords.length;
    });
  };

  const filteredData = () => {
    // return productsData.map((product) => {
    //   console.log("prodcut", selectedGender, product, );
    //   if (
    //     selectedGender.length &&
    //     Object.values(product).includes(selectedGender)
    //   ) {
    //     return product;
    //   } else {
    //     return product;
    //   }
    // });

    // var abc = productsData.map((product) => {
    //   if (selectedBrand.length && selectedBrand.includes(product.brand)) {
    //     return product;
    //   }

    //   if (
    //     selectedCategory.length &&
    //     selectedCategory.includes(product.category)
    //   ) {
    //     return product;
    //   }

    //   if (selectedGender.length && selectedGender.includes(product.gender)) {
    //     return product;
    //   }
    // });

    // console.log(abc);

    if (selectedSearch.length !== 0) {
      let searchResults = searchProducts(
        selectedSearch,
        productsData,
        "productName"
      );
      return searchResults;
    }

    if (selectedGender.length) {
      if (selectedBrand.length && selectedCategory.length) {
        return productsData
          .filter((product) => selectedGender.includes(product.gender))
          .filter((product) => selectedBrand.includes(product.brand))
          .filter((product) => selectedCategory.includes(product.category));
      } else if (selectedBrand.length) {
        return productsData
          .filter((product) => selectedGender.includes(product.gender))
          .filter((product) => selectedBrand.includes(product.brand));
      } else if (selectedCategory.length) {
        return productsData
          .filter((product) => selectedGender.includes(product.gender))
          .filter((product) => selectedCategory.includes(product.category));
      }
      return productsData.filter((product) =>
        selectedGender.includes(product.gender)
      );
    } else if (selectedBrand.length) {
      if (selectedCategory.length !== 0) {
        return productsData
          .filter((product) => selectedBrand.includes(product.brand))
          .filter((product) => selectedCategory.includes(product.category));
      }
      return productsData.filter((product) =>
        selectedBrand.includes(product.brand)
      );
    } else if (selectedCategory.length) {
      return productsData.filter((product) =>
        selectedCategory.includes(product.category)
      );
    }
    return productsData;
  };
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}
      <Navbar
        onChange={(event) => {
          setSelectedSearch(event.target.value);
          filteredData();
        }}
      />
      <div className="container-fluid">
        <div className="row pt-4">
          <div className="col-md-3 border px-4">
            <div className="col-md-12 border-bottom">
              <h6 className="p-2 text-uppercase font-weight-bold">Gender</h6>
              {genderData.map((val) => {
                return (
                  <Radio
                    value={val}
                    key={val}
                    label={val}
                    onClick={(event) => {
                      setSelectedSearch("");
                      setSelectedGender(event.target.value);
                    }}
                  />
                );
              })}
            </div>
            <div className="col-md-12 border-bottom">
              <h6 className="p-2 text-uppercase font-weight-bold">Brand</h6>
              <div className="hide_scroll_main">
                <div className="scroll_filters">
                  {brandData.map((val) => {
                    return (
                      <Checkbox
                        value={val}
                        label={val}
                        key={val}
                        onClick={brandFilter}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-12 border-bottom">
              <h6 className="p-2 text-uppercase font-weight-bold">
                Categories
              </h6>
              <div className="hide_scroll_main">
                <div className="scroll_filters">
                  {categoryData.map((val) => {
                    return (
                      <Checkbox
                        value={val}
                        label={val}
                        key={val}
                        onClick={catFilter}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-9 border">
            {filteredData().map((val) => {
              console.log(val);
              return (
                <Products
                  img={val.searchImage}
                  product={val.product}
                  brand={val.brand}
                  sizes={val.sizes}
                  price={val.price}
                  mrp={val.mrp}
                  key={val.productId}
                  dis={val.discountDisplayLabel}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
