// imports from third party libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { PropagateLoader } from "react-spinners";

// imports from project
import {
  SupplierListContainer,
  FormContainer,
  SupplierContainer,
  AddSupplierForm,
  SubmitButton,
  SupplierName,
  SupplierDiv,
  LogoContainerDiv,
  ContactHolderDiv,
  ContactDiv,
  SupplierNameLogoContainer,
  SearchBarContainer,
} from "../../routes/suppliers/suppliers.styles";
import FormInput from "../../components/form-input/form-input.component";
import { saveSupplier } from "../../store/supplier/supplier.slice";
import { getSupplier } from "../../store/supplier/supplier.slice";
import { resetError } from "../../store/supplier/supplier.slice";
import arrowDown from "../../assets/arrow-down.png";
import arrowUp from "../../assets/arrow-up.png";

const Suppliers = () => {
  // local state
  const [supplierName, setSupplierName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState({ [supplierName]: false });

  // redux state
  const error = useSelector((state) => state.supplier.error);
  const isLoading = useSelector((state) => state.supplier.isLoading);
  const suppliers = useSelector((state) => state.supplier.suppliers);
  const dispatch = useDispatch();

  // toggle expanded state
  const toggleExpanded = (supplierName) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [supplierName]: !prevExpanded[supplierName],
    }));
  };

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

  // handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // handle submit
  const handlesubmit = (event) => {
    event.preventDefault();

    // validate form
    if (!supplierName) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter supplier name",
        confirmButtonColor: "#3a3a3a",
      });
      return;
    } else if (!whatsappNumber) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter whatsapp number",
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

  useEffect(() => {
    dispatch(getSupplier());
  }, [dispatch]);

  return (
    <div>
      <SupplierContainer>
        <SupplierListContainer>
          <h3>Suppliers</h3>
          <SearchBarContainer>
            <FormInput
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={handleSearch}
              label="Search Supplier"
              required
            />
          </SearchBarContainer>
          {suppliers.length === 0 && <p>No suppliers found</p>}
          {filteredSuppliers.map((supplier) => (
            <SupplierDiv key={supplier._id}>
              <SupplierNameLogoContainer>
                <SupplierName>{supplier.name}</SupplierName>
                <LogoContainerDiv>
                  {expanded[supplier.name] ? (
                    <img
                      src={arrowUp}
                      alt="arrow-up"
                      onClick={() => toggleExpanded(supplier.name)}
                      height={20}
                    />
                  ) : (
                    <img
                      src={arrowDown}
                      alt="arrow-down"
                      onClick={() => toggleExpanded(supplier.name)}
                      height={20}
                    />
                  )}
                </LogoContainerDiv>
              </SupplierNameLogoContainer>
              {expanded[supplier.name] && (
                <ContactHolderDiv>
                  <ContactDiv>
                    <p style={{ marginRight: "5rem" }}>Whatsapp Number</p>
                    <p style={{ color: "blue" }}>{supplier.whatsappNumber}</p>
                  </ContactDiv>
                  {supplier.alternateNumber && (
                    <ContactDiv>
                      <p style={{ marginRight: "5rem" }}>Alternate Number</p>
                      <p style={{ color: "blue" }}>
                        {supplier.alternateNumber}
                      </p>
                    </ContactDiv>
                  )}
                </ContactHolderDiv>
              )}
            </SupplierDiv>
          ))}
        </SupplierListContainer>
        <FormContainer>
          <AddSupplierForm onSubmit={handlesubmit}>
            <h3>Add Supplier</h3>
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
            <SubmitButton>
              {isLoading ? (
                <PropagateLoader color="#36d7b7" loading={isLoading} />
              ) : (
                <AwesomeButton
                  type="secondary"
                  size="large"
                  className="aws-btn"
                  onPress={handlesubmit}
                >
                  Add
                </AwesomeButton>
              )}
            </SubmitButton>
          </AddSupplierForm>
        </FormContainer>
      </SupplierContainer>
    </div>
  );
};

export default Suppliers;
