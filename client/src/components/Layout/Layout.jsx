import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({ title, author, description, children }) => {
  return (
    <div>
      <Helmet>
        <meta name="author" content={author} />
        <meta name="description" content={description} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className='layout-main' style={{ margin: '0px !important', minHeight: '90vh', width: '100vw' }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "UKA SALES",
  author: "Unnat Kumar Agarwal",
  description: "T4F4av4y$6w4P8jqzLnxozia6iHuQ"
}
export default Layout