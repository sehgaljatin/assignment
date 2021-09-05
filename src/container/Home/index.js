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
    const categoryData = useSelector((state) => state?.reducerProducts?.categoryData);

    const loading = useSelector((state) => state.reducerProducts.loading);
    const error = useSelector((state) => state.reducerProducts.error);
    //   const [selectedSearch, setSelectedSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsData());
  }, [dispatch]);

  const brandFilter = (event) => {
    if (event.target.checked) {
      setSelectedBrand([...selectedBrand, event.target.value]);
    } else {
      setSelectedBrand(
        selectedBrand.filter((elem) => elem !== event.target.value)
      );
    }
  };

  const catFilter = (event) => {
    if (event.target.checked) {
      setSelectedCategory([...selectedCategory, event.target.value]);
    } else {
      setSelectedCategory(
        selectedCategory.filter((elem) => elem !== event.target.value)
      );
    }
  };

//   const filteredData = () => {
//       if(selectedGender.length === 0 &&
//               selectedBrand.length === 0 &&
//               selectedCategory.length === 0
//       ){
//         return productsData;
//       }
      
//   }

const searchProducts = () => {
   
    let { productList } = this.props;  
    console.log("search", this.state.search);
    let filteredProductList = productList.filter((product) => product.product.toLowerCase().includes(this.state.search.toLowerCase()));
    this.setState({ loading:false, productList: filteredProductList });

    return productsData.filter((product) => product.product.toLowerCase().includes(selectedSearch.toLowerCase()))
}


  const filteredData = () => {
    if (
      selectedGender.length === 0 &&
      selectedBrand.length === 0 &&
      selectedCategory.length === 0 &&
      selectedSearch === ""
    ) {
      return productsData;
    }
     else if (selectedGender.length !== 0) {
      if (
        selectedBrand.length !== 0 &&
        selectedCategory.length !== 0
      ) {
        return productsData
          .filter((product) => selectedGender.includes(product.gender))
          .filter((product) => selectedBrand.includes(product.brand))
          .filter((product) => selectedCategory.includes(product.category))          
      } else if (selectedGender.length !== 0 && selectedBrand.length !== 0) {
        return productsData
          .filter((product) => selectedGender.includes(product.gender))
          .filter((product) => selectedBrand.includes(product.brand));
      } else if (selectedCategory.length !== 0 && selectedGender.length !== 0) {
        return productsData
          .filter((product) => selectedGender.includes(product.gender))
          .filter((product) => selectedCategory.includes(product.category));
      }
      return productsData.filter((product) =>
        selectedGender.includes(product.gender)
      );
    } else if (selectedBrand.length !== 0) {
      if (selectedBrand.length !== 0 && selectedCategory.length !== 0) {
        return productsData
          .filter((product) => selectedBrand.includes(product.brand))
          .filter((product) => selectedCategory.includes(product.category));
      }
      return productsData.filter((product) =>
        selectedBrand.includes(product.brand)
      );
    } else if (selectedCategory.length !== 0) {
      return productsData.filter((product) =>
        selectedCategory.includes(product.category)
      );
    } 
    else if (selectedSearch !== "") {
      return productsData.filter((product) => product.product.toLowerCase().includes(selectedSearch.toLowerCase()))
    }


    

    // else if (selectedSearch !== "") {
    //   return products.filter((product) => selectedSearch.toLowerCase().split(" ")
    //       .forEach((item) => {
    //         product = product.product.toLowerCase()
    //         console.log(item)
    //         console.log(product)
    //         console.log(product.includes(item))

    //         return product.includes(item)
    //       }));
    // }


  };
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}
      <Navbar onChange={(event) => {setSelectedSearch(event.target.value)}} />
      <div className="container-fluid">
        <div className="row pt-4">
          <div className="col-md-3 border px-4">
            <div className="col-md-12 border-bottom">
              <h6 className="p-2 text-uppercase font-weight-bold">Gender</h6>
              {genderData.map((val) => {
                return <Radio value={val} key={val} label={val} onClick={(event) => {setSelectedGender(event.target.value)}} />;
              })}
            </div>
            <div className="col-md-12 border-bottom">
              <h6 className="p-2 text-uppercase font-weight-bold">Brand</h6>
              {brandData.map((val) => {
                return (
                  <Checkbox value={val} label={val} key={val} onClick={brandFilter} />
                );
              })}
            </div>
            <div className="col-md-12 border-bottom">
              <h6 className="p-2 text-uppercase font-weight-bold">Category</h6>
              {categoryData.map((val) => {
                return <Checkbox value={val} label={val} key={val} onClick={catFilter} />;
              })}
            </div>
          </div>

          <div className="col-md-9 border">

            {filteredData().map((val) => {
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
