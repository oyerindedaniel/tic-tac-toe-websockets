import React, { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <header>.</header> */}
      <main className="m-auto max-w-[1750px]">{children}</main>
      {/* <footer>.</footer> */}
    </>
  );
};

export default Layout;
