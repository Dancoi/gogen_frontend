import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";
import type React from "react";

interface CardComponentProps {
	size: "wide" | "narrow" | "cover-square";
	background: string;
	line1: string;
	line2?: string;
	line3?: string;
	bottomButtonText?: string;
	onBottomClick?: () => void;
	topButtonText?: React.ReactNode;
	onTopClick?: () => void;
	topLeftContent?: React.ReactNode;
}

export const CardComponent: React.FC<CardComponentProps> = ({
																size,
																background,
																line1,
																line2,
																line3,
																bottomButtonText = "Подробнее",
																onBottomClick,
																topButtonText = "⋯",
																onTopClick,
																topLeftContent,
															}) => {
	const isWide = size === "wide";
	const isCoverSquare = size === "cover-square";

	const getBackgroundStyle = (): React.CSSProperties => {
		const isImageUrl =
			background.startsWith("http") ||
			background.startsWith("https") ||
			background.startsWith("/") ||
			background.startsWith("url(");

		if (isImageUrl) {
			return {
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			};
		}
		return { backgroundColor: background };
	};

	const textColor = isWide ? "#ffffff" : "#000000";
	const bottomButtonBg = isWide ? "#ffffff" : "#000000";
	const bottomButtonTextColor = isWide ? "#000000" : "#ffffff";

	const topButtonStyle: React.CSSProperties = {
		padding: 0,
		width: "40px",
		height: "40px",
		minWidth: "40px",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		background: "transparent",
		border: "none",
		boxShadow: "none",
	};

	const topRowStyle: React.CSSProperties = {
		display: "flex",
		justifyContent: isWide ? "space-between" : "flex-end",
		alignItems: "center",
		marginBottom: "16px",
	};

	const lineStyle: React.CSSProperties = {
		marginBottom: isCoverSquare ? 0 : "8px",
		textAlign: "left",
		lineHeight: "1.5",
		color: textColor,
		fontWeight: "400",
		wordBreak: "break-word",
	};

	const lastLineStyle: React.CSSProperties = {
		...lineStyle,
		marginBottom: 0,
	};

	const bottomButtonStyle: React.CSSProperties = {
		width: "100%",
		marginTop: "auto",
		backgroundColor: bottomButtonBg,
		color: bottomButtonTextColor,
		border: "none",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center"
	};

	if (isCoverSquare) {
		return (
			<Card
				style={{
					width: 300,
					height: 200,
					borderRadius: "12px",
					overflow: "hidden",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					transition: "transform 0.2s, box-shadow 0.2s",
					border: "none"
				}}
				styles={{
					body: {
						height: "calc(100% - 100px)",
						padding: "16px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between"
					}
				}}
				cover={
					<img
						src={background}
						alt={line1}
						style={{
							width: "100%",
							height: "100px",
							objectFit: "cover"
						}}
					/>
				}
			>
				<Typography.Title level={4} style={lastLineStyle}>
					{line1}
				</Typography.Title>

				<Button style={bottomButtonStyle} onClick={onBottomClick}>
					{bottomButtonText}
					<ArrowRightOutlined style={{ fontSize: "20px" }} />
				</Button>
			</Card>
		);
	}

	const cardStyle: React.CSSProperties = {
		width: isWide ? "320px" : "240px",
		height: "400px",
		borderRadius: "12px",
		overflow: "hidden",
		padding: "16px",
		boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
		transition: "transform 0.2s, box-shadow 0.2s",
		...getBackgroundStyle(),
	};

	return (
		<Flex vertical style={cardStyle} justify="space-between">
			<div style={topRowStyle}>
				{isWide && topLeftContent && <div>{topLeftContent}</div>}
				<Button type="text" style={topButtonStyle} onClick={onTopClick}>
					{topButtonText}
				</Button>
			</div>

			<Flex vertical>
				<Typography.Title level={4} style={lastLineStyle}>
					{line1}
				</Typography.Title>
				{line2 && <Typography.Text style={lineStyle}>{line2}</Typography.Text>}
				{isWide && line3 && (
					<Typography.Text style={lineStyle}>{line3}</Typography.Text>
				)}
				{isWide && !line3 && <div style={lineStyle} />}

				<Button style={bottomButtonStyle} onClick={onBottomClick}>
					{bottomButtonText}
					<ArrowRightOutlined style={{ fontSize: "20px" }} />
				</Button>
			</Flex>
		</Flex>
	);
};

export default CardComponent;