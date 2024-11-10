import { menuicons } from "@/components/menuicons";
import {
	Box,
	Button,
	Stack,
	TextField,
	Typography,
	alpha,
} from "@mui/material";
import React from "react";
import DishEditModal from "./DishEditModal";

export const MenuContent = ({ disabledBtn }) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Box sx={{ mt: 3 }}>
			<Box sx={{ overflowX: "auto" }}>
				<Stack direction="row" gap={3}>
					{menuData.map((item) => (
						<Stack
							sx={{
								width: "95%",
								maxWidth: { xs: "580px", xl: "unset" },
								minWidth: { lg: "480px", xl: "580px" },
								border: "1px solid rgba(0, 0, 0, 0.1)",
								boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
								p: 3,
								borderRadius: "8px",
								maxHeight: "calc(90vh)",
							}}
							key={item.id}
						>
							<Stack
								direction="row"
								mb={3}
								justifyContent="space-between"
								alignItems="center"
							>
								<Typography
									component="h5"
									sx={{ fontSize: "24px", fontWeight: "600" }}
								>
									{item.title}
								</Typography>
								<Typography
									component="span"
									sx={{
										fontSize: "20px",
										fontWeight: "600",
										color: alpha("#000000", 0.6),
									}}
								>
									{item.subtitle}
								</Typography>
							</Stack>
							{/* <Box sx={{ maxHeight: "790px", overflowY: "auto" }}> */}
							<Box
								sx={{ height: "0", flexGrow: "1", overflowY: "auto" }}
							>
								<Stack gap={3}>
									{item?.submenus?.map((subitem, index) => (
										<Stack
											key={index}
											sx={{
												border: "1px solid rgba(0, 0, 0, 0.1)",
												borderRadius: "8px",
												p: 2,
											}}
										>
											<Stack
												direction="row"
												justifyContent="space-between"
												alignItems="center"
												mb={2}
											>
												<Typography
													sx={{
														fontSize: "20px",
														fontWeight: "600",
													}}
													variant="h5"
												>
													{subitem.title}
												</Typography>
												<Button
													type="button"
													sx={{
														border: "none",
														outline: "none",
														boxShadow: "none",
														background: "transparent",
														p: 0,
														minWidth: "0",
														"&[disabled]": {
															cursor: "not-allowed",
															color: alpha("#000000", 0.5),
														},
													}}
													// disabled={!item.status}
													disabled={disabledBtn}
													onClick={() => setOpen(true)}
												>
													{menuicons.penIcon}
												</Button>
											</Stack>
											<Stack direction="row" alignItems="center">
												<Box width="0" flexGrow={1}>
													<Typography
														variant="h6"
														sx={{
															fontSize: "16px",
															fontWeight: "600",
														}}
														mb={1}
													>
														{subitem.subtitle}
													</Typography>
													<Typography
														variant="body1"
														sx={{
															fontSize: "16px",
															fontWeight: "500",
															color: alpha("#000000", 0.8),
														}}
													>
														{subitem.text}
													</Typography>
												</Box>
												<Box
													ml={3}
													pl={3}
													sx={{
														borderLeft: "1px solid #00000010",
														minHeight: "45px",
														display: "flex",
														alignItems: "center",
														gap: "6px",
													}}
												>
													{subitem?.icon}
													{subitem?.selectedMenu}
												</Box>
											</Stack>
											{subitem?.subdata?.length > 0 &&
												subitem?.subdata?.map((subdata, index) => (
													<Stack
														direction="row"
														sx={{
															pl: { xs: 2, sm: 3, md: 4 },
															mt: 2,
														}}
														key={index}
													>
														<Box width="0" flexGrow={1}>
															<Typography
																variant="h6"
																sx={{
																	fontSize: "16px",
																	fontWeight: "600",
																}}
															>
																{subitem.subtitle}
															</Typography>
															<Typography
																variant="body1"
																sx={{
																	fontSize: "16px",
																	fontWeight: "500",
																	color: alpha("#000000", 0.8),
																}}
															>
																{subitem.text}
															</Typography>
														</Box>
													</Stack>
												))}
										</Stack>
									))}
								</Stack>
							</Box>
							<Stack mt="auto" pt={4}>
								<hr style={{ background: "#cccccc", opacity: 1 }} />
								<Box pt={3}>
									<TextField
										variant="outlined"
										placeholder="Add Remarks Here"
										label="Add Remarks"
										sx={{
											width: "100%",
											flexGrow: 1,
											mb: 2,
										}}
									/>
									<Stack
										direction="row"
										justifyContent="space-between"
										sx={{ fontSize: "20px", fontWeight: "600" }}
									>
										<Box>Meat, Fish</Box>
										<Box sx={{ opacity: "0.8", fontWeight: "500" }}>
											8-12 Guest
										</Box>
									</Stack>
									<Stack
										direction="row"
										justifyContent="space-between"
										sx={{ fontSize: "20px", fontWeight: "600" }}
									>
										<Box>Price per guest:</Box>
										<Box sx={{ opacity: "0.8", fontWeight: "500" }}>
											CHF 600
										</Box>
									</Stack>
									<Button
										type="button"
										variant="contained"
										color="primary"
										sx={{
											fontSize: "15px",
											fontWeight: "700",
											textTransform: "uppercase",
											height: "50px",
											width: "100%",
											mt: 2,
										}}
										disabled={disabledBtn}
									>
										Select Menu at - CHF 6’000
									</Button>
								</Box>
							</Stack>
						</Stack>
					))}
				</Stack>
			</Box>
			<DishEditModal open={open} setOpen={setOpen} />
		</Box>
	);
};

const menuData = [
	{
		id: 1,
		title: "Wedding",
		subtitle: "3 Courses",
		// status: false,
		submenus: [
			{
				title: "1 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Fish",
				icon: menuicons.fish,
			},
			{
				title: "2 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Meat",
				icon: menuicons.meat,
				subdata: [
					{
						subtitle: "Caprese Saled",
						text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
					},
				],
			},
			{
				title: "3 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Vegetarian",
				icon: menuicons.vegetarian,
			},
		],
	},
	{
		id: 2,
		title: "Birthday",
		subtitle: "7 Courses",
		// status: false,
		submenus: [
			{
				title: "1 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Fish",
				icon: menuicons.fish,
			},
			{
				title: "2 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Meat",
				icon: menuicons.meat,
				subdata: [
					{
						subtitle: "Caprese Saled",
						text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
					},
				],
			},
			{
				title: "3 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Vegetarian",
				icon: menuicons.vegetarian,
			},
			{
				title: "1 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Fish",
				icon: menuicons.fish,
			},
			{
				title: "2 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Meat",
				icon: menuicons.meat,
				subdata: [
					{
						subtitle: "Caprese Saled",
						text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
					},
				],
			},
			{
				title: "3 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Vegetarian",
				icon: menuicons.vegetarian,
			},
		],
	},
	{
		id: 3,
		title: "School Party",
		subtitle: "2 Courses",
		// status: false,
		submenus: [
			{
				title: "1 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Fish",
				icon: menuicons.fish,
			},
			{
				title: "2 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "Meat",
				icon: menuicons.meat,
				subdata: [
					{
						subtitle: "Caprese Saled",
						text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
					},
				],
			},
		],
	},
];
