// imports from third party libraries
import { useEffect, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import Select from "react-select";

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
  deleteCategory,
  updateCategory,
} from "../../store/category/category.slice";

const Categories = () => {
  // local state
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState({});
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);

  console.log("expanded", expanded);

  // redux state
  const error = useSelector((state) => state.category.error);
  const isLoading = useSelector((state) => state.category.isLoading);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  const categoryNamesArray = categories.map(({ categoryName }) => ({
    value: categoryName,
    label: categoryName,
  }));

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

  // Access the value from selectedParentCategory and update parentCategory state
  const handleParentCategoryChange = (selectedParentCategory) => {
    return new Promise((resolve) => {
      setSelectedParentCategory(selectedParentCategory);
      resolve(setParentCategory(selectedParentCategory?.value)); // Resolve the promise after state update
    });
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Category name is required",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3a3a3a",
      });
      return;
    } else if (categoryName === parentCategory) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parent category cannot be same as category",
        timer: 2000,
        timerProgressBar: true,
        confirmButtonColor: "#3a3a3a",
      });
      return;
    }

    await handleParentCategoryChange(selectedParentCategory);

    // create new category
    const category = {
      categoryName: categoryName,
      parentCategory: parentCategory ? parentCategory : null,
    };

    // dispatch action
    await dispatch(saveCategory(category));

    // reset form
    resetFormFields();

    // reset selected parent category
    setSelectedParentCategory(null);
  };

  // filter categories
  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sort categories
  const sortedCategories = filteredCategories.sort((a, b) =>
    a.categoryName.localeCompare(b.categoryName)
  );

  // handle search
  const handleSearch = (event) => {
    setExpanded({});
    setSearchTerm(event.target.value);
  };

  // handle delete
  const handleDelete = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      timer: 5000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("categoryId", categoryId);
        dispatch(deleteCategory(categoryId));
        Swal.fire({
          icon: "success",
          title: "Category deleted successfully",
          text: "success",
          confirmButtonColor: "#3a3a3a",
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Category not deleted",
          text: "success",
          confirmButtonColor: "#3a3a3a",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  };

  // handle update
  const handleUpdate = async (categoryId) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Category",
      html: `
          <input id="swal-input1" class="swal2-input" placeholder="Category Name"> <br> <br>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("swal-input1").value];
      },
    });

    if (formValues) {
      // validate form
      if (!formValues[0]) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Category name is required",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3a3a3a",
        });
        return;
      }
    }

    const categoryNamesObject = categoryNamesArray.reduce((acc, category) => {
      acc[category.label] = category.value;
      acc["none of the above"] = "none of the above";
      return acc;
    }, {});

    var { value: parent } = await Swal.fire({
      title: "Select Parent Category",
      input: "select",
      inputOptions: categoryNamesObject,
      inputPlaceholder: "Select Parent Category",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (parent === "NONE OF THE ABOVE") {
      parent = null;
    }

    console.log("formValues", formValues[0]);
    console.log("parent", parent);

    // create new category
    const category = {
      id: categoryId,
      categoryName: formValues[0],
      parentCategory: parent,
    };

    console.log("category", category);
    console.log("sortedCategories", sortedCategories);

    // dispatch action
    const updatedCategory = await dispatch(updateCategory(category));
    console.log("updatedCategory", updatedCategory);
  };

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
          <ContentTabContainer key="category-list">
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
                      <ContentName>{category.categoryName}</ContentName>
                      <LogoContainerDiv>
                        <img
                          src={edit}
                          alt="edit"
                          height={20}
                          style={{ padding: "1rem", cursor: "pointer" }}
                          onClick={() => handleUpdate(category.id)}
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
                          <p
                            style={{ marginRight: "5rem", fontSize: "1.5rem" }}
                          >
                            Parent Category
                          </p>
                          <p style={{ color: "blue", fontSize: "1.5rem" }}>
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
            <Select
              options={categoryNamesArray}
              value={selectedParentCategory}
              onChange={handleParentCategoryChange}
              placeholder="Select Parent Category"
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

export default Categories;
