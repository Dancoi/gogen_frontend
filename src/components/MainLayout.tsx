import { Layout } from "antd";
import type React from "react";

const { Header, Footer, Content } = Layout;

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header style={{ backgroundColor: "#ffff" }}></Header>
			<Content style={{ padding: "25px 182px" }}>{children}</Content>
			<Footer style={{ textAlign: "center" }}>©2026 Все права защищены</Footer>
		</Layout>
	);
};

export default MainLayout;
