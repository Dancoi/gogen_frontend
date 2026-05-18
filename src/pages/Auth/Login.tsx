import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/MainLayout';
import './Auth.css';

const Login: React.FC = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleFinish = async (values: { email: string; password: string }) => {
		setLoading(true);
		try {
			const response = await authAPI.login(values.email, values.password);
			const userData = response.data.user;
			
			login(userData, userData.token);
			message.success('Успешный вход!');
			
			setTimeout(() => {
				navigate('/profile');
			}, 500);
		} catch (error: any) {
			const errorMessage = error.response?.data?.error || 'Ошибка при авторизации';
			message.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<MainLayout>
			<div className="auth-container">
				<Card className="auth-card">
					<h1 className="auth-title">Авторизация</h1>
					
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
							label="Пароль"
							name="password"
							rules={[
								{ required: true, message: 'Введите пароль' }
							]}
						>
							<Input.Password
								placeholder="Ваш пароль"
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
								Войти
							</Button>
						</Form.Item>
					</Form>

					<Space className="auth-footer">
						<span>Нет аккаунта?</span>
						<Link to="/register" className="auth-link">Зарегистрироваться</Link>
					</Space>
				</Card>
			</div>
		</MainLayout>
	);
};

export default Login;
