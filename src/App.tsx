import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Typography } from "antd";
import ArrowR from "./assets/ArrowR.png";
import ArrowRT from "./assets/ArrowRT.png";
import arrowRightUp from "./assets/arrowRightUp.svg";
import CardBackground from "./assets/CardBackground.png";
import DesignCardBackground from "./assets/DesignCardBackground.png";
import MainGoGen from "./assets/MainGoGenSVG.svg";
import CardComponent from "./components/CardComponent.tsx";
import DesignCard from "./components/DesignCard.tsx";
import MainLayout from "./components/MainLayout.tsx";
import RunningLine from "./components/RunningLine.tsx";
import StepsPlan from "./components/StepsPlan.tsx";
import VersionHistory from "./components/VersionHistory.tsx";
import versionsDataFromJson from "./versions.json";

function App() {
	const marqueeText = "ТЕХНОЛОГИИ.  БУДУЩЕЕ.  АЙТИ.  ";
	const stepsData = [
		{ id: 1, step: "Шаг 1", action: "Оплати" },
		{ id: 2, step: "Шаг 2", action: "Авторизуйся" },
		{ id: 3, step: "Шаг 3", action: "Вставь ссылку" },
		{ id: 4, step: "Шаг 4", action: "Получи результат" },
	];
	const versionsData = versionsDataFromJson;
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
					<Flex vertical gap={35} id="about-section">
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
					<Flex vertical gap={35} id="services-section">
						<Typography.Text style={{ fontSize: 30 }}>
							Наши услуги
						</Typography.Text>
						<Space size="large" wrap style={{ padding: "0px 20px" }}>
							<CardComponent
								topButtonText={
									<img
										src={ArrowR}
										alt="arrow"
										style={{ width: 40, height: 40 }}
									/>
								}
								size="wide"
								background="#030612"
								line1="PRO"
								line2="Элитная подписка"
								line3="Какое то небольшое обьяснение небольшое обьяснение небольшое обьяснение небольшое"
								bottomButtonText="Купить PRO Версию"
								topLeftContent={<div>фича</div>}
							/>
							<CardComponent
								size="narrow"
								background="#00B3C4"
								line1="Стандарт"
								line2="Стандартные настройки для пользователя бла бла бла"
								onTopClick={() => alert("Меню")}
								bottomButtonText="Купить"
								topButtonText={
									<img
										src={ArrowRT}
										alt="arrow"
										style={{ width: 40, height: 40 }}
									/>
								}
							/>
							<div id="once-subscription">
								<CardComponent
									size="narrow"
									background={CardBackground}
									line1="Один раз"
									line2="Одноразовое пользование для\nбла бла бла бла бла блаб"
									onTopClick={() => alert("Меню")}
									topButtonText={
										<img
											src={ArrowRT}
											alt="arrow"
											style={{ width: 40, height: 40 }}
										/>
									}
									bottomButtonText="Купить"
								/>
							</div>
							<CardComponent
								size="narrow"
								background="#00B3C4"
								line1="Просмотр"
								line2="Посмотреть демонстрацию как пользоваться и работает"
								onTopClick={() => alert("Меню")}
								topButtonText={
									<img
										src={ArrowRT}
										alt="arrow"
										style={{ width: 40, height: 40 }}
									/>
								}
								bottomButtonText="Просмотр"
							/>
						</Space>
					</Flex>
					<Flex vertical gap={35} id="plan-section">
						<Typography.Text style={{ fontSize: 30 }}>План</Typography.Text>
						<StepsPlan steps={stepsData} />
					</Flex>
					<Flex vertical>
						<Flex
							vertical
							justify="center"
							align="center"
							style={{
								maxWidth: "400px",
								margin: "0 auto",
							}}
						>
							<Typography.Title
								level={3}
								style={{
									overflowWrap: "break-word",
									wordWrap: "break-word",
									whiteSpace: "normal",
									maxWidth: "100%",
									textAlign: "center",
								}}
							>
								Получить результат возможно прямо сейчас
							</Typography.Title>
						</Flex>
						<Flex
							vertical
							justify="center"
							align="center"
							style={{
								maxWidth: "700px",
								margin: "0 auto",
							}}
							gap={35}
						>
							<Typography.Text
								style={{
									fontSize: "20px",
									overflowWrap: "break-word",
									wordWrap: "break-word",
									whiteSpace: "normal",
									maxWidth: "100%",
									textAlign: "center",
								}}
							>
								У нас существует одноразовая версия подписки, вы можете
								протестировать на своем проекте и принять решение о покупке
								полноценной подписки{" "}
							</Typography.Text>

							<Button
								style={{
									width: 390,
									padding: "24px 14px",
									background: "transparent",
									borderColor: "black",
									borderWidth: "1px",
									borderRadius: 25,
									display: "inline-flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 8,
								}}
								onClick={() => {
									document.getElementById("once-subscription")?.scrollIntoView({
										behavior: "smooth",
										block: "start",
									});
								}}
							>
								<Typography.Text style={{ fontSize: "20px" }}>
									Перейти к подписке “Один Раз”
								</Typography.Text>
								<ArrowRightOutlined style={{ fontSize: "20px" }} />
							</Button>
						</Flex>
					</Flex>
					<Space size="large" wrap style={{ padding: "0px 20px" }}>
						<DesignCard
							background="#00B3C4"
							text="ОДНА"
							fontSize="60px"
							textColor="#030612"
						/>
						<DesignCard
							background={DesignCardBackground}
							text="ССЫЛКА"
							fontSize="34px"
							textColor="#030612"
						/>
						<DesignCard
							background="#030612"
							text="ЗАМЕНЯЕТ"
							fontSize="34px"
							textColor="#00B3C4"
						/>
						<DesignCard
							background="#00B3C4"
							text="DEVOPS ИНЖЕНЕРА"
							fontSize="28px"
							textColor="#030612"
						/>
					</Space>
					<Flex vertical gap={35} id="version-history-section">
						<Typography.Text style={{ fontSize: 30 }}>
							История версий
						</Typography.Text>
						<VersionHistory versions={versionsData} maxHeight={400} />
					</Flex>
				</Flex>
			</MainLayout>
		</>
	);
}

export default App;
