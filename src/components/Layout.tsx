import NavHeader from "../components/Nav/NavHeader";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <header className="bg-dark">
                <NavHeader />
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
