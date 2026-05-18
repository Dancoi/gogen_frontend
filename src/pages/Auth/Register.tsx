import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/MainLayout';
import './Auth.css';

const Register: React.FC = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleFinish = async (values: { email: string; username: string; password: string; confirmPassword: string }) => {
		if (values.password !== values.confirmPassword) {
			message.error('Пароли не совпадают');
			return;
		}

		setLoading(true);
		try {
			await authAPI.register(values.email, values.username, values.password);
			message.success('Регистрация успешна! Перенаправляем...');
			
			// Автоматически логиним после регистрации
			const loginResponse = await authAPI.login(values.email, values.password);
			const userData = loginResponse.data.user;
			login(userData, userData.token);
			
			setTimeout(() => {
				navigate('/profile');
			}, 500);
		} catch (error: any) {
			const errorMessage = error.response?.data?.error || 'Ошибка при регистрации';
			message.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<MainLayout>
			<div className="auth-container">
				<Card className="auth-card">
					<h1 className="auth-title">Регистрация</h1>
					
					<Form
						form={form}
						layout="vertical"
						onFinish={handleFinish}
						autoComplete="off"
						className="auth-form"
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{ required: true, message: 'Введите email' },
								{ type: 'email', message: 'Введите корректный email' }
							]}
						>
							<Input
								placeholder="your@email.com"
								size="large"
								type="email"
							/>
						</Form.Item>

						<Form.Item
							label="Имя пользователя"
							name="username"
							rules={[
								{ required: true, message: 'Введите имя пользователя' },
								{ min: 3, message: 'Минимум 3 символа' },
								{ max: 50, message: 'Максимум 50 символов' }
							]}
						>
							<Input
								placeholder="john_doe"
								size="large"
							/>
						</Form.Item>

						<Form.Item
							label="Пароль"
							name="password"
							rules={[
								{ required: true, message: 'Введите пароль' },
								{ min: 6, message: 'Минимум 6 символов' }
							]}
						>
							<Input.Password
								placeholder="Ваш пароль"
								size="large"
							/>
						</Form.Item>

						<Form.Item
							label="Подтвердите пароль"
							name="confirmPassword"
							rules={[
								{ required: true, message: 'Подтвердите пароль' }
							]}
						>
							<Input.Password
								placeholder="Повторите пароль"
								size="large"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								loading={loading}
								block
								className="auth-button"
							>
								Создать аккаунт
							</Button>
						</Form.Item>
					</Form>

					<Space className="auth-footer">
						<span>Уже есть аккаунт?</span>
						<Link to="/login" className="auth-link">Войти</Link>
					</Space>
				</Card>
			</div>
		</MainLayout>
	);
};

export default Register;
