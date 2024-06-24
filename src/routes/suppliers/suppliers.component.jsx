// imports from third party libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { PropagateLoader } from "react-spinners";
import { HashLoader } from "react-spinners";

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
  SupplierTabContainer,
} from "../../routes/suppliers/suppliers.styles";
import FormInput from "../../components/form-input/form-input.component";
import nothingHere from "../../assets/nothing-here.gif";
import trashpng from "../../assets/trash.png";
import arrow from "../../assets/arrow.png";
import edit from "../../assets/edit.png";
import crosspng from "../../assets/cross.png";

// imports from this project state
import { saveSupplier } from "../../store/supplier/supplier.slice";
import { getSupplier } from "../../store/supplier/supplier.slice";
import { resetError } from "../../store/supplier/supplier.slice";
import { deleteSupplier } from "../../store/supplier/supplier.slice";
import { updateSupplier } from "../../store/supplier/supplier.slice";
import { updateContact } from "../../store/supplier/supplier.slice";

const Suppliers = () => {
  // local state
  const [supplierName, setSupplierName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // redux state
  const error = useSelector((state) => state.supplier.error);
  const isLoading = useSelector((state) => state.supplier.isLoading);
  const suppliers = useSelector((state) => state.supplier.suppliers);
  const dispatch = useDispatch();

  // const [expanded, setExpanded] = useState({ [supplierName]: false });
  const [expanded, setExpanded] = useState({});

  // toggle expanded
  const toggleExpanded = (supplierId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [supplierId]: !prevExpanded[supplierId],
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

  // filter suppliers
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sort suppliers
  const sortedSuppliers = filteredSuppliers.sort((a, b) =>
    a.name.localeCompare(b.name)
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
        timer: 5000,
        timerProgressBar: true,
      });
      return;
    } else if (whatsappNumber.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid whatsapp number",
        confirmButtonColor: "#3a3a3a",
        timer: 5000,
        timerProgressBar: true,
      });
      return;
    } else if (whatsappNumber === alternateNumber) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter different alternate whatsapp number",
        confirmButtonColor: "#3a3a3a",
        timer: 5000,
        timerProgressBar: true,
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

  // handle delete
  const handleDelete = (supplierId) => {
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
        dispatch(deleteSupplier(supplierId));
        Swal.fire({
          icon: "success",
          title: "Supplier deleted successfully",
          text: "success",
          confirmButtonColor: "#3a3a3a",
          timer: 5000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Supplier not deleted",
          text: "success",
          confirmButtonColor: "#3a3a3a",
          timer: 5000,
          timerProgressBar: true,
        });
      }
    });
  };

  // handle edit
  const handleEdit = async (supplierId) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Supplier",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Supplier Name">
        <input id="swal-input2" class="swal2-input" placeholder="Whatsapp Number"> 
        <input id="swal-input3" class="swal2-input" placeholder="Alternate Number">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
        ];
      },
    });

    if (formValues) {
      // validate form
      if (!formValues[0] && !formValues[1] && !formValues[2]) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter supplier name and whatsapp number",
          confirmButtonColor: "#3a3a3a",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
      if (formValues[1] && formValues[1].length !== 10) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter valid whatsapp number",
          confirmButtonColor: "#3a3a3a",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
      if (formValues[2] && formValues[2].length !== 10) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter valid whatsapp number",
          confirmButtonColor: "#3a3a3a",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
      if (formValues[1] && formValues[2] && formValues[1] === formValues[2]) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter different alternate and whatsapp number",
          confirmButtonColor: "#3a3a3a",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }

      const supplier = {
        id: supplierId,
        name: formValues[0],
        whatsappNumber: formValues[1],
        alternateNumber: formValues[2],
      };

      dispatch(updateSupplier(supplier));
    }
  };

  // handle remove number
  const handleRemoveNumber = (newSupplier) => {
    const supplier = {
      id: newSupplier.id,
      name: newSupplier.name,
      whatsappNumber: newSupplier.whatsappNumber,
      alternateNumber: null,
    };
    dispatch(updateContact(supplier));
  };

  useEffect(() => {
    if (error) {
      if (
        error === "Request failed with status code 409" ||
        error === "Request failed with status code 400"
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Contact already exists!",
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
          </SearchBarContainer>
          <SupplierTabContainer>
            {isLoading ? (
              <HashLoader color="#36d7b7" loading={isLoading} size={150} />
            ) : (
              <>
                {suppliers.length === 0 && (
                  <img src={nothingHere} alt="nothing here" />
                )}
                {sortedSuppliers.map((supplier) => (
                  <SupplierDiv key={supplier.id}>
                    <SupplierNameLogoContainer>
                      <SupplierName>{supplier.name}</SupplierName>
                      <LogoContainerDiv>
                        <img
                          src={edit}
                          alt="edit"
                          height={20}
                          style={{ padding: "1rem", cursor: "pointer" }}
                          onClick={() => handleEdit(supplier.id)}
                        />
                        <img
                          src={trashpng}
                          alt="delete"
                          height={20}
                          style={{ padding: "1rem", cursor: "pointer" }}
                          onClick={() => handleDelete(supplier.id)}
                        />
                        {expanded[supplier.id] ? (
                          <img
                            src={arrow}
                            alt="arrow-up"
                            onClick={() => toggleExpanded(supplier.id)}
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
                            onClick={() => toggleExpanded(supplier.id)}
                            height={20}
                            style={{
                              padding: "1rem",
                              cursor: "pointer",
                              rotate: "90deg",
                            }}
                          />
                        )}
                      </LogoContainerDiv>
                    </SupplierNameLogoContainer>
                    {expanded[supplier.id] && (
                      <ContactHolderDiv>
                        <ContactDiv>
                          <p style={{ marginRight: "5rem" }}>Whatsapp Number</p>
                          <p style={{ color: "blue" }}>
                            {supplier.whatsappNumber}
                          </p>
                        </ContactDiv>
                        {supplier.alternateNumber && (
                          <ContactDiv>
                            <p style={{ marginRight: "5rem" }}>
                              Alternate Number
                            </p>
                            <p style={{ color: "blue" }}>
                              {supplier.alternateNumber}
                            </p>
                            <img
                              src={crosspng}
                              alt="remove"
                              height={20}
                              style={{ marginLeft: "1rem", cursor: "pointer" }}
                              onClick={() => handleRemoveNumber(supplier)}
                            />
                          </ContactDiv>
                        )}
                      </ContactHolderDiv>
                    )}
                  </SupplierDiv>
                ))}
              </>
            )}
          </SupplierTabContainer>
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
