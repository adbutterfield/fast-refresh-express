import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';

const Cmp = styled.div`
  color: red;
`;

// If you don't use the styled component, and export this instead, then it works
// const Cmp: React.FC<PropsWithChildren> = (props) => {
//   const { children } = props;

//   return <div>{ children }</div>;
// }

// Also, this will work, but component is not rendered initially (until after hydration finishes?)
// useEffect of course doesn't run on the server, so it isn't rendered server side
// const StyledCmp = styled.div`
//   color: red;
// `;

// const Cmp: React.FC<PropsWithChildren> = (props) => {
//   const { children } = props;
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;

//   return <StyledCmp>{ children }</StyledCmp>;
// }

export default Cmp;
