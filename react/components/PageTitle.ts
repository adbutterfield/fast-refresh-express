import styled from "styled-components";

const PageTitle = styled.h1`
  @media (max-width: 767px) {
    margin: 1rem 0;
    font-size: 1.7rem;
  }
  @media (min-width: 768px) {
    margin: 3rem 0 1rem 0;
    font-size: 2.2rem;
  }
`;

export const StyledPageTitle = styled(PageTitle)`
  color: rgb(0, 0, 143);
  font-size: 1.8rem;
  @media (min-width: 768px) {
    text-align: center;
    font-size: 1.6rem;
  }
`;