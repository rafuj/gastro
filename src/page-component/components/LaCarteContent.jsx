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
import React, { useEffect } from "react";
import CartEditModal from "./CartEditModal";
import SelectGroup from "./SelectGroup";

const LaCarteContent = () => {
	const [open, setOpen] = React.useState(false);
	const [cartData, setCartData] = React.useState(cartFakeData);
	const [modalData, setModalData] = React.useState({});
	const [total, setTotal] = React.useState(0);

	console.log({ cartData });
	const [accordionOpenIds, setAccordionOpenIds] = React.useState([
		"course-1",
		"course-2",
		"course-3",
	]);

	useEffect(() => {
		let total = 0;
		cartData.forEach((course) => {
			total += course.subTotal;
		});
		setTotal(total);
	}, [cartData]);

	return (
		<>
			<Stack gap={1} mt={3}>
				{cartData.map((item, index) => {
					const { id, submenus, title } = item;
					const dishData = index == 0 ? dish1 : index == 1 ? dish2 : dish3;
					const { dishList } = dishData;

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
									CHF {item.subTotal.toFixed(2)}
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
													{submenus?.map(
														(subitem) =>
															subitem && (
																<React.Fragment
																	key={subitem?.id}
																>
																	<Box mb={2}>
																		<SelectGroup title="Dish">
																			<CartItem
																				dishlist={dishList}
																				{...{
																					cartData,
																					setCartData,
																					subitem,
																				}}
																			/>
																		</SelectGroup>
																	</Box>
																</React.Fragment>
															)
													)}
												</Box>
											)}
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
														mr: {
															xs: "160px",
															lg: "170px",
														},
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
						CHF {total.toFixed(2)}
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
					flexWrap={"wrap-reverse"}
					sx={{
						py: 3,
						rowGap: 2,
					}}
				>
					<Stack
						flexDirection="row"
						alignItems="center"
						gap="6px"
						sx={{
							fontWeight: "500",
							width: { xs: "100%", sm: "0" },
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
							ml: "auto",
						}}
					>
						Request Menu
					</Button>
				</Stack>
			</Stack>
			{open && (
				<CartEditModal
					{...{
						setCartData,
						cartData,
						modalData,
						setOpen,
						open,
					}}
				/>
			)}
		</>
	);
};

export const CartItem = ({
	dishlist,
	cartData,
	setCartData,
	subitem,
	// for subdish
	isSubDishId = false,
	mainList = [],
}) => {
	const [selectedDish, setSelectedDish] = React.useState(null);

	const handleIncrement = () => {
		const updatedCartData = cartData.map((item) => {
			if (isSubDishId) {
				return {
					...item,
					submenus: item.submenus.map((submenuItem) => {
						// const selectedArray = mainList.find(
						// 	(item) => item.id === isSubDishId
						// );
						return {
							...submenuItem,
							subdata: submenuItem.subdata.map((subSubitem) => {
								if (subSubitem.id === subitem.id) {
									return {
										...subSubitem,
										guestCount: subSubitem.guestCount + 1,
										subTotal:
											subSubitem.price * (subSubitem.guestCount + 1),
									};
								}
								return subSubitem;
							}),
						};
					}),
				};
			} else {
				return {
					...item,
					// Initialize subtotal and guest count updates
					subTotal: item.submenus.some(
						(submenuItem) => submenuItem.id === subitem.id
					)
						? item.subTotal + subitem.price
						: item.subTotal,
					guestCount: item.submenus.some(
						(submenuItem) => submenuItem.id === subitem.id
					)
						? item.guestCount + 1
						: item.guestCount,
					submenus: item.submenus.map((submenuItem) => {
						// Update the specific submenuItem if its id matches subitem.id
						if (submenuItem.id === subitem.id) {
							return {
								...submenuItem,
								guestCount: submenuItem.guestCount + 1, // Increment guest count for this submenu
							};
						}
						// Return unchanged submenuItem if no match
						return submenuItem;
					}),
				};
			}
		});
		setCartData(updatedCartData);
	};
	const handleDecrement = () => {
		const updatedCartData = cartData.map((item) => {
			if (isSubDishId) {
				return {
					...item,
					submenus: item.submenus.map((submenuItem) => {
						// const selectedArray = mainList.find(
						// 	(item) => item.id === isSubDishId
						// );
						return {
							...submenuItem,
							subdata: submenuItem.subdata.map((subSubitem) => {
								if (subSubitem.id === subitem.id) {
									return {
										...subSubitem,
										guestCount: Math.max(
											subSubitem.guestCount - 1,
											0
										),
										subTotal:
											subSubitem.price *
											Math.max(subSubitem.guestCount - 1, 1),
									};
								}
								return subSubitem;
							}),
						};
					}),
				};
			} else {
				return {
					...item,
					// Initialize subtotal and guest count updates
					subTotal: item.submenus.some(
						(submenuItem) => submenuItem.id === subitem.id
					)
						? item.subTotal - subitem.price
						: item.subTotal,
					guestCount: item.submenus.some(
						(submenuItem) => submenuItem.id === subitem.id
					)
						? item.guestCount - 1
						: item.guestCount,
					submenus: item.submenus.map((submenuItem) => {
						if (submenuItem.id === subitem.id) {
							console.log(
								"fuck you",
								submenuItem,
								Math.max(submenuItem.guestCount - 1, 1)
							);
							const price =
								submenuItem.price *
								Math.max(submenuItem.guestCount - 1, 1);
							return {
								...submenuItem,
								guestCount: Math.max(submenuItem.guestCount - 1, 1),
								subTotal: price,
							};
						} else {
							return submenuItem;
						}
					}),
				};
			}
		});
		setCartData(updatedCartData);
	};

	const handleDelete = () => {
		// both dish and subdish can be deleted
		const updatedCartData = cartData.map((item) => {
			return {
				...item,
				submenus: item.submenus.map((submenuItem) => {
					if (isSubDishId) {
						// const selectedArray = mainList.find(
						// 	(item) => item.id === isSubDishId
						// );
						return {
							...submenuItem,
							subdata: submenuItem.subdata.filter(
								(subSubitem) => subSubitem.id !== subitem.id
							),
						};
					} else {
						if (submenuItem.id === subitem.id) {
							// submenuItem delete from cart
							return null;
						} else {
							return submenuItem;
						}
					}
				}),
			};
		});
		setCartData(updatedCartData);
	};

	useEffect(() => {
		if (isSubDishId) {
			const selectedArray = mainList.find((item) => item.id === isSubDishId);
			setSelectedDish(
				selectedArray?.subdata?.find((item) => item.id === subitem.id)
			);
		} else {
			setSelectedDish(dishlist.find((item) => item.id === subitem.id));
		}
	}, []);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					marginY: 1,
					gap: 2,
				}}
			>
				<Card
					variant="outlined"
					sx={{ width: "0", padding: 0, flexGrow: 1 }}
				>
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
								value={selectedDish}
								onChange={(e) => setSelectedDish(e.target.value)}
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
										<SelectedOption selected={selected} />
									) : (
										"Select a dish"
									)
								}
							>
								{dishlist?.map((item) => (
									<MenuItem key={item.dishName} value={item}>
										<SelectOption item={item} />
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
						<IconButton
							size="small"
							onClick={subitem?.guestCount > 1 ? handleDecrement : null}
						>
							{icons.decrement}
						</IconButton>
						<Typography variant="h6">{subitem?.guestCount}</Typography>
						<IconButton size="small" onClick={handleIncrement}>
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
					CHF {subitem?.price?.toFixed(2)}
				</Typography>
				<Button
					type="button"
					sx={{
						border: "none",
						outline: "none",
						minWidth: "0",
						background: "transparent",
					}}
					onClick={handleDelete}
				>
					{menuicons.trash}
				</Button>
			</Box>

			{subitem?.subdata?.length > 0 &&
				subitem?.subdata?.map((subSubmenu) => (
					<Box
						sx={{
							ml: {
								xs: 2,
								md: 4,
							},
							mt: 2,
							mb: 2,
							position: "relative",
						}}
						key={subSubmenu.id}
					>
						<SelectGroup title="Side Dish">
							<CartItem
								dishlist={subSubmenu.dishList}
								{...{
									cartData,
									setCartData,
									subitem: subSubmenu,
									isSubDishId: subitem.id,
									mainList: dishlist,
								}}
							/>
						</SelectGroup>
					</Box>
				))}
		</>
	);
};
// ui for dropdown menu
const SelectOption = ({ item }) => {
	return (
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
				<Typography variant="body2" color="textSecondary" ml={1}>
					{item.tag}
				</Typography>
			</Box>
		</Box>
	);
};
// ui for selected menu;
const SelectedOption = ({ selected }) => {
	return (
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
	);
};

export const cartFakeData = [
	{
		id: "course-1",
		title: "1 - Course Starter",
		subtitle: "3 Courses",
		submenus: [],
		subTotal: 0,
		guestCount: 0,
	},
	{
		id: "course-2",
		title: "2 - Course Main ",
		subtitle: "7 Courses",
		submenus: [],
		subTotal: 0,
		guestCount: 0,
	},
	{
		id: "course-3",
		title: "3 - Course Dessert",
		subtitle: "2 Courses",
		minCount: 21,
		maxCount: 60,
		submenus: [],
		subTotal: 0,
		guestCount: 0,
	},
];

const dish1 = {
	id: "course-1",
	title: "1 - Course",
	selectedMenu: "course-1-1",
	icon: menuicons.meat,
	dishList: [
		{
			id: "course-1-1",
			dishName: "Stuffed Mushrooms",
			description: "Garlic-herb stuffed mushrooms with crispy topping.",
			icon: menuicons.vegetarian,
			tag: "Vegetarian",
			price: 25,
		},
		{
			id: "course-1-2",
			dishName: "Caprese Skewers",
			description: "Mozzarella, tomatoes, basil, and balsamic.",
			icon: menuicons.vegetarian,
			tag: "Vegetarian",
			price: 25,
		},
		{
			id: "course-1-3",
			dishName: "Salmon Crostini",
			description: "Smoked salmon on crostini with cream cheese.",
			icon: menuicons.fish,
			tag: "Fish",
			price: 20,
		},
		{
			id: "course-1-4",
			dishName: "Shrimp Cocktail",
			description: "Chilled shrimp with zesty sauce.",
			icon: menuicons.fish,
			tag: "Fish",
			price: 20,
		},
		{
			id: "course-1-5",
			dishName: "Tomato Bruschetta",
			description: "Baguette with tomato and basil.",
			icon: menuicons.meat,
			tag: "Meat",
			price: 22,
		},
	],
};

const dish2 = {
	id: "course-2",
	title: "2 - Course",
	selectedMenu: "course-2-3",
	dishList: [
		{
			id: "course-2-2",
			dishName: "Vegetable Stir-Fry with Tofu",
			description: "Colorful vegetables and tofu in a savory sauce.",
			icon: menuicons.vegetarian,
			tag: "Vegetarian",
			price: 33,
			guestCount: 1,
		},
		{
			id: "course-2-3",
			dishName: "Grilled Salmon with Lemon-Dill Sauce",
			description: "Juicy grilled salmon with a zesty lemon-dill sauce.",
			icon: menuicons.fish,
			tag: "Fish",
			price: 33,
			guestCount: 1,
		},
		{
			id: "course-2-4",
			dishName: "Chicken Alfredo Pasta",
			description: "Creamy pasta with tender chicken and Parmesan.",
			icon: menuicons.meat,
			tag: "Meat",
			price: 33,
			guestCount: 1,
			subdata: [
				{
					id: "sub-course-2-4-1",
					dishName: "Fries",
					description: "Fresh home made fries",
					price: 20,
					guestCount: 1,
				},
			],
		},
		{
			id: "course-2-5",
			dishName: "Stuffed Bell Peppers",
			description: "Bell peppers filled with rice, beans, and vegetables.",
			icon: menuicons.vegetarian,
			tag: "Vegetarian",
			price: 33,
			guestCount: 1,
			subdata: [
				{
					id: "sub-course-2-4-1",
					dishName: "Truffle fries",
					description: "Fresh home made fries with tuffle",
					price: 20,
					guestCount: 1,
				},
			],
		},
		{
			id: "course-2-6",
			dishName: "Spaghetti Bolognese",
			description: "Classic spaghetti with rich tomato-meat sauce.",
			icon: menuicons.meat,
			tag: "Meat",
			kidsIcon: menuicons.kids,
			price: 25.5,
			guestCount: 1,
		},
	],
};

const dish3 = {
	id: "course-3",
	title: "3 - Course",
	selectedMenu: "sub-wedding-2-1",
	dishList: [
		{
			id: "sub-wedding-2-1",
			dishName: "Lava cake",
			description: "Chocolate with ice cream",
			icon: menuicons.vegetarian,
			tag: "Vegetarian",
			price: 25,
			guestCount: 1,
		},
	],
};

export default LaCarteContent;
