import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Table, Popconfirm, Tag, Space, Drawer } from 'antd';
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { tokenAPI } from '../services/apiService';
import './TokenManager.css';

interface Token {
	id: number;
	name: string;
	created_at: string;
	last_used?: string;
}

const TokenManager: React.FC = () => {
	const [form] = Form.useForm();
	const [tokens, setTokens] = useState<Token[]>([]);
	const [loading, setLoading] = useState(false);
	const [generatingToken, setGeneratingToken] = useState(false);
	const [showTokenDrawer, setShowTokenDrawer] = useState(false);
	const [newToken, setNewToken] = useState<string | null>(null);

	useEffect(() => {
		loadTokens();
	}, []);

	const loadTokens = async () => {
		setLoading(true);
		try {
			const response = await tokenAPI.getTokens();
			setTokens(response.data.tokens || []);
		} catch (error: any) {
			message.error('Ошибка при загрузке токенов');
		} finally {
			setLoading(false);
		}
	};

	const handleGenerateToken = async (values: { name: string }) => {
		setGeneratingToken(true);
		try {
			const response = await tokenAPI.generateToken(values.name);
			const token = response.data.data.token;
			setNewToken(token);
			setShowTokenDrawer(true);
			message.success('Токен создан успешно!');
			form.resetFields();
			await loadTokens();
		} catch (error: any) {
			const errorMessage = error.response?.data?.error || 'Ошибка при создании токена';
			message.error(errorMessage);
		} finally {
			setGeneratingToken(false);
		}
	};

	const handleRevokeToken = async (id: number) => {
		try {
			await tokenAPI.revokeToken(id);
			message.success('Токен отозван');
			await loadTokens();
		} catch (error: any) {
			message.error('Ошибка при отзыве токена');
		}
	};

	const handleCopyToken = () => {
		if (newToken) {
			navigator.clipboard.writeText(newToken);
			message.success('Токен скопирован в буфер обмена');
		}
	};

	const columns = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => <span style={{ color: 'var(--text-h)', fontWeight: 500 }}>{text}</span>,
		},
		{
			title: 'Создан',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text: string) => new Date(text).toLocaleDateString('ru-RU'),
			width: 120,
		},
		{
			title: 'Последнее использование',
			dataIndex: 'last_used',
			key: 'last_used',
			render: (text: string) => text ? new Date(text).toLocaleDateString('ru-RU') : <Tag color="default">Не использован</Tag>,
		},
		{
			title: 'Действия',
			key: 'actions',
			width: 100,
			render: (_: any, record: Token) => (
				<Popconfirm
					title="Отозвать токен?"
					description="Это действие необратимо. Токен больше не сможет быть использован."
					onConfirm={() => handleRevokeToken(record.id)}
					okText="Отозвать"
					cancelText="Отмена"
				>
					<Button
						type="text"
						danger
						size="small"
						icon={<DeleteOutlined />}
					/>
				</Popconfirm>
			),
		},
	];

	return (
		<div className="token-manager">
			<Card className="token-card">
				<h2 className="token-title">API Токены</h2>
				<p className="token-description">
					Создавайте и управляйте API токенами для доступа к API. Максимум 10 активных токенов.
				</p>

				<div className="token-form-section">
					<h3>Создать новый токен</h3>
					<Form
						form={form}
						layout="vertical"
						onFinish={handleGenerateToken}
						className="token-form"
					>
						<Form.Item
							label="Имя токена"
							name="name"
							rules={[
								{ required: true, message: 'Введите имя токена' },
								{ min: 1, message: 'Минимум 1 символ' },
								{ max: 255, message: 'Максимум 255 символов' },
							]}
						>
							<Input
								placeholder="e.g., My Console App"
								size="large"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={generatingToken}
								className="generate-token-btn"
							>
								Сгенерировать токен
							</Button>
						</Form.Item>
					</Form>
				</div>

				<div className="token-list-section">
					<h3>Мои токены</h3>
					<Table
						columns={columns}
						dataSource={tokens}
						rowKey="id"
						loading={loading}
						pagination={false}
						locale={{
							emptyText: 'Нет созданных токенов',
						}}
						size="small"
					/>
				</div>
			</Card>

			<Drawer
				title="Новый API Токен"
				onClose={() => setShowTokenDrawer(false)}
				open={showTokenDrawer}
				width={600}
			>
				<div className="token-display">
					<p className="token-warning">
						⚠️ <strong>Важно!</strong> Сохраните этот токен в безопасном месте. Вы не сможете его увидеть снова!
					</p>

					<div className="token-box">
						<code className="token-value">{newToken}</code>
						<Button
							type="primary"
							size="small"
							icon={<CopyOutlined />}
							onClick={handleCopyToken}
							className="copy-btn"
						>
							Копировать
						</Button>
					</div>

					<Space direction="vertical" style={{ width: '100%' }}>
						<p><strong>Начало:</strong> {newToken?.substring(0, 4)}</p>
						<p><strong>Длина:</strong> {newToken?.length} символов</p>
						<p>Используйте этот токен в заголовке: <code>X-API-Token: {newToken}</code></p>
					</Space>
				</div>
			</Drawer>
		</div>
	);
};

export default TokenManager;
