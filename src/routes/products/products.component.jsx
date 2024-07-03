// imports from third party libraries
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";

// imports from react redux
import { useSelector, useDispatch } from "react-redux";

// imports from project
import {
  AddContentForm,
  ContentContainer,
  ContentDiv,
  ContentListContainer,
  ContentName,
  ContentNameLogoContainer,
  ContentSearchBarContainer,
  ContentTabContainer,
  FormContainer,
  LogoContainerDiv,
} from "../suppliers/suppliers.styles";
import nothingHere from "../../assets/nothing-here.gif";
import edit from "../../assets/edit.png";
import trashpng from "../../assets/trash.png";
import arrow from "../../assets/arrow.png";
import crosspng from "../../assets/cross.png";

// imports from this project state
import { getProducts } from "../../store/product/product.slice";

const Products = () => {
  // redux state
  const error = useSelector((state) => state.product.error);
  const isLoading = useSelector((state) => state.product.isLoading);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  // local states
  const [searchTerm, setSearchTerm] = useState("");

  // filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sort products
  const sortedProducts = filteredProducts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // get all products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <ContentContainer>
        <ContentListContainer>
          <h3>Products</h3>
          <ContentSearchBarContainer></ContentSearchBarContainer>
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
                        />
                      </LogoContainerDiv>
                    </ContentNameLogoContainer>
                  </ContentDiv>
                ))}
              </>
            )}
          </ContentTabContainer>
        </ContentListContainer>
        <FormContainer>
          <AddContentForm>
            <h3>Add Product</h3>
          </AddContentForm>
        </FormContainer>
      </ContentContainer>
    </div>
  );
};

export default Products;
