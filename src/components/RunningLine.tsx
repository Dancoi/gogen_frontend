import { Divider, Typography } from "antd";

interface RunningLineProps {
	text: string;
	speed?: number;
	color?: string;
	fontSize?: string;
}

const RunningLine: React.FC<RunningLineProps> = ({
	text,
	speed = 120,
	color = "#00B3C4",
	fontSize = "24px",
}) => {
	return (
		<>
			<style>{`
        @keyframes marqueeLeftToRight {
          0% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .full-width-marquee {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          overflow-x: clip;
        }
      `}</style>
			<div className="full-width-marquee">
				<Divider
					style={{ borderColor: color, borderWidth: "3px", margin: 0 }}
				/>
				<div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
					<div
						style={{
							display: "inline-block",
							animation: `marqueeLeftToRight ${speed}s linear infinite`,
							willChange: "transform",
							backfaceVisibility: "hidden",
						}}
					>
						<Typography.Text style={{ color, fontSize }}>
							{text.repeat(100)}
						</Typography.Text>
					</div>
				</div>
				<Divider
					style={{ borderColor: color, borderWidth: "3px", margin: 0 }}
				/>
			</div>
		</>
	);
};

export default RunningLine;
