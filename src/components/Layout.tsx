type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            
            <main>{children}</main>
        </div>
    );
};

export default Layout;
