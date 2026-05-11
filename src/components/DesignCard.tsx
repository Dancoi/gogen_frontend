import { Typography } from "antd";
import type React from "react";

const { Text } = Typography;

interface DesignCardProps {
	background: string;
	text: string;
	fontSize?: string | number;
	textColor?: string;
}

const DesignCard: React.FC<DesignCardProps> = ({
	background,
	text,
	fontSize = "24px",
	textColor = "#ffffff",
}) => {
	const isImageUrl =
		background.startsWith("http") ||
		background.startsWith("https") ||
		background.startsWith("/") ||
		background.startsWith("url(");

	const bgStyle: React.CSSProperties = isImageUrl
		? {
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}
		: { backgroundColor: background };

	return (
		<div
			style={{
				width: "250px",
				height: "190px",
				borderRadius: "75px",
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				...bgStyle,
			}}
		>
			<Text
				style={{
					overflowWrap: "break-word",
					wordWrap: "break-word",
					whiteSpace: "normal",
					maxWidth: "100%",
					fontSize: fontSize,
					color: textColor,
					padding: "16px",
				}}
			>
				{text}
			</Text>
		</div>
	);
};

export default DesignCard;
