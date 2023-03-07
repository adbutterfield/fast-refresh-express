import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkCmp = styled(Link).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["isActive"].includes(prop) && defaultValidatorFn(prop),
})<{ isActive: boolean }>`
  ${({ isActive }) => isActive && `font-weight: bold;`}
`;

export default LinkCmp;
