// imports from third party libraries
import { useState } from "react";
import { useDispatch } from "react-redux";

// imports from project
import {
  SupplierListContainer,
  FormContainer,
  SupplierContainer,
  AddSupplierForm,
} from "../../routes/suppliers/suppliers.styles";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import { saveSupplier } from "../../store/supplier/supplier.slice";

const Suppliers = () => {
  const [supplierName, setSupplierName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
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
    if (!supplierName || !whatsappNumber) {
      alert("Please enter supplier name and whatsapp number");
      return;
    } else if (whatsappNumber.length !== 10) {
      alert("Please enter valid whatsapp number");
      return;
    } else if (whatsappNumber === alternateNumber) {
      alert("Please enter different alternate whatsapp number");
      return;
    }

    // // create phone number list
    // const phoneNumberList = [
    //   whatsappNumber,
    //   alternateNumber && alternateNumber.trim() ? alternateNumber : "", // Only add non-empty alternate number
    // ];

    // create supplier object
    const supplier = {
      name: supplierName,
      whatsappNumber: whatsappNumber,
      alternateNumber: alternateNumber ? alternateNumber : null,
    };

    console.log(supplier);

    // dispatch save supplier
    dispatch(saveSupplier(supplier));

    // reset form
    resetFormFields();
  };

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
            <Button type="submit">Add</Button>
          </AddSupplierForm>
        </FormContainer>
      </SupplierContainer>
    </div>
  );
};

export default Suppliers;
