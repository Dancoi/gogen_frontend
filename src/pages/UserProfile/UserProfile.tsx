import { Button, Form, Input, message } from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import TokenManager from "../../components/TokenManager";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/apiService";
import "./UserProfile.css";
import { UserOutlined } from "@ant-design/icons";
import CardBackground from "../../assets/MainGoGen.svg";
import ProfileGoGen from "../../assets/ProfileGoGen.svg";
import CardComponent from "../../components/CardComponent.tsx";

interface FormData {
	name: string;
	email: string;
}

const UserProfile: React.FC = () => {
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [logoutLoading, setLogoutLoading] = useState(false);
	const navigate = useNavigate();
	const { user, logout, setUser } = useAuth();

	useEffect(() => {
		const savedAvatar = localStorage.getItem("userAvatar");
		if (savedAvatar) {
			setAvatarUrl(savedAvatar);
		}
	}, []);
	const handleAvatarUpload = (event) => {
		const file = event.target.files[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			message.error("Можно загружать только изображения");
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			message.error("Файл не должен превышать 5 МБ");
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			const base64 = e.target.result;
			setAvatarUrl(base64);
			localStorage.setItem("userAvatar", base64);
			message.success("Фото профиля обновлено");
		};
		reader.readAsDataURL(file);
	};
	const triggerFileInput = () => {
		document.getElementById("avatar-input").click();
	};
	const [formData, setFormData] = useState<FormData>({
		name: user?.username || "GOGEN",
		email: user?.email || "gogen2026@example.com",
	});
	const clearAvatar = (e) => {
		e.stopPropagation();
		setAvatarUrl(null);
		localStorage.removeItem("userAvatar");
		message.info("Фото удалено");
	};
	const handleFinish = (values: FormData) => {
		setLoading(true);
		console.log("Сохраненные данные:", values);

		setTimeout(() => {
			setFormData(values);
			// Обновляем user в context
			if (user) {
				setUser({ ...user, username: values.name });
			}
			alert("Изменения сохранены!");
			setLoading(false);
		}, 500);
	};

	const handleLogout = async () => {
		setLogoutLoading(true);
		try {
			await authAPI.logout();
			logout();
			navigate("/");
		} catch (error) {
			console.error("Ошибка при выходе:", error);
			// Всё равно логаутим локально даже если сервер ошибку вернул
			logout();
			navigate("/");
		} finally {
			setLogoutLoading(false);
		}
	};

	return (
		<MainLayout>
			<div className="profile-container">
				<div className="svg-background">
					<img src={ProfileGoGen} alt="logo" className="background-svg" />
				</div>

				<div className="content-wrapper">
					<div className="profile-section">
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "20px",
								alignItems: "center",
								justifyItems: "space-between",
							}}
						>
							<div
								className="circle-element"
								onClick={triggerFileInput}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										triggerFileInput();
									}
								}}
								style={{
									cursor: "pointer",
									backgroundImage: avatarUrl ? `url(${avatarUrl})` : "none",
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							>
								{!avatarUrl && (
									<UserOutlined
										style={{ fontSize: "64px", color: "#8c8c8c" }}
									/>
								)}
							</div>
							<input
								type="file"
								id="avatar-input"
								accept="image/*"
								style={{ display: "none" }}
								onChange={handleAvatarUpload}
							/>
							{avatarUrl && (
								<div style={{ textAlign: "center" }}>
									<Button type={"dashed"} size="small" onClick={clearAvatar}>
										Удалить фото
									</Button>
								</div>
							)}
							<CardComponent
								size="cover-square"
								background={CardBackground}
								line1="PRO подписка активна"
								bottomButtonText="Сменить тариф"
								onBottomClick={() => console.log("Клик!")}
							/>
						</div>

						<div className="main-form">
							<div className="form-card">
								<h2 style={{ marginBottom: 24, color: "var(--text-h)" }}>
									Профиль
								</h2>
								<Form
									form={form}
									name="profile-form"
									layout="vertical"
									initialValues={formData}
									onFinish={handleFinish}
									autoComplete="off"
								>
									<Form.Item
										label="Имя:"
										name="name"
										rules={[
											{ required: true, message: "Пожалуйста, введите имя" },
											{
												min: 2,
												message: "Имя должно содержать минимум 2 символа",
											},
											{
												max: 50,
												message: "Имя не должно превышать 50 символов",
											},
										]}
										className="form-field"
									>
										<Input
											type="text"
											placeholder="Введите ваше имя"
											size="large"
										/>
									</Form.Item>

									<Form.Item
										label="Почта:"
										name="email"
										rules={[
											{ required: true, message: "Пожалуйста, введите email" },
											{
												type: "email",
												message: "Введите корректный email адрес",
											},
										]}
										className="form-field"
									>
										<Input
											type="email"
											placeholder="example@mail.com"
											size="large"
											disabled
										/>
									</Form.Item>

									<Form.Item>
										<Button
											type="primary"
											htmlType="submit"
											className="save-btn"
											size="large"
											loading={loading}
										>
											Сохранить изменения
										</Button>
									</Form.Item>
								</Form>

								<Button
									danger
									size="large"
									loading={logoutLoading}
									onClick={handleLogout}
									style={{ width: "100%", marginTop: 16 }}
								>
									Выход
								</Button>
							</div>
						</div>
					</div>

					{/* Token Manager Block */}
					<div className="token-manager-section">
						<TokenManager />
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default UserProfile;
