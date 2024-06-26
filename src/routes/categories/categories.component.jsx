// imports from third party libraries
import { useEffect, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";

// imports from this project
import FormInput from "../../components/form-input/form-input.component";
import {
  AddContentForm,
  ContentContainer,
  ContactDiv,
  ContentDiv,
  ContentListContainer,
  ContentName,
  ContentNameLogoContainer,
  ContentTabContainer,
  FormContainer,
  LogoContainerDiv,
  SubmitButton,
  ContentSearchBarContainer,
  ContactHolderDiv,
} from "../suppliers/suppliers.styles";
import crosspng from "../../assets/cross.png";
import nothingHere from "../../assets/nothing-here.gif";
import trashpng from "../../assets/trash.png";
import edit from "../../assets/edit.png";
import arrow from "../../assets/arrow.png";

// imports from this project state
import {
  saveCategory,
  resetError,
  getCategories,
} from "../../store/category/categorySlice";

const Categories = () => {
  // local state
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState({});

  // redux state
  const error = useSelector((state) => state.category.error);
  const isLoading = useSelector((state) => state.category.isLoading);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  // toggle expanded
  const toggleExpanded = (categoryId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [categoryId]: !prevExpanded[categoryId],
    }));
  };

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "categoryName") {
      setCategoryName(value);
    } else if (name === "parentCategory") {
      setParentCategory(value);
    }
  };

  // reset form fields
  const resetFormFields = () => {
    setCategoryName("");
    setParentCategory("");
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!categoryName) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Category name is required",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3a3a3a",
      });
      return;
    } else if (categoryName === parentCategory) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parent category cannot be same as category",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3a3a3a",
      });
      return;
    }

    // create new category
    const category = {
      category: categoryName,
      parentCategory: parentCategory ? parentCategory : null,
    };

    // dispatch action
    dispatch(saveCategory(category));

    // reset form fields
    resetFormFields();
  };

  // filter categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sort categories
  const sortedCategories = filteredCategories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // handle delete
  const handleDelete = () => {};

  // handle edit
  const handleEdit = () => {};

  // get all categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // handle error
  useEffect(() => {
    if (error) {
      if (
        error === "Request failed with status code 409" ||
        error === "Request failed with status code 400"
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Category already exists!",
          confirmButtonColor: "#3a3a3a",
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          confirmButtonColor: "#3a3a3a",
          timer: 3000,
          timerProgressBar: true,
        });
      }
      dispatch(resetError());
    }
  }, [error, dispatch]);

  return (
    <div>
      <ContentContainer>
        <ContentListContainer>
          <h3>Product Categories</h3>
          <ContentSearchBarContainer>
            <FormInput
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={handleSearch}
              label="Search Product Category"
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
              <HashLoader color="#36d7b7" loading={isLoading} />
            ) : (
              <>
                {categories.length === 0 && (
                  <img src={nothingHere} alt="nothing here" />
                )}
                {sortedCategories.map((category) => (
                  <ContentDiv key={category._id}>
                    <ContentNameLogoContainer>
                      <ContentName>{category.name}</ContentName>
                      <LogoContainerDiv>
                        <img
                          src={edit}
                          alt="edit"
                          height={20}
                          style={{ padding: "1rem", cursor: "pointer" }}
                          onClick={() => handleEdit(category.id)}
                        />
                        <img
                          src={trashpng}
                          alt="delete"
                          height={20}
                          style={{ padding: "1rem", cursor: "pointer" }}
                          onClick={() => handleDelete(category.id)}
                        />
                        {expanded[category.id] ? (
                          <img
                            src={arrow}
                            alt="arrow-up"
                            onClick={() => toggleExpanded(category.id)}
                            height={20}
                            style={{
                              padding: "1rem",
                              cursor: "pointer",
                              rotate: "-90deg",
                            }}
                          />
                        ) : (
                          <img
                            src={arrow}
                            alt="arrow-down"
                            onClick={() => toggleExpanded(category.id)}
                            height={20}
                            style={{
                              padding: "1rem",
                              cursor: "pointer",
                              rotate: "90deg",
                            }}
                          />
                        )}
                      </LogoContainerDiv>
                    </ContentNameLogoContainer>
                    {expanded[category.id] && (
                      <ContactHolderDiv>
                        <ContactDiv>
                          <p style={{ marginRight: "5rem" }}>Parent Category</p>
                          <p style={{ color: "blue" }}>
                            {category.parentCategory}
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
            <h3>Add Category</h3>
            <FormInput
              label="Category Name"
              type="text"
              onChange={handleChange}
              name="categoryName"
              value={categoryName}
            />
            <FormInput
              label="Parent Category Name (if any)"
              type="text"
              onChange={handleChange}
              name="parentCategory"
              value={parentCategory}
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

export default Categories;
