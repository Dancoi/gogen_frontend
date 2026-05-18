import React, { useState } from 'react';
import {Input, Button, Form} from 'antd';
import { useNavigate } from 'react-router-dom';
import MainLayout from "../../components/MainLayout";
import TokenManager from "../../components/TokenManager";
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/apiService';
import "./UserProfile.css";
import ProfileGoGen from "../../assets/ProfileGoGen.svg";
import CardBackground from "../../assets/MainGoGen.svg";
import CardComponent from "../../components/CardComponent.tsx";

interface FormData {
    name: string;
    email: string;
}

const UserProfile: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const navigate = useNavigate();
    const { user, logout, setUser } = useAuth();

    const [formData, setFormData] = useState<FormData>({
        name: user?.username || 'GOGEN',
        email: user?.email || 'gogen2026@example.com',
    });

    const handleFinish = (values: FormData) => {
        setLoading(true);
        console.log('Сохраненные данные:', values);

        setTimeout(() => {
            setFormData(values);
            // Обновляем user в context
            if (user) {
                setUser({ ...user, username: values.name });
            }
            alert('Изменения сохранены!');
            setLoading(false);
        }, 500);
    };

    const handleLogout = async () => {
        setLogoutLoading(true);
        try {
            await authAPI.logout();
            logout();
            navigate('/');
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            // Всё равно логаутим локально даже если сервер ошибку вернул
            logout();
            navigate('/');
        } finally {
            setLogoutLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="profile-container">
                <div className="svg-background">
                    <img
                        src={ProfileGoGen}
                        alt="logo"
                        className="background-svg"
                    />
                </div>

                <div className="content-wrapper">
                    <div className="profile-section">
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                            <div className="circle-element"></div>
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
                            <h2 style={{ marginBottom: 24, color: 'var(--text-h)' }}>Профиль</h2>
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
                                        { required: true, message: 'Пожалуйста, введите имя' },
                                        { min: 2, message: 'Имя должно содержать минимум 2 символа' },
                                        { max: 50, message: 'Имя не должно превышать 50 символов' }
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
                                        { required: true, message: 'Пожалуйста, введите email' },
                                        { type: 'email', message: 'Введите корректный email адрес' }
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
                                style={{ width: '100%', marginTop: 16 }}
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