import React, { useState } from 'react';
import {Input, Button, Form} from 'antd';
import MainLayout from "../../components/MainLayout.tsx";
import "./UserProfile.css";
import ProfileGoGen from "../../assets/ProfileGoGen.svg";
import CardBackground from "../../assets/MainGoGen.svg";
import CardComponent from "../../components/CardComponent.tsx";

interface FormData {
    name: string;
    email: string;
    github: string;
}

const UserProfile: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        name: 'GOGEN',
        email: 'gogen2026example.com',
        github: 'gogen'
    });

    const handleFinish = (values: FormData) => {
        setLoading(true);
        console.log('Сохраненные данные:', values);

        setTimeout(() => {
            setFormData(values);
            alert('Изменения сохранены!');
            setLoading(false);
        }, 500);
    };

    const handleFinishFailed = (errorInfo: unknown) => {
        console.log('Ошибка валидации:', errorInfo);
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
                            <Form
                                form={form}
                                name="profile-form"
                                layout="vertical"
                                initialValues={formData}
                                onFinish={handleFinish}
                                onFinishFailed={handleFinishFailed}
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
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default UserProfile;