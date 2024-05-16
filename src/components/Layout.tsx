import NavHeader from "../components/Nav/NavHeader";
import Footer from "../components/Footer/Footer";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <header><NavHeader /></header>
            <main>{children}</main>
            <footer><Footer /></footer>
        </div>
    );
};

export default Layout;
