import Header from "../Components/dashboard/header";
import SideBar from "../Components/dashboard/side-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar />
      <Header />
      <div>{children}</div>
    </>
  );
}
