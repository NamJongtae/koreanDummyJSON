import Footer from './footer';
import Header from "./header";
import MobileNav from "./mobile-nav/mobile-nav";
import MobileNavProvider from "@/src/store/mobile-nav-provider";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <>
      <MobileNavProvider>
        <Header />
        <MobileNav />
      </MobileNavProvider>
      {children}
      <Footer />
    </>
  );
}
