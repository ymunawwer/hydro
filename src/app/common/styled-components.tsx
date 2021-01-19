import styled from "styled-components";

export const PrimaryButton = styled.button`
  padding: 10px 0;
  font-size: 1rem;
  display: inline-block;
  border-radius: 0.25rem;
  background-color: #eb8b2d;
  color: #ffffff;
  line-height: 1.5;
  border: 0;
  transition: 0.5s all ease;
  min-width: 15rem;
  font-family: Avenir-Roman;
  &:hover {
    opacity: 0.8;
  }
}
`;

export const PrimarySmallButton = styled.button`
  font-size: 1rem;
  display: inline-block;
  border-radius: 0.25rem;
  background-color: #eb8b2d;
  color: #ffffff;
  line-height: 1.5;
  border: 0;
  transition: 0.5s all ease;
  width: 105px;
  font-family: Avenir-Roman;
  padding: 10px 0;
  &:hover {
    opacity: 0.8;
  }
}
`;

export const SecondaryButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #5090f8;
  color: #5090f8;
  border-radius: 4px;
  background-color: white;
  padding: 10px 0;
  font-family: Avenir-Roman;
  font-size: 16px;
`;

export const SecondarySmallButton = styled.button`
  width: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #5090f8;
  color: #5090f8;
  border-radius: 4px;
  background-color: white;
  padding: 10px 0;
  font-family: Avenir-Roman;
  font-size: 16px;
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  border-radius: 4px;
  background-color: #eb8b2d;
  padding: 0.6em;
  font-family: Avenir-Roman;
  font-size: 16px;
`;

export const Styledlabel = styled.label`
  display: block;
  padding: 0.5em 0;
  font-family: Avenir-Medium;
  font-size: 14px;
  color: #384150;
`;

export const ApprovalButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  border-radius: 4px;
  background-color: #28cc97;
  padding: 3px 12px;
  font-family: Avenir-Medium;
  font-size: 14px;
`;

export const RejectButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  border-radius: 4px;
  background-color: #ff4766;
  padding: 3px 12px;
  font-family: Avenir-Medium;
  font-size: 14px;
`;

export const InfoButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: white;
  border-radius: 4px;
  background-color: #5090f8;
  padding: 3px 12px;
  font-family: Avenir-Medium;
  font-size: 14px;
`;
