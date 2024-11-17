import { icons } from "@/components/icons";
import { menuicons } from "@/components/menuicons";
import {
	Box,
	Button,
	Stack,
	TextField,
	Typography,
	alpha,
} from "@mui/material";
import React, { useEffect } from "react";
import DishEditModal from "./DishEditModal";

export const MenuContent = ({ guests }) => {
	const [open, setOpen] = React.useState(false);
	const [menuData, setMenuData] = React.useState(demoData);
	const [modalData, setModalData] = React.useState({});

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
										<MenuCard
											{...{
												subitem,
												item,
												setModalData,
												setOpen,
												guests,
												setMenuData,
											}}
											key={subitem.id}
										/>
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
			<Box sx={{ py: 3, fontWeight: "500" }}>
				{icons.info} Feed allergies, specific food instrctions or questions
				about the origion of meat: Please contact the restaurant directly at{" "}
				<a href="tel:+41585620030" style={{ color: "#1D9BF0" }}>
					+41585620030
				</a>{" "}
				or add your questions to the remark section.
			</Box>
			{open && (
				<DishEditModal
					{...{ modalData, setMenuData, setOpen, open, menuData }}
				/>
			)}
		</Box>
	);
};
const MenuCard = ({
	subitem,
	item,
	setModalData,
	setOpen,
	guests,
	setMenuData,
}) => {
	const [activeMenu, setActiveMenu] = React.useState(
		subitem?.dishList?.find((dish) => dish.id === subitem.selectedMenu)
	);
	useEffect(() => {
		setActiveMenu(
			subitem?.dishList?.find((dish) => dish.id === subitem.selectedMenu)
		);
	}, [subitem.selectedMenu]);
	return (
		<>
			<Stack
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
						disabled={guests < item.minCount || guests > item.maxCount}
						onClick={() => {
							setModalData(subitem);
							setOpen(true);
						}}
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
							{/* {subitem.subtitle} */}
							{activeMenu?.subtitle || activeMenu?.dishName}
						</Typography>
						<Typography
							variant="body1"
							sx={{
								fontSize: "14px",
								fontWeight: "500",
								color: alpha("#000000", 0.8),
							}}
						>
							{/* {subitem.text} */}
							{activeMenu?.description || activeMenu?.text}
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
						{/* {subitem?.icon} */}
						{/* {subitem?.selectedMenu} */}
						{activeMenu?.icon}
						{activeMenu?.tag}
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
									{/* {subitem.subtitle} */}
									{
										subdata?.dishList?.find(
											(dish) => dish.id === subdata.selectedMenu
										)?.dishName
									}
								</Typography>
								<Typography
									variant="body1"
									sx={{
										fontSize: "13px",
										fontWeight: "500",
										color: alpha("#000000", 0.8),
									}}
								>
									{/* {subitem.text} */}
									{
										subdata?.dishList?.find(
											(dish) => dish.id === subdata.selectedMenu
										)?.description
									}
								</Typography>
							</Box>
						</Stack>
					))}
			</Stack>
		</>
	);
};
export const demoData = [
	{
		id: 1,
		title: "Wedding",
		subtitle: "3 Courses",
		minCount: 8,
		maxCount: 10,
		submenus: [
			{
				id: "wedding-1",
				title: "1 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "sub-wedding-1-1",
				icon: menuicons.fish,
				dishList: [
					{
						id: "sub-wedding-1-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.fish,
						tag: "Fish",
					},
					{
						id: "sub-wedding-1-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
				],
			},
			{
				id: "wedding-2",
				title: "2 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "sub-wedding-2-1",
				icon: menuicons.meat,
				dishList: [
					{
						id: "sub-wedding-2-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
					{
						id: "sub-wedding-2-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
				],
				subdata: [
					{
						id: "wedding-2-1",
						subtitle: "Caprese Saled",
						text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
						selectedMenu: "sub-wedding-2-1-1",
						dishList: [
							{
								id: "sub-wedding-2-1-1",
								dishName: "Caprese Saled",
								description:
									"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
								icon: menuicons.meat,
								tag: "Meat",
							},
							{
								id: "sub-wedding-2-1-2",
								dishName: "Caprese Saled",
								description:
									"Vine-ripened tomatoes, basil, and balsamic reduction.",
								icon: menuicons.fish,
								tag: "Fish",
							},
						],
					},
				],
			},
			{
				id: "wedding-3",
				title: "3 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "sub-wedding-3-1",
				icon: menuicons.vegetarian,
				dishList: [
					{
						id: "sub-wedding-3-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.vegetarian,
						tag: "Vegetarian",
					},
					{
						id: "sub-wedding-3-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.vegetarian,
						tag: "Vegetarian",
					},
				],
			},
		],
	},
	{
		id: 2,
		title: "Birthday",
		subtitle: "7 Courses",
		minCount: 11,
		maxCount: 20,
		submenus: [
			{
				id: "birthday-1",
				title: "1 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "birthday-1-1",
				icon: menuicons.fish,
				dishList: [
					{
						id: "birthday-1-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.fish,
						tag: "Meat",
					},
					{
						id: "birthday-1-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",

						icon: menuicons.fish,
						tag: "Meat",
					},
				],
			},
			{
				id: "birthday-2",
				title: "2 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "birthday-2-1",
				icon: menuicons.meat,
				dishList: [
					{
						id: "birthday-2-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
					{
						id: "birthday-2-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
				],
				subdata: [
					{
						id: "sub-birthday-2-1",
						subtitle: "Caprese Saled",
						text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
						selectedMenu: "sub-birthday-2-1-1",
						dishList: [
							{
								id: "sub-birthday-2-1-1",
								dishName: "Caprese Saled",
								description:
									"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
								icon: menuicons.meat,
								tag: "Meat",
							},
							{
								id: "sub-birthday-2-1-2",
								dishName: "Daprese Saled",
								description:
									"Vine-ripened tomatoes, basil, and balsamic reduction.",
								icon: menuicons.fish,
								tag: "Fish",
							},
						],
					},
				],
			},
			{
				id: "birthday-3",
				title: "3 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "birthday-3-1",
				icon: menuicons.vegetarian,
				dishList: [
					{
						id: "birthday-3-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.vegetarian,
						tag: "Vegetarian",
					},
					{
						id: "birthday-3-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.vegetarian,
						tag: "Vegetarian",
					},
				],
			},
			{
				id: "birthday-4",
				title: "1 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "birthday-4-1",
				icon: menuicons.fish,
				dishList: [
					{
						id: "birthday-4-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
					{
						id: "birthday-4-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
				],
			},
			{
				id: "birthday-5",
				title: "2 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "birthday-5-1",
				icon: menuicons.meat,
				dishList: [
					{
						id: "birthday-5-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
					{
						id: "birthday-5-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
				],
				subdata: [
					{
						id: "sub-birthday-5-1",
						subtitle: "Caprese Saled",
						text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
						selectedMenu: "sub-birthday-5-1-1",
						dishList: [
							{
								id: "sub-birthday-5-1-1",
								dishName: "Caprese Saled",
								description:
									"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
								icon: menuicons.meat,
								tag: "Meat",
							},
							{
								id: "sub-birthday-5-1-2",
								dishName: "Daprese Saled",
								description:
									"Vine-ripened tomatoes, basil, and balsamic reduction.",
								icon: menuicons.fish,
								tag: "Fish",
							},
						],
					},
				],
			},
			{
				id: "birthday-6",
				title: "3 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "birthday-6-1",
				icon: menuicons.vegetarian,
				dishList: [
					{
						id: "birthday-6-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.vegetarian,
						tag: "Vegetarian",
					},
					{
						id: "birthday-6-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.vegetarian,
						tag: "Vegetarian",
					},
				],
			},
		],
	},
	{
		id: 3,
		title: "School Party",
		subtitle: "2 Courses",
		minCount: 21,
		maxCount: 60,
		submenus: [
			{
				id: "school-1",
				title: "1 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "school-1-1",
				icon: menuicons.fish,
				dishList: [
					{
						id: "school-1-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.fish,
						tag: "Fish",
					},
					{
						id: "school-1-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.fish,
						tag: "Fish",
					},
				],
			},
			{
				id: "school-2",
				title: "2 - Course",
				subtitle: "Caprese Saled",
				text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
				selectedMenu: "school-2-1",
				icon: menuicons.meat,
				dishList: [
					{
						id: "school-2-1",
						dishName: "Caprese Saled",
						description:
							"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
					{
						id: "school-2-2",
						dishName: "Daprese Saled",
						description:
							"Vine-ripened tomatoes, basil, and balsamic reduction.",
						icon: menuicons.meat,
						tag: "Meat",
					},
				],
				subdata: [
					{
						id: "sub-school-2-1",
						subtitle: "Caprese Saled",
						text: "Fresh mozzarella, vine-ripened, tomatoes, basil, and balsamic reduction.",
						selectedMenu: "sub-school-2-1-1",
						dishList: [
							{
								id: "sub-school-2-1-1",
								dishName: "Caprese Saled",
								description:
									"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
								icon: menuicons.meat,
								tag: "Meat",
							},
							{
								id: "sub-school-2-1-2",
								dishName: "Daprese Saled",
								description:
									"Vine-ripened tomatoes, basil, and balsamic reduction.",
								icon: menuicons.fish,
								tag: "Fish",
							},
						],
					},
				],
			},
		],
	},
];
