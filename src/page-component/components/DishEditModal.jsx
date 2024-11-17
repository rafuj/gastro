import { menuicons } from "@/components/menuicons";
import {
	Box,
	Button,
	Card,
	Dialog,
	DialogContent,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";

const DishEditModal = ({ open, setOpen, modalData, setMenuData, menuData }) => {
	const [menu, setMenu] = useState(menuData);

	const handleConfirm = () => {
		setMenuData(menu);
		const timer = setTimeout(() => {
			setOpen(false);
		}, 0);
		return () => clearTimeout(timer);
	};

	return (
		<Dialog
			open={open}
			sx={{
				".MuiDialog-paperScrollPaper": {
					maxWidth: "927px",
					width: "100%",
					margin: "0 auto",
					m: 1,
				},
			}}
			onClose={() => setOpen(false)}
		>
			<DialogContent>
				<Box
					sx={{
						padding: { xs: 2, md: 4 },
						width: "100%",
						margin: "0 auto",
					}}
				>
					{/* Main Dish Section */}

					{modalData && (
						<>
							<Typography variant="h6" sx={{ fontWeight: "bold" }}>
								{modalData?.title}
							</Typography>
							<Box position="relative">
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
									<div style={{ transform: "translateY(-50%)" }}>
										Dish
									</div>
								</Typography>
								<DishCard
									dishName={modalData.subtitle}
									description={modalData.text}
									icon={modalData.icon}
									selected={modalData.selectedMenu}
									kidsIcon={menuicons.kids}
									dishlist={modalData.dishList}
									menuId={modalData.id}
									setMenu={setMenu}
									menu={menu}
								/>

								{modalData?.subdata?.length > 0 && (
									<Box
										sx={{
											ml: { xs: 2, md: 4 },
											mt: 2,
											position: "relative",
										}}
									>
										{modalData?.subdata?.map((subitem) => (
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
															transform: "translateY(-50%)",
														}}
													>
														Sub Dish
													</div>
												</Typography>

												<DishCard
													dishName={subitem.subtitle}
													description={subitem.text}
													icon={subitem.icon}
													selected={subitem.selectedMenu}
													dishlist={subitem.dishList}
													menuId={subitem.id}
													menu={menu}
													setMenu={setMenu}
													isSubDish={true}
												/>
											</>
										))}
									</Box>
								)}
							</Box>
						</>
					)}

					{/* Action Buttons */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							marginTop: 4,
						}}
					>
						<Button
							variant="contained"
							color="inherit"
							sx={{
								marginRight: 1,
								boxShadow: "none",
								backgroundColor: "#cccccc",
							}}
							onClick={() => setOpen(false)}
						>
							CANCEL
						</Button>
						<Button
							variant="contained"
							color="primary"
							sx={{ height: "42px", boxShadow: "none" }}
							onClick={() => {
								handleConfirm(menu);
							}}
						>
							CONFIRM SAVE
						</Button>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export const DishCard = ({
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
	const [activeDish, setActiveDish] = useState(
		dishlist.find((item) => item.id === selectedMenu) || null
	);

	const handleSelectChange = (e) => {
		const selectedDish = e.target.value;
		setActiveDish(selectedDish);

		setMenu((prev) =>
			prev.map((menuItem) => ({
				...menuItem,
				submenus: menuItem.submenus.map((submenu) => {
					if (isSubDish && submenu.subdata) {
						return {
							...submenu,
							subdata: submenu.subdata.map((subItem) =>
								subItem.id == submenuId
									? { ...subItem, selectedMenu: selectedDish.id }
									: subItem
							),
						};
					} else if (submenu.id === submenuId) {
						return { ...submenu, selectedMenu: selectedDish.id };
					}
					return submenu;
				}),
			}))
		);
	};

	return (
		<Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
			<Card variant="outlined" sx={{ width: "100%", padding: 0 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Box sx={{ width: "0", flexGrow: 1 }}>
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
											{console.log("selected", selected)}
										</Typography>
										<Typography flexGrow={1}>
											{selected.description}
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
										{selected.kidsIcon && (
											<>
												<Box
													sx={{
														height: "12px",
														width: "1px",
														background: "#00000030",
														ml: 1,
													}}
												/>
												<Stack
													variant="body2"
													color="textSecondary"
													pl={1}
												>
													{selected.kidsIcon}
												</Stack>
											</>
										)}
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
											{item.kidsIcon && (
												<>
													<Box
														sx={{
															height: "12px",
															width: "1px",
															background: "#00000030",
															ml: 1,
														}}
													/>
													<Stack
														variant="body2"
														color="textSecondary"
														pl={1}
													>
														{item.kidsIcon}
													</Stack>
												</>
											)}
										</Box>
									</Box>
								</MenuItem>
							))}
						</Select>
					</Box>
				</Box>
			</Card>
		</Box>
	);
};

export default DishEditModal;
