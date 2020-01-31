import React from 'react';

function Layout({ header, children }) {
  return (
    <div>
      <div>{header}</div>
      <div>{children}</div>
    </div>
  );
}
export default Layout;
