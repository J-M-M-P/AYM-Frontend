type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <header className="container">
                <h1 className="mb-5 fs-4 fw-bold fst-italic text-center">AYM Higher CPH</h1>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
