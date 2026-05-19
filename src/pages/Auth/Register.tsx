import { Button, Card, Form, Input, message, Space } from "antd";
import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../services/apiService";
import "./Auth.css";

const Register: React.FC = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleFinish = async (values: {
		email: string;
		username: string;
		password: string;
		confirmPassword: string;
	}) => {
		if (values.password !== values.confirmPassword) {
			message.error("Пароли не совпадают");
			return;
		}

		setLoading(true);
		try {
			await authAPI.register(values.email, values.username, values.password);
			message.success("Регистрация успешна! Перенаправляем...");

			// Автоматически логиним после регистрации
			const loginResponse = await authAPI.login(values.email, values.password);
			const userData = loginResponse.data.user;
			login(userData, userData.token);

			setTimeout(() => {
				navigate("/profile");
			}, 500);
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error || "Ошибка при регистрации";
			message.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const styles = {
		container: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "calc(100vh - 200px)",
			background: "linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%)",
			borderRadius: 16,
			padding: "40px 20px",
			margin: "-25px -182px",
			width: "calc(100% + 364px)",
		},
		card: {
			maxWidth: 480,
			width: "100%",
			borderRadius: 24,
			boxShadow: "0 20px 35px -10px rgba(0,0,0,0.1)",
			backgroundColor: "#ffffff",
			border: "none",
		},
		title: {
			fontSize: 28,
			fontWeight: 600,
			textAlign: "center" as const,
			marginBottom: 8,
			color: "#1a2c3e",
		},
		button: {
			backgroundColor: "rgb(0, 179, 196)",
			borderColor: "rgb(0, 179, 196)",
			height: 44,
			fontSize: 16,
			fontWeight: 500,
		},
		footer: {
			display: "flex",
			justifyContent: "center",
			width: "100%",
			marginTop: 16,
			color: "#5a6874",
		},
		link: {
			color: "rgb(0, 179, 196)",
			fontWeight: 500,
			textDecoration: "none",
		},
	};

	return (
		<MainLayout>
			<div style={styles.container}>
				<Card style={styles.card} bordered={false}>
					<h1 style={styles.title}>Регистрация</h1>

					<Form
						form={form}
						layout="vertical"
						onFinish={handleFinish}
						autoComplete="off"
						style={{ marginTop: 24 }}
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{ required: true, message: "Введите email" },
								{ type: "email", message: "Введите корректный email" },
							]}
						>
							<Input placeholder="your@email.com" size="large" type="email" />
						</Form.Item>

						<Form.Item
							label="Имя пользователя"
							name="username"
							rules={[
								{ required: true, message: "Введите имя пользователя" },
								{ min: 3, message: "Минимум 3 символа" },
								{ max: 50, message: "Максимум 50 символов" },
							]}
						>
							<Input placeholder="john_doe" size="large" />
						</Form.Item>

						<Form.Item
							label="Пароль"
							name="password"
							rules={[
								{ required: true, message: "Введите пароль" },
								{ min: 6, message: "Минимум 6 символов" },
							]}
						>
							<Input.Password placeholder="Ваш пароль" size="large" />
						</Form.Item>

						<Form.Item
							label="Подтвердите пароль"
							name="confirmPassword"
							rules={[{ required: true, message: "Подтвердите пароль" }]}
						>
							<Input.Password placeholder="Повторите пароль" size="large" />
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								loading={loading}
								block
								style={styles.button}
							>
								Создать аккаунт
							</Button>
						</Form.Item>
					</Form>

					<Space style={styles.footer}>
						<span>Уже есть аккаунт?</span>
						<Link to="/login" style={styles.link}>
							Войти
						</Link>
					</Space>
				</Card>
			</div>
		</MainLayout>
	);
};

export default Register;
