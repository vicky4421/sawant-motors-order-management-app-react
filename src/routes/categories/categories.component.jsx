// imports from third party libraries
import { useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

// imports from this project
import FormInput from "../../components/form-input/form-input.component";
import {
  AddContentForm,
  ContentContainer,
  ContentListContainer,
  ContentSearchBarContainer,
  ContentTabContainer,
  FormContainer,
  SubmitButton,
} from "../suppliers/suppliers.styles";

const Categories = () => {
  // local state
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");

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

    // reset form fields
    resetFormFields();
  };

  return (
    <div>
      <ContentContainer>
        <ContentListContainer>
          <h3>Categories</h3>
          <ContentSearchBarContainer></ContentSearchBarContainer>
          <ContentTabContainer></ContentTabContainer>
        </ContentListContainer>
        <FormContainer>
          <AddContentForm>
            <h3>Add Category</h3>
            <FormInput
              label="Category Name"
              type="text"
              required
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
              <AwesomeButton
                type="secondary"
                size="large"
                className="aws-btn"
                onPress={handleSubmit}
              >
                Add
              </AwesomeButton>
            </SubmitButton>
          </AddContentForm>
        </FormContainer>
      </ContentContainer>
    </div>
  );
};

export default Categories;
