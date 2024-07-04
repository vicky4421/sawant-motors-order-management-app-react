// imports from third party libraries
import { HashLoader, PropagateLoader } from "react-spinners";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

// imports from react redux
import { useSelector, useDispatch } from "react-redux";

// imports from project
import {
  AddContentForm,
  ContactDiv,
  ContactHolderDiv,
  ContentContainer,
  ContentDiv,
  ContentListContainer,
  ContentName,
  ContentNameLogoContainer,
  ContentSearchBarContainer,
  ContentTabContainer,
  FormContainer,
  LogoContainerDiv,
  SubmitButton,
} from "../suppliers/suppliers.styles";
import nothingHere from "../../assets/nothing-here.gif";
import edit from "../../assets/edit.png";
import trashpng from "../../assets/trash.png";
import arrow from "../../assets/arrow.png";
import crosspng from "../../assets/cross.png";

// imports from this project state
import {
  getProducts,
  resetError,
  saveProduct,
  deleteProduct,
} from "../../store/product/product.slice";
import { getCategories } from "../../store/category/category.slice";
import { getUnits } from "../../store/unit/unit.slice";
import FormInput from "../../components/form-input/form-input.component";

const Products = () => {
  // redux state
  const error = useSelector((state) => state.product.error);
  const isLoading = useSelector((state) => state.product.isLoading);
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);
  const units = useSelector((state) => state.unit.units);
  const dispatch = useDispatch();

  // local states
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState({});
  const [productName, setProductName] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const unitNamesArray = units.map(({ name }) => ({
    value: name,
    label: name,
  }));

  const categoryNamesArray = categories.map(({ categoryName }) => ({
    value: categoryName,
    label: categoryName,
  }));

  const handleUnitChange = (selectedUnit) => {
    return new Promise((resolve) => {
      setSelectedUnit(selectedUnit);
      resolve(selectedUnit?.value); // Resolve the promise after state update
    });
  };

  const handleCategoryChange = (selectedCategory) => {
    return new Promise((resolve) => {
      setSelectedCategory(selectedCategory);
      resolve(selectedCategory?.value); // Resolve the promise after state update
    });
  };

  // filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sort products
  const sortedProducts = filteredProducts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // toggle expanded
  const toggleExpanded = (productId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [productId]: !prevExpanded[productId],
    }));
  };

  // handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "productName") {
      setProductName(value);
    } else if (name === "partNumber") {
      setPartNumber(value);
    }
  };

  // reset form fields
  const resetFormFields = () => {
    setProductName("");
    setPartNumber("");
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!productName) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter product name",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3a3a3a",
      });
      return;
    } else if (!partNumber) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter part number",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3a3a3a",
      });
      return;
    }

    await handleUnitChange(selectedUnit);
    await handleCategoryChange(selectedCategory);

    // create new product
    const newProduct = {
      name: productName,
      partNumber,
      unit: selectedUnit.value,
      category: selectedCategory.value,
    };

    console.log("newProduct", newProduct);

    // dispatch save product
    dispatch(saveProduct(newProduct));
    resetFormFields();

    // reset selected unit and category
    setSelectedUnit(null);
    setSelectedCategory(null);

    // set expanded
    setExpanded({});
  };

  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire({
          icon: "success",
          title: "Supplier deleted successfully",
          text: "success",
          confirmButtonColor: "#3a3a3a",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Supplier not deleted",
          text: "success",
          confirmButtonColor: "#3a3a3a",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  };

  // get all products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // get all categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // get all units
  useEffect(() => {
    dispatch(getUnits());
  }, [dispatch]);

  // handle error
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3a3a3a",
      });
      dispatch(resetError());
    }
  }, [error, dispatch]);

  return (
    <div>
      <ContentContainer>
        <ContentListContainer>
          <h3>Products</h3>
          <ContentSearchBarContainer>
            <FormInput
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={handleSearch}
              label="Search Products"
              required
              style={{ width: "90%" }}
            />
            {searchTerm && (
              <img
                src={crosspng}
                alt="add"
                height={20}
                style={{ padding: "1rem", cursor: "pointer" }}
                onClick={() => setSearchTerm("")}
              />
            )}
          </ContentSearchBarContainer>
          <ContentTabContainer>
            {isLoading ? (
              <HashLoader color="#36d7b7" loading={isLoading} size={150} />
            ) : (
              <>
                {products.length === 0 && (
                  <img src={nothingHere} alt="nothing here" />
                )}
                {sortedProducts.map((product) => (
                  <ContentDiv key={product.id}>
                    <ContentNameLogoContainer>
                      <ContentName>{product.name}</ContentName>
                      <LogoContainerDiv>
                        <img
                          src={edit}
                          alt="edit"
                          height={20}
                          style={{ padding: "1rem", cursor: "pointer" }}
                        />
                        <img
                          src={trashpng}
                          alt="delete"
                          height={20}
                          style={{ padding: "1rem", cursor: "pointer" }}
                          onClick={() => handleDelete(product.id)}
                        />
                        {expanded[product.id] ? (
                          <img
                            src={arrow}
                            alt="arrow"
                            height={20}
                            onClick={() => toggleExpanded(product.id)}
                            style={{
                              padding: "1rem",
                              cursor: "pointer",
                              rotate: "-90deg",
                            }}
                          />
                        ) : (
                          <img
                            src={arrow}
                            alt="arrow"
                            height={20}
                            onClick={() => toggleExpanded(product.id)}
                            style={{
                              padding: "1rem",
                              cursor: "pointer",
                              rotate: "90deg",
                            }}
                          />
                        )}
                      </LogoContainerDiv>
                    </ContentNameLogoContainer>
                    {expanded[product.id] && (
                      <ContactHolderDiv style={{ fontSize: "1.5rem" }}>
                        <ContactDiv style={{ marginRight: "-2rem" }}>
                          <p style={{ marginRight: "2rem" }}>Part Number</p>
                          <p style={{ color: "blue" }}>{product.partNumber}</p>
                        </ContactDiv>
                        <ContactDiv style={{ marginRight: "-5rem" }}>
                          <p style={{ marginRight: "2rem" }}>Unit</p>
                          <p style={{ color: "blue" }}>
                            {product.unit.shortName}
                          </p>
                        </ContactDiv>
                        <ContactDiv>
                          <p style={{ marginRight: "2rem" }}>Category</p>
                          <p style={{ color: "blue" }}>
                            {product.category.categoryName}
                          </p>
                        </ContactDiv>
                      </ContactHolderDiv>
                    )}
                  </ContentDiv>
                ))}
              </>
            )}
          </ContentTabContainer>
        </ContentListContainer>
        <FormContainer>
          <AddContentForm>
            <h3>Add Product</h3>
            <FormInput
              label="Product Name"
              type="text"
              onChange={handleChange}
              name="productName"
              value={productName}
              style={{ marginBottom: "-3rem" }}
            />
            <FormInput
              label="Part Number"
              type="text"
              onChange={handleChange}
              name="partNumber"
              value={partNumber}
              // style={{ marginBottom: "-3rem" }}
            />
            <Select
              options={unitNamesArray}
              value={selectedUnit}
              onChange={handleUnitChange}
              placeholder="Select Unit"
              isClearable
              isSearchable
              className="react-select-container-product"
              styles={{ zIndex: 3 }}
            />
            <Select
              options={categoryNamesArray}
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder="Select Category"
              isClearable
              isSearchable
              className="react-select-container"
            />
            <SubmitButton>
              {isLoading ? (
                <PropagateLoader color="#36d7b7" loading={isLoading} />
              ) : (
                <AwesomeButton
                  type="secondary"
                  size="large"
                  className="aws-btn"
                  onPress={handleSubmit}
                >
                  Add
                </AwesomeButton>
              )}
            </SubmitButton>
          </AddContentForm>
        </FormContainer>
      </ContentContainer>
    </div>
  );
};

export default Products;
