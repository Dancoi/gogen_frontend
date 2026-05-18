import { Button, Layout, Menu } from "antd";
import type React from "react";
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useAuth } from "../context/AuthContext.tsx";

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
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const hasScrolledRef = useRef(false);

	const navItems = [
		{ key: "about", label: "О нас", id: "about-section" },
		{ key: "services", label: "Наши услуги", id: "services-section" },
		{ key: "plan", label: "План", id: "plan-section" },
		{ key: "history", label: "История версий", id: "version-history-section" },
		{ key: "contacts", label: "Контакты", id: "footer-contact" },
	];

	const handleNavigation = (id: string) => () => {
		if (location.pathname !== "/") {
			navigate("/", { state: { scrollTo: id } });
		} else {
			scrollToSection(id);
		}
	};

	useEffect(() => {
		const scrollTarget = location.state?.scrollTo;
		if (location.pathname === "/" && scrollTarget && !hasScrolledRef.current) {
			const timer = setTimeout(() => {
				scrollToSection(scrollTarget);
				hasScrolledRef.current = true;
				window.history.replaceState({}, document.title);
			}, 100);
			return () => clearTimeout(timer);
		}
		if (location.pathname !== "/") {
			hasScrolledRef.current = false;
		}
	}, [location]);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

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
				<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
					{!isAuthenticated ? (
						<>
							<Link to="/login">
								<Button type="text">Вход</Button>
							</Link>
							<Link to="/register">
								<Button
									type="primary"
									style={{
										backgroundColor: "rgb(0, 179, 196)",
										borderColor: "rgb(0, 179, 196)",
									}}
								>
									Регистрация
								</Button>
							</Link>
						</>
					) : (
						<>
							<Link to="/profile">
								<Button
									type="primary"
									style={{
										backgroundColor: "rgb(0, 179, 196)",
										borderColor: "rgb(0, 179, 196)",
									}}
								>
									Мой профиль
								</Button>
							</Link>
							<Button type="text" onClick={handleLogout}>
								Выйти
							</Button>
						</>
					)}
				</div>
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
					position: "sticky",
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
