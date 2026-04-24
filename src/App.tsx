import { Button, Flex, Typography } from "antd";
import arrowRightUp from "./assets/arrowRightUp.svg";
import MainGoGen from "./assets/MainGoGenSVG.svg";
import MainLayout from "./components/MainLayout.tsx";
import RunningLine from "./components/RunningLine.tsx";

function App() {
	const marqueeText = "ТЕХНОЛОГИИ.  БУДУЩЕЕ.  АЙТИ.  ";

	return (
		<>
			<style>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
			<MainLayout>
				<Flex vertical gap={72}>
					<Flex vertical>
						<div style={{ position: "relative", width: "100%" }}>
							<img
								src={MainGoGen}
								alt="logo"
								style={{ width: "100%", display: "block" }}
							/>

							<div
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: "20px",
									padding: "20px",
									boxSizing: "border-box",
									color: "white",
								}}
							>
								<Flex vertical justify={"center"}>
									<Typography.Title
										level={5}
										style={{ color: "white", margin: 0 }}
									>
										Инструмент
									</Typography.Title>
									<Typography.Title
										style={{ fontSize: "100px", color: "white", margin: 0 }}
									>
										GOGEN
									</Typography.Title>
									<Typography.Title
										style={{ fontSize: "30px", color: "white", margin: 0 }}
									>
										Автогенерация CI/CD пайплайнов
									</Typography.Title>
								</Flex>

								<Flex
									vertical
									justify={"flex-end"}
									gap={10}
									style={{ marginBottom: "100px", alignItems: "flex-end" }}
								>
									<Typography.Text
										style={{ color: "white", maxWidth: "390px" }}
									>
										Никакой ручной настройки, YAML-магии или найма отдельного
										инженера — просто залейте код и получите production-пайплайн
										за минуты
									</Typography.Text>
									<Button
										type="primary"
										size="large"
										style={{
											borderRadius: "25px",
											backgroundColor: "#00B3C4",
											minWidth: "400px",
											padding: "30px 10px",
											border: "none",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Flex
											style={{
												width: "100%",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<Typography.Text
												style={{ color: "white", fontSize: "28px" }}
											>
												Посмотреть подписки
											</Typography.Text>
											<img
												src={arrowRightUp}
												style={{ width: 30, height: 30 }}
												alt="arrow"
											/>
										</Flex>
									</Button>
								</Flex>
							</div>
						</div>

						<RunningLine text={marqueeText} />
					</Flex>
					<Flex vertical gap={35}>
						<Typography.Text style={{ fontSize: 30 }}>О нас</Typography.Text>

						<Flex
							gap={30}
							vertical
							style={{
								padding: "30px 80px",
								border: "2px solid black",
								borderRadius: "25px",
							}}
						>
							<Flex justify={"space-between"}>
								<div>
									<Typography.Text
										style={{
											fontStyle: "italic",
											fontSize: "70px",
											lineHeight: "45px",
										}}
									>
										GoGen -
									</Typography.Text>
									<div>
										<Typography.Text
											style={{ color: "#00B3C4", fontSize: "30px" }}
										>
											замените
										</Typography.Text>
										<Typography.Text style={{ fontSize: "30px" }}>
											{" "}
											DevOps
										</Typography.Text>
									</div>

									<Typography.Text style={{ fontSize: "30px" }}>
										инженера одной ссылкой
									</Typography.Text>
								</div>
								<Typography.Text
									style={{
										fontSize: "17px",
										maxWidth: "400px",
										textAlign: "right",
										display: "block",
									}}
								>
									Инструмент анализирует ваш код и за минуты собирает готовый
									CI/CD пайплайн. Без yaml-магии, ночных деплоев и зарплаты
									сеньора.
								</Typography.Text>
							</Flex>
							<Flex
								vertical
								style={{
									backgroundColor: "#00B3C4",
									color: "black",
									padding: "10px 25px",
									borderRadius: "25px",
								}}
							>
								<Typography.Text style={{ fontSize: "17px" }} strong>
									Наша миссия
								</Typography.Text>
								<Typography.Text style={{ fontSize: "17px" }}>
									Сохранить ваше время и средства, гарантируя качество конечного
									результата
								</Typography.Text>
							</Flex>
						</Flex>
					</Flex>
					<Flex vertical gap={35}>
						<Typography.Text style={{ fontSize: 30 }}>
							Наши услуги
						</Typography.Text>
					</Flex>
				</Flex>
			</MainLayout>
		</>
	);
}

export default App;
