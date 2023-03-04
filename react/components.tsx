import { Link } from "react-router-dom";
import styled from "styled-components";

const Cmp = styled.div`
  color: red;
`;

export const LinkCmp = styled(Link).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["isActive"].includes(prop) && defaultValidatorFn(prop),
})<{ isActive: boolean }>`
  ${({ isActive }) => isActive && `font-weight: bold;`}
`;

export default Cmp;
