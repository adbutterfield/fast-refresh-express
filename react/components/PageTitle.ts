import styled from "styled-components";

const PageTitle = styled.h1`
  @media (max-width: 767px) {
    margin: 1rem 0;
    font-size: 1.5rem;
  }
  @media (min-width: 768px) {
    margin: 2rem 0;
    font-size: 2rem;
  }
`;

export const StyledPageTitle = styled(PageTitle)`
  color: rgb(0, 0, 143);
  font-size: 1.75rem;
  @media (min-width: 768px) {
    text-align: center;
    font-size: 2.25rem;
  }
`;
