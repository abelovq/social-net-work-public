import React from 'react';

function Layout({ header, children }) {
  const headerRender = () => {
    if (JSON.parse(localStorage.getItem('authToken'))) {
      return <div>{header}</div>;
    }
    return null;
  };

  return (
    <>
      {headerRender()}
      <div>{children}</div>
    </>
  );
}
export default Layout;
