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

export const MenuContent = ({ guests }) => {
	const [open, setOpen] = React.useState(false);
	const [menuData, setMenuData] = React.useState(demoData);
	return (
		<Box sx={{ mt: 3 }}>
			<Box sx={{ overflowX: "auto" }}>
				<Stack direction="row" gap={3}>
					{menuData.map((item) => (
						<Stack
							sx={{
								width: "95%",
								maxWidth: { xs: "580px", xl: "unset" },
								// minWidth: { lg: "480px", xl: "580px" },
								border: "1px solid rgba(0, 0, 0, 0.1)",
								boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
								p: 2,
								borderRadius: "8px",
								height: { xs: "600px", md: "calc(100vh - 220px)" },
							}}
							key={item.id}
						>
							<Stack
								direction="row"
								mb={2}
								justifyContent="space-between"
								alignItems="center"
							>
								<Typography
									component="h5"
									sx={{ fontSize: "20px", fontWeight: "600" }}
								>
									{item.title}
								</Typography>
								<Typography
									component="span"
									sx={{
										fontSize: "16px",
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
								<Stack gap={2}>
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
												mb={1}
											>
												<Typography
													sx={{
														fontSize: "16px",
														fontWeight: "700",
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
													disabled={
														guests < item.minCount ||
														guests > item.maxCount
													}
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
															fontSize: "14px",
															fontWeight: "600",
														}}
														mb={1}
													>
														{subitem.subtitle}
													</Typography>
													<Typography
														variant="body1"
														sx={{
															fontSize: "14px",
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
															pl: { xs: 2, sm: 3 },
															mt: 1,
														}}
														key={index}
													>
														<Box width="0" flexGrow={1}>
															<Typography
																variant="h6"
																sx={{
																	fontSize: "15px",
																	fontWeight: "600",
																}}
															>
																{subitem.subtitle}
															</Typography>
															<Typography
																variant="body1"
																sx={{
																	fontSize: "13px",
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
							<Stack mt="auto" pt={2}>
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
										inputProps={{
											style: {
												paddingBottom: "13px",
											},
										}}
									/>
									<Stack
										direction="row"
										justifyContent="space-between"
										sx={{ fontSize: "14px", fontWeight: "600" }}
									>
										<Box>Meat, Fish</Box>
										<Box sx={{ opacity: "0.8", fontWeight: "500" }}>
											{item.minCount}-{item.maxCount} Guest
										</Box>
									</Stack>
									<Stack
										direction="row"
										justifyContent="space-between"
										sx={{ fontSize: "14px", fontWeight: "600" }}
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
											fontSize: "14px",
											fontWeight: "600",
											textTransform: "uppercase",
											height: "44px",
											width: "100%",
											mt: 2,
										}}
										disabled={
											guests < item.minCount ||
											guests > item.maxCount
										}
									>
										Select Menu at - CHF {guests * 600}
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

const demoData = [
	{
		id: 1,
		title: "Wedding",
		subtitle: "3 Courses",
		// status: false,
		minCount: 8,
		maxCount: 10,
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
		minCount: 11,
		maxCount: 20,
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
		minCount: 21,
		maxCount: 60,
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
