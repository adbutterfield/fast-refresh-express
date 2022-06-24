import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Cmp = styled.div`
  color: red;
`;

// If you don't use the styled component, and export this instead, then it works
// const Cmp: React.FC<PropsWithChildren> = (props) => {
//   const { children } = props;

//   return <div>{ children }</div>;
// }

export default Cmp;
