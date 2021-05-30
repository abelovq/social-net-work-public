import React from 'react';
import { useSelector } from 'react-redux';

function Layout({ header, children }) {
  const isAuth = useSelector(state => state.login.isAuth)
  const headerRender = () => {
    if (JSON.parse(localStorage.getItem('authToken')) && isAuth === true) {
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
