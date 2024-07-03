import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 2rem;
  max-height: 100vh;
`;

export const ContentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 0 1rem;
`;

export const ContentSearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin-bottom: 2rem;
`;

export const ContentTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  max-height: 50vh;
  overflow-y: scroll;

  /* hide scrollbar  */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 90%;
  margin-bottom: 1rem;
  border: 1px solid #3a3a3a;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const ContentNameLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: -2rem;
  margin-top: -2rem;
`;

export const LogoContainerDiv = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  width: 50%;
  margin: auto auto;
`;

export const ContentName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 0;
  width: 50%;
`;

export const ContactHolderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ContactDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: -2rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 0 1rem;
`;

export const AddContentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SubmitButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
