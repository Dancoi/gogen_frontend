import { Typography } from "antd";
import type React from "react";

const { Text } = Typography;

export interface VersionData {
	version: string;
	changes: string[];
}

interface VersionHistoryProps {
	versions: VersionData[];
	maxHeight?: number;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({
	versions,
	maxHeight = 400,
}) => {
	return (
		<>
			<style>
				{`
          .custom-scroll {
            scrollbar-width: thin;
            scrollbar-color: #888 transparent;
          }
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
            background: transparent;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 10px;
          }
          .custom-scroll::-webkit-scrollbar-thumb:hover {
            background-color: #555;
          }
        `}
			</style>
			<div
				className="custom-scroll"
				style={{
					border: "1px solid black",
					borderRadius: 25,
					padding: "24px 20px",
					background: "transparent",
					maxHeight,
					overflowY: "auto",
				}}
			>
				{versions.map((item) => (
					<div
						key={item.version}
						style={{
							borderLeft: "2px solid black",
							paddingLeft: 24,
							paddingBottom:
								versions.indexOf(item) === versions.length - 1 ? 0 : 32,
						}}
					>
						<div
							style={{
								position: "relative",
								left: -32,
								top: 8,
								width: 14,
								height: 14,
								backgroundColor: "#00B3C4",
								borderRadius: "50%",
								marginBottom: -14,
								filter: "blur(2px)",
							}}
						/>
						<div
							style={{
								marginBottom: 8,
								display: "flex",
								alignItems: "center",
								gap: 10,
							}}
						>
							<Text strong style={{ fontSize: 16 }}>
								{item.version}
							</Text>
							{versions.indexOf(item) === 0 && (
								<span
									style={{
										backgroundColor: "#00B3C4",
										borderRadius: 25,
										padding: "5px 10px",
										fontSize: 12,
										color: "black",
										lineHeight: 1,
									}}
								>
									Актуальная
								</span>
							)}
						</div>
						<ul style={{ margin: 0, paddingLeft: 20 }}>
							{item.changes.map((change, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey:
								<li key={i} style={{ marginBottom: 6 }}>
									<Text>{change}</Text>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</>
	);
};

export default VersionHistory;
