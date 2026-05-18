import { Flex, Typography } from "antd";
import type React from "react";
import StepsBackground from "../assets/StepsBackground.png";

interface StepItem {
	id: number;
	step: string;
	action: string;
}

interface StepsPlanProps {
	steps: StepItem[];
}

const StepsPlan: React.FC<StepsPlanProps> = ({ steps }) => {
	return (
		<Flex
			vertical
			gap={12}
			style={{ padding: "0px 20px", position: "relative" }}
		>
			{steps.map((item) => (
				<Flex
					key={item.id}
					justify="space-between"
					align="center"
					style={{
						backgroundColor: "#ffffff",
						borderRadius: 25,
						padding: "20px 42px",
						width: 500,
					}}
				>
					<Typography.Title level={3} style={{ margin: 0, lineHeight: 1.2 }}>
						{item.step}
					</Typography.Title>
					<Typography.Title level={5} style={{ margin: 0, lineHeight: 1.2 }}>
						{item.action}
					</Typography.Title>
				</Flex>
			))}
			<img
				src={StepsBackground}
				alt="illustration"
				style={{
					position: "absolute",
					right: -182,
					top: "50%",

					transform: "translateY(-50%)",
					maxWidth: "70%",
					maxHeight: "350px",

					pointerEvents: "none",
				}}
			/>
		</Flex>
	);
};

export default StepsPlan;
