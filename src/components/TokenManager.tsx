import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Drawer,
	Form,
	Input,
	message,
	Popconfirm,
	Space,
	Table,
	Tag,
} from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import { tokenAPI } from "../services/apiService";
import "./TokenManager.css";

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

	const loadTokens = async () => {
		setLoading(true);
		try {
			const response = await tokenAPI.getTokens();
			setTokens(response.data.tokens || []);
		} catch (error: any) {
			message.error("Ошибка при загрузке токенов");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadTokens();
	}, []);
	const handleGenerateToken = async (values: { name: string }) => {
		setGeneratingToken(true);
		try {
			const response = await tokenAPI.generateToken(values.name);
			const token = response.data.data.token;
			setNewToken(token);
			setShowTokenDrawer(true);
			message.success("Токен создан успешно!");
			form.resetFields();
			await loadTokens();
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error || "Ошибка при создании токена";
			message.error(errorMessage);
		} finally {
			setGeneratingToken(false);
		}
	};

	const handleRevokeToken = async (id: number) => {
		try {
			await tokenAPI.revokeToken(id);
			message.success("Токен отозван");
			await loadTokens();
		} catch (error: any) {
			message.error("Ошибка при отзыве токена");
		}
	};

	const handleCopyToken = () => {
		if (newToken) {
			navigator.clipboard.writeText(newToken);
			message.success("Токен скопирован в буфер обмена");
		}
	};

	const styles = {
		tokenCard: {
			backgroundColor: "#ffffff",
			borderRadius: 24,
			boxShadow: "0 20px 35px -10px rgba(0,0,0,0.1)",
			border: "none",
		},
		title: {
			fontSize: 24,
			fontWeight: 600,
			marginBottom: 8,
			color: "#1a2c3e",
		},
		description: {
			fontSize: 14,
			color: "#5a6874",
			marginBottom: 24,
			borderBottom: "1px solid #e8eef2",
			paddingBottom: 16,
		},
		sectionTitle: {
			fontSize: 18,
			fontWeight: 500,
			marginBottom: 16,
			color: "#1a2c3e",
		},
		generateBtn: {
			backgroundColor: "rgb(0, 179, 196)",
			borderColor: "rgb(0, 179, 196)",
			height: 44,
			fontSize: 16,
			fontWeight: 500,
		},
		tokenBox: {
			display: "flex",
			alignItems: "center",
			gap: 12,
			backgroundColor: "#f5f7fa",
			padding: "12px 16px",
			borderRadius: 12,
			marginTop: 16,
			marginBottom: 24,
			flexWrap: "wrap" as const,
		},
		tokenValue: {
			flex: 1,
			fontFamily: "monospace",
			fontSize: 14,
			wordBreak: "break-all" as const,
			color: "#1a2c3e",
		},
		warning: {
			backgroundColor: "#fff7e6",
			border: "1px solid #ffd591",
			borderRadius: 12,
			padding: "12px 16px",
			marginBottom: 16,
			color: "#d46b00",
		},
	};

	const columns = [
		{
			title: "Имя",
			dataIndex: "name",
			key: "name",
			render: (text: string) => (
				<span style={{ color: "#1a2c3e", fontWeight: 500 }}>{text}</span>
			),
		},
		{
			title: "Создан",
			dataIndex: "created_at",
			key: "created_at",
			render: (text: string) => new Date(text).toLocaleDateString("ru-RU"),
			width: 120,
		},
		{
			title: "Последнее использование",
			dataIndex: "last_used",
			key: "last_used",
			render: (text: string) =>
				text ? (
					new Date(text).toLocaleDateString("ru-RU")
				) : (
					<Tag color="default">Не использован</Tag>
				),
		},
		{
			title: "Действия",
			key: "actions",
			width: 100,
			render: (_: any, record: Token) => (
				<Popconfirm
					title="Отозвать токен?"
					description="Это действие необратимо. Токен больше не сможет быть использован."
					onConfirm={() => handleRevokeToken(record.id)}
					okText="Отозвать"
					cancelText="Отмена"
				>
					<Button type="text" danger size="small" icon={<DeleteOutlined />} />
				</Popconfirm>
			),
		},
	];

	return (
		<div className="token-manager">
			<Card style={styles.tokenCard}>
				<h2 style={styles.title}>API Токены</h2>
				<p style={styles.description}>
					Создавайте и управляйте API токенами для доступа к API. Максимум 10
					активных токенов.
				</p>

				<div className="token-form-section" style={{ marginBottom: 32 }}>
					<h3 style={styles.sectionTitle}>Создать новый токен</h3>
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
								{ required: true, message: "Введите имя токена" },
								{ min: 1, message: "Минимум 1 символ" },
								{ max: 255, message: "Максимум 255 символов" },
							]}
						>
							<Input placeholder="e.g., My Console App" size="large" />
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={generatingToken}
								style={styles.generateBtn}
							>
								Сгенерировать токен
							</Button>
						</Form.Item>
					</Form>
				</div>

				<div className="token-list-section">
					<h3 style={styles.sectionTitle}>Мои токены</h3>
					<Table
						columns={columns}
						dataSource={tokens}
						rowKey="id"
						loading={loading}
						pagination={false}
						locale={{
							emptyText: "Нет созданных токенов",
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
					<div style={styles.warning}>
						⚠️ <strong>Важно!</strong> Сохраните этот токен в безопасном месте.
						Вы не сможете его увидеть снова!
					</div>

					<div style={styles.tokenBox}>
						<code style={styles.tokenValue}>{newToken}</code>
						<Button
							type="primary"
							size="small"
							icon={<CopyOutlined />}
							onClick={handleCopyToken}
							style={{
								backgroundColor: "rgb(0, 179, 196)",
								borderColor: "rgb(0, 179, 196)",
							}}
						>
							Копировать
						</Button>
					</div>

					<Space direction="vertical" style={{ width: "100%" }}>
						<p>
							<strong>Начало:</strong> {newToken?.substring(0, 4)}
						</p>
						<p>
							<strong>Длина:</strong> {newToken?.length} символов
						</p>
						<p>
							Используйте этот токен в заголовке:{" "}
							<code>X-API-Token: {newToken}</code>
						</p>
					</Space>
				</div>
			</Drawer>
		</div>
	);
};

export default TokenManager;
