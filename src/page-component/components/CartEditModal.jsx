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
import { useEffect, useState } from "react";
import SelectGroup from "./SelectGroup";

const CartEditModal = ({ open, setOpen, modalData, setCartData, cartData }) => {
	const [selectedDish, setSelectedDish] = useState(null);
	const [selectedSubDish, setSelectedSubDish] = useState(null);
	const handleAddToCart = () => {
		if (selectedDish) {
			setCartData((prevCartData) =>
				prevCartData.map((item) => {
					if (item.id === modalData.id) {
						// Update submenus for the target course
						let updatedSubmenus = [...item.submenus];
						const dishIndex = updatedSubmenus.findIndex(
							(dish) => dish?.id === selectedDish?.id
						);

						if (dishIndex === -1) {
							// Add the new dish with minimum guestCount of 1
							if (selectedSubDish) {
								updatedSubmenus.push({
									...selectedDish,
									guestCount: 1,
								});
							} else {
								updatedSubmenus.push({
									...selectedDish,
									guestCount: 1,
									subdata: [],
								});
							}
						} else if (selectedSubDish) {
							// If subdish exists, update subdata for the dish
							let targetDish = updatedSubmenus[dishIndex];
							if (!targetDish.subdata) {
								// Initialize subdata if it doesn't exist
								targetDish.subdata = [];
							}

							const subdishIndex = targetDish.subdata.findIndex(
								(sub) => sub.id === selectedSubDish.id
							);

							if (subdishIndex === -1) {
								// Add new subdish with a minimum guestCount of 1
								targetDish.subdata.push({
									...selectedSubDish,
									guestCount: 1,
								});
							} else {
								// Ensure subdish guestCount is at least 1
								targetDish.subdata[subdishIndex].guestCount = Math.max(
									targetDish.subdata[subdishIndex].guestCount || 0,
									1
								);
							}
						} else {
							// If no subdish, ensure dish guestCount is at least 1
							updatedSubmenus[dishIndex].guestCount = Math.max(
								updatedSubmenus[dishIndex].guestCount || 0,
								1
							);
						}

						// Recalculate subtotal
						const subTotal = updatedSubmenus.reduce((total, menu) => {
							let menuTotal =
								(menu?.price || 0) * (menu?.guestCount || 1);

							if (menu.subdata) {
								menuTotal += menu.subdata.reduce((subTotal, sub) => {
									return (
										subTotal +
										(sub.price || 0) * (sub.guestCount || 1)
									);
								}, 0);
							}

							return total + menuTotal;
						}, 0);

						return {
							...item,
							submenus: updatedSubmenus,
							subTotal,
							guestCount: item.guestCount + 1,
						};
					}
					return item;
				})
			);
		}
		setOpen(false);
	};

	useEffect(() => {
		setSelectedSubDish(null);
	}, [selectedDish]);

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
					{modalData && (
						<>
							<Typography variant="h6" sx={{ fontWeight: "bold" }}>
								{modalData?.title}
							</Typography>
							<SelectGroup title="Dish">
								<DishCard
									{...{
										dishlist: modalData.dishList,
										cartData,
										setCartData,
										modalData,
										selectedDish,
										setSelectedDish,
									}}
								/>
							</SelectGroup>

							{selectedDish?.subdata?.length > 0 && (
								<Box
									sx={{
										ml: { xs: 2, md: 4 },
										mt: 2,
										position: "relative",
									}}
								>
									{selectedDish?.subdata?.map((subitem) => (
										<SelectGroup title="Side Dish" key={subitem.id}>
											<DishCard
												{...{
													dishlist: selectedDish?.subdata,
													cartData,
													setCartData,
													modalData,
													selectedDish: selectedSubDish,
													setSelectedDish: setSelectedSubDish,
												}}
											/>
										</SelectGroup>
									))}
								</Box>
							)}
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
							onClick={handleAddToCart}
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
	dishlist,
	cartData,
	setCartData,
	modalData,
	selectedDish,
	setSelectedDish,
}) => {
	const handleChange = (e) => {
		setSelectedDish(e.target.value);
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
							value={selectedDish}
							onChange={handleChange}
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
									<SelectedOption selected={selected} />
								) : (
									"Select a dish"
								)
							}
						>
							{dishlist.map((item) => (
								<MenuItem key={item.dishName} value={item}>
									<SelectOption {...{ item }} />
								</MenuItem>
							))}
						</Select>
					</Box>
				</Box>
			</Card>
		</Box>
	);
};

// this is for design purpose skip this
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
						<Stack variant="body2" color="textSecondary" pl={1}>
							{item.kidsIcon}
						</Stack>
					</>
				)}
			</Box>
		</Box>
	);
};
const SelectedOption = ({ selected }) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Typography fontWeight="700" mr={0.4}>
				{selected.dishName}
			</Typography>
			<Typography flexGrow={1}>{selected.description}</Typography>
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
					<Stack variant="body2" color="textSecondary" pl={1}>
						{selected.kidsIcon}
					</Stack>
				</>
			)}
		</Box>
	);
};

export default CartEditModal;
