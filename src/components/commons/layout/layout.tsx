import Header from "./header";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
