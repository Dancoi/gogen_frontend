import { Layout, Menu } from "antd";
import type React from "react";
import Logo from "../assets/Logo.png";

const { Header, Footer, Content } = Layout;

const scrollToSection = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: "smooth", block: "start" });
	}
};

interface MainLayoutProps {
	children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const navItems = [
		{ key: "about", label: "О нас", id: "about-section" },
		{ key: "services", label: "Наши услуги", id: "services-section" },
		{ key: "plan", label: "План", id: "plan-section" },
		{ key: "history", label: "История версий", id: "version-history-section" },
		{ key: "contacts", label: "Контакты", id: "footer-contact" },
	];

	const handleNavigation = (id: string) => () => scrollToSection(id);

	return (
		<Layout style={{ minHeight: "100vh", position: "relative" }}>
			<Header
				style={{
					backgroundColor: "#ffff",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 50px",
					position: "sticky",
					top: 0,
					zIndex: 1000,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
					<img
						src={Logo}
						alt="Logo"
						style={{ width: "45px", height: "45px" }}
					/>
					<span style={{ fontSize: 20, fontWeight: 600 }}>GOGEN</span>
				</div>

				<Menu
					mode="horizontal"
					style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
				>
					{navItems.map((item) => (
						<Menu.Item key={item.key}>
							<button
								type="button"
								onClick={handleNavigation(item.id)}
								style={{
									background: "none",
									border: "none",
									cursor: "pointer",
									fontSize: "inherit",
									padding: 0,
									color: "inherit",
								}}
							>
								{item.label}
							</button>
						</Menu.Item>
					))}
				</Menu>
			</Header>

			<Content style={{ padding: "25px 182px" }}>{children}</Content>

			<Footer
				id="footer-contact"
				style={{
					height: 250,
					backgroundColor: "#030612",
					padding: "40px 182px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<div>
						<div
							style={{
								fontSize: 18,
								fontWeight: 600,
								marginBottom: 12,
								color: "#FBF5F5",
							}}
						>
							Обратная связь
						</div>
						<a
							href="mailto:info@gogen.ru"
							style={{ fontSize: 16, color: "#FBF5F5", textDecoration: "none" }}
						>
							info@gogen.ru
						</a>
					</div>

					<div style={{ display: "flex", gap: 32 }}>
						{navItems.map((item) => (
							<button
								key={item.key}
								type="button"
								onClick={handleNavigation(item.id)}
								style={{
									background: "none",
									border: "none",
									cursor: "pointer",
									fontSize: 16,
									color: "#FBF5F5",
									transition: "color 0.2s",
									padding: 0,
								}}
								onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
								onMouseLeave={(e) => (e.currentTarget.style.color = "#FBF5F5")}
							>
								{item.label}
							</button>
						))}
					</div>
				</div>

				<div
					style={{
						textAlign: "center",
						fontSize: 14,
						color: "#FBF5F5",
						borderTop: "1px solid rgba(255,255,255,0.2)",
						paddingTop: 24,
					}}
				>
					GOGEN FAM, 2026
				</div>
			</Footer>
		</Layout>
	);
};

export default MainLayout;
