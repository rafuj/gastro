import { icons } from "@/components/icons";
import { menuicons } from "@/components/menuicons";
import {
	Box,
	Button,
	ButtonBase,
	Card,
	Collapse,
	IconButton,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import DishEditModal from "./DishEditModal";

const LaCarteContent = () => {
	const [open, setOpen] = React.useState(false);
	const [menuData, setMenuData] = React.useState(cartFakeData);
	const [modalData, setModalData] = React.useState({});
	const [accordionOpenIds, setAccordionOpenIds] = React.useState([1, 2]);

	return (
		<>
			<Stack gap={1} mt={3}>
				{menuData.map((item, index) => {
					const { id, submenus, title } = item;
					return (
						<Card
							key={id}
							sx={{
								boxShadow: "0 0 5px rgba(0,0,0,0.1)",
								p: 2,
								mb: 2,
							}}
						>
							<Stack flexDirection="row" justifyContent="space-between">
								<Typography fontSize="20px" fontWeight="600" mr="auto">
									{title}
								</Typography>
								<Typography fontSize="20px" fontWeight="600">
									CHF 0&apos;00{" "}
									<Button
										type="button"
										sx={{
											p: 0,
											m: 0,
											minWidth: 0,
											background: "transparent",
										}}
										onClick={() =>
											setAccordionOpenIds((prev) =>
												prev.includes(id)
													? prev.filter((item) => item !== id)
													: [...prev, id]
											)
										}
									>
										{accordionOpenIds.includes(id)
											? menuicons.caretUp
											: menuicons.caretDown}
									</Button>
								</Typography>
							</Stack>
							<Box sx={{ overflowX: "auto" }}>
								<Box minWidth={"700px"}>
									<Collapse in={accordionOpenIds.includes(id)}>
										<Box>
											{Object.keys(submenus).length > 0 && (
												<Box>
													<Typography
														variant="h6"
														sx={{ fontWeight: "bold" }}
													>
														{submenus?.title}
													</Typography>
													{submenus.map((subitem, index) => (
														<Box
															position="relative"
															mb={2}
															key={index}
														>
															<>
																<Typography
																	variant="subtitle2"
																	color="textSecondary"
																	sx={{
																		marginTop: 2,
																		alignSelf: "flex-start",
																		m: 0,
																		position: "absolute",
																		left: "10px",
																		top: "0",
																		zIndex: 1,
																		background: "#fff",
																		px: 0.7,
																	}}
																>
																	<div
																		style={{
																			transform:
																				"translateY(-50%)",
																		}}
																	>
																		Dish
																	</div>
																</Typography>
																<CartItem
																	dishName={subitem.subtitle}
																	description={subitem.text}
																	icon={subitem.icon}
																	selected={
																		subitem.selectedMenu
																	}
																	kidsIcon={menuicons.kids}
																	dishlist={subitem.dishList}
																	menuId={subitem.id}
																	menu={""}
																	// setMenu={setMenu}
																	// menu={menu}
																/>
																{subitem?.subdata?.length >
																	0 && (
																	<>
																		{subitem?.subdata?.map(
																			(subSubmenu) => (
																				<Box
																					sx={{
																						ml: {
																							xs: 2,
																							md: 4,
																						},
																						mt: 2,
																						mb: 2,
																						position:
																							"relative",
																					}}
																					key={
																						subSubmenu.id
																					}
																				>
																					<Typography
																						variant="subtitle2"
																						color="textSecondary"
																						sx={{
																							marginTop: 2,
																							alignSelf:
																								"flex-start",
																							m: 0,
																							position:
																								"absolute",
																							left: "10px",
																							top: "0",
																							zIndex: 1,
																							background:
																								"#fff",
																							px: 0.7,
																						}}
																					>
																						<div
																							style={{
																								transform:
																									"translateY(-50%)",
																							}}
																						>
																							Sub Dish
																						</div>
																					</Typography>
																					<CartItem
																						dishName={
																							subSubmenu.subtitle
																						}
																						description={
																							subSubmenu.text
																						}
																						icon={
																							subSubmenu.icon
																						}
																						selected={
																							subSubmenu.selectedMenu
																						}
																						kidsIcon={
																							menuicons.kids
																						}
																						dishlist={
																							subSubmenu.dishList
																						}
																						menuId={
																							subSubmenu.id
																						}
																						menu={""}
																						// setMenu={setMenu}
																						// menu={menu}
																					/>
																				</Box>
																			)
																		)}
																	</>
																)}
															</>
														</Box>
													))}
													<Stack
														flexDirection={"row"}
														justifyContent={"flex-end"}
													>
														<ButtonBase
															variant="contained"
															sx={{
																background: "#8211011A",
																color: "#821101",
																height: "42px",
																width: {
																	xs: "120px",
																	lg: "150px",
																},
																borderRadius: "5px",
																textTransform: "uppercase",
																fontSize: {
																	xs: "12px",
																	lg: "15px",
																},
																fontWeight: "700",
																mr: { md: "170px" },
															}}
															onClick={() => {
																setModalData(
																	index == 0
																		? dish1
																		: index == 1
																		? dish2
																		: dish3
																);
																setOpen(true);
															}}
														>
															{icons.increment2} Add Meal
														</ButtonBase>
													</Stack>
												</Box>
											)}
										</Box>
									</Collapse>
								</Box>
							</Box>
						</Card>
					);
				})}
				<Box sx={{ opacity: "0.3", my: 1 }}>
					<hr />
				</Box>
				<Stack flexDirection={"row"}>
					<Typography fontSize="20px" fontWeight="600" marginRight="auto">
						Subtotal
					</Typography>
					<Typography
						fontSize="20px"
						fontWeight="500"
						sx={{
							mr: { xs: 0, md: 2, lg: 7 },
						}}
					>
						21 Guests
					</Typography>
					<Typography fontSize="20px" fontWeight="600">
						CHF 0&apos;00
					</Typography>
				</Stack>
				<Box sx={{ opacity: "0.3", my: 1 }}>
					<hr />
				</Box>
				<TextField
					variant="outlined"
					placeholder="Add remarks here..."
					label="Add Remarks"
					sx={{
						width: "100%",
					}}
				/>
				<Stack
					flexDirection="row"
					justifyContent="space-between"
					alignItems={"center"}
				>
					<Stack
						flexDirection="row"
						alignItems="center"
						gap="6px"
						sx={{
							py: 3,
							fontWeight: "500",
							width: "0",
							maxWidth: "771px",
							flexGrow: "1",
						}}
					>
						{icons.info}{" "}
						<Box sx={{ width: "0", flexGrow: "1" }}>
							Feed allergies, specific food instrctions or questions
							about the origion of meat: Please contact the restaurant
							directly at{" "}
							<a href="tel:+41585620030" style={{ color: "#1D9BF0" }}>
								+41585620030
							</a>{" "}
							or add your questions to the remark section.
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
							mt: 2,
						}}
					>
						Request Menu
					</Button>
				</Stack>
			</Stack>
			{open && (
				<DishEditModal
					{...{
						modalData,
						setMenuData,
						setOpen,
						open,
						menuData,
					}}
				/>
			)}
		</>
	);
};

