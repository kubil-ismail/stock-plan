import React from "react";
import MainLayout from "@/layouts/layouts";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return <MainLayout>{children}</MainLayout>;
}

export default Layout;
