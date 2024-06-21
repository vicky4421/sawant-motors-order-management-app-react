// imports from third party libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

// imports from project
import {
  SupplierListContainer,
  FormContainer,
  SupplierContainer,
  AddSupplierForm,
} from "../../routes/suppliers/suppliers.styles";
import FormInput from "../../components/form-input/form-input.component";
import { saveSupplier } from "../../store/supplier/supplier.slice";
import { resetError } from "../../store/supplier/supplier.slice";

const Suppliers = () => {
  const [supplierName, setSupplierName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const error = useSelector((state) => state.supplier.error);
  const dispatch = useDispatch();

  // reset form fields
  const resetFormFields = () => {
    setSupplierName("");
    setWhatsappNumber("");
    setAlternateNumber("");
  };

  // handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "supplierName") {
      setSupplierName(value);
    } else if (name === "whatsappNumber") {
      setWhatsappNumber(value);
    } else if (name === "alternateNumber") {
      setAlternateNumber(value);
    }
  };

  // handle submit
  const handlesubmit = (event) => {
    event.preventDefault();

    // validate form
    if (!whatsappNumber) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter whatsapp number",
        confirmButtonColor: "#3a3a3a",
      });
      return;
    }
    if (!supplierName) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter supplier name",
        confirmButtonColor: "#3a3a3a",
      });
      return;
    } else if (whatsappNumber.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid whatsapp number",
        confirmButtonColor: "#3a3a3a",
      });
      return;
    } else if (whatsappNumber === alternateNumber) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter different alternate whatsapp number",
        confirmButtonColor: "#3a3a3a",
      });
      return;
    }

    // create supplier object
    const supplier = {
      name: supplierName,
      whatsappNumber: whatsappNumber,
      alternateNumber: alternateNumber ? alternateNumber : null,
    };

    // dispatch save supplier
    dispatch(saveSupplier(supplier));

    // reset form
    resetFormFields();
  };

  useEffect(() => {
    if (error) {
      if (error === "Request failed with status code 409") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Contact already exists!",
          confirmButtonColor: "#3a3a3a",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          confirmButtonColor: "#3a3a3a",
        });
      }
      dispatch(resetError());
    }
  }, [error, dispatch]);

  return (
    <div>
      <SupplierContainer>
        <SupplierListContainer></SupplierListContainer>
        <FormContainer>
          <h3>Add Supplier</h3>
          <AddSupplierForm onSubmit={handlesubmit}>
            <FormInput
              label="Supplier Name"
              type="text"
              required
              onChange={handleChange}
              name="supplierName"
              value={supplierName}
            />
            <FormInput
              label="Whatsapp Number"
              type="text"
              required
              onChange={handleChange}
              name="whatsappNumber"
              value={whatsappNumber}
            />
            <FormInput
              label="Alternate Whatsapp Number"
              type="text"
              onChange={handleChange}
              name="alternateNumber"
              value={alternateNumber}
            />
            <AwesomeButton
              type="secondary"
              size="large"
              className="aws-btn"
              onPress={handlesubmit}
            >
              Add
            </AwesomeButton>
          </AddSupplierForm>
        </FormContainer>
      </SupplierContainer>
    </div>
  );
};

export default Suppliers;