export const CartItem = ({
	icon,
	kidsIcon,
	tag,
	dishlist,
	dishName,
	setMenu,
	menuId: submenuId,
	menu,
	isSubDish,
	selected: selectedMenu,
}) => {
	const [activeDish, setActiveDish] = React.useState(
		dishlist.find((item) => item.id === selectedMenu) || null
	);

	const handleSelectChange = (e) => {
		const selectedDish = e.target.value;
		setActiveDish(selectedDish);

		// setMenu((prev) =>
		// 	prev.map((menuItem) => ({
		// 		...menuItem,
		// 		submenus: menuItem.submenus.map((submenu) => {
		// 			if (isSubDish && submenu.subdata) {
		// 				return {
		// 					...submenu,
		// 					subdata: submenu.subdata.map((subItem) =>
		// 						subItem.id == submenuId
		// 							? { ...subItem, selectedMenu: selectedDish.id }
		// 							: subItem
		// 					),
		// 				};
		// 			} else if (submenu.id === submenuId) {
		// 				return { ...submenu, selectedMenu: selectedDish.id };
		// 			}
		// 			return submenu;
		// 		}),
		// 	}))
		// );
	};

	const [guests, setGuests] = React.useState(9);

	const handleIncrement = () => {
		setGuests((prev) => prev + 1);
	};
	const handleDecrement = () => {
		if (guests > 0) {
			setGuests((prev) => prev - 1);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				marginY: 1,
				gap: 2,
			}}
		>
			<Card variant="outlined" sx={{ width: "0", padding: 0, flexGrow: 1 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					<Box sx={{ width: "200px", flexGrow: 1 }}>
						<Select
							value={activeDish}
							onChange={handleSelectChange}
							displayEmpty
							variant="outlined"
							sx={{
								width: "100%",
								position: "relative",
								zIndex: 1,
								"& .MuiOutlinedInput-notchedOutline": {
									border: "none", // Removes default border
								},
								"& .MuiSelect-select": {
									padding: "10px 14px", // Adjust padding for appearance
								},
							}}
							renderValue={(selected) =>
								selected ? (
									<Box sx={{ display: "flex", alignItems: "center" }}>
										<Typography fontWeight="700" mr={0.4}>
											{selected.dishName}
										</Typography>
										<Typography flexGrow={1} width="0">
											<Box
												sx={{
													display: "-webkit-flex",
													WebkitBoxOrient: "vertical",
													WebkitLineClamp: 1,
													overflow: "hidden",
													textOverflow: "ellipsis",
													mr: 1,
												}}
											>
												{selected.description}
											</Box>
										</Typography>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												mr: 1,
											}}
										>
											{selected.icon}
										</Box>
										<Typography variant="body2" color="textSecondary">
											{selected.tag}
										</Typography>
									</Box>
								) : (
									"Select a dish"
								)
							}
						>
							{dishlist.map((item) => (
								<MenuItem key={item.dishName} value={item}>
									<Box
										sx={{
											display: "flex",
											width: "100%",
											alignItems: "center",
										}}
									>
										{/* Updated content for clarity */}
										<Typography fontWeight="700" mr={1}>
											{item.dishName}
										</Typography>
										<Typography>{item.description}</Typography>
										<Box
											sx={{
												ml: "auto",
												display: "flex",
												alignItems: "center",
												mr: 1,
											}}
										>
											{item.icon}
											<Typography
												variant="body2"
												color="textSecondary"
												ml={1}
											>
												{item.tag}
											</Typography>
										</Box>
									</Box>
								</MenuItem>
							))}
						</Select>
					</Box>
				</Box>
			</Card>

			<Box
				sx={{
					border: "1px solid #ccc",
					borderRadius: "8px",
					padding: "4px 16px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: {
						xs: "120px",
						lg: "150px",
					},
					position: "relative",
				}}
			>
				<Typography
					variant="caption"
					color="textSecondary"
					sx={{
						alignSelf: "flex-start",
						m: 0,
						position: "absolute",
						left: "10px",
						top: "-10px",
						zIndex: 1,
						background: "#ffffff",
						px: 0.7,
					}}
				>
					Guests
				</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<IconButton onClick={handleDecrement} size="small">
						{icons.decrement}
					</IconButton>
					<Typography variant="h6">{guests}</Typography>
					<IconButton onClick={handleIncrement} size="small">
						{icons.increment}
					</IconButton>
				</Box>
			</Box>
			<Typography
				sx={{
					fontWeight: "600",
					fontSize: {
						xs: "16px",
						lg: "18px",
					},
				}}
				ml={2}
			>
				CHF 25’00
			</Typography>
			<Button
				type="button"
				sx={{
					border: "none",
					outline: "none",
					minWidth: "0",
					background: "transparent",
				}}
			>
				{menuicons.trash}
			</Button>
		</Box>
	);
};
export const cartFakeData = [
	{
		id: 1,
		title: "1 - Course Starter",
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
		title: "2 - Course Main ",
		subtitle: "7 Courses",
		minCount: 11,
		maxCount: 20,
		submenus: [
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
								description: "Fresh mozzarella, vine-ripened tomatoes",
								icon: menuicons.meat,
								tag: "Meat",
							},
						],
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
		title: "3 - Course Dessert",
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

const dish1 = {
	id: "wedding-2",
	title: "1 - Course",
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
			description: "Vine-ripened tomatoes, basil, and balsamic reduction.",
			icon: menuicons.meat,
			tag: "Meat",
		},
	],
};

const dish2 = {
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
			description: "Vine-ripened tomatoes, basil, and balsamic reduction.",
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
};

const dish3 = {
	id: "wedding-2",
	title: "3 - Course",
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
			description: "Vine-ripened tomatoes, basil, and balsamic reduction.",
			icon: menuicons.meat,
			tag: "Meat",
		},
	],
};

export default LaCarteContent;
