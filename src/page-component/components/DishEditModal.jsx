import { menuicons } from "@/components/menuicons";
import {
	Box,
	Button,
	Card,
	Dialog,
	DialogContent,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
const DishCard = ({ icon, kidsIcon, dishlist }) => {
	const [activeDish, setActiveDish] = React.useState(dishlist[0]);
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
					<Box
						sx={{
							width: "0",
							flexGrow: 1,
						}}
					>
						<TextField
							variant="outlined"
							value={activeDish.description}
							readOnly
							disabled
							sx={{
								width: "100%",
								flexGrow: 1,
								position: "relative",
								zIndex: 1,
								border: "none",
								fieldset: {
									border: "none",
								},
								legend: {
									display: "none",
								},
							}}
						/>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						{icon && (
							<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
								{activeDish.icon}
							</Box>
						)}
						<Typography
							variant="body2"
							color="textSecondary"
							sx={{ mr: 2 }}
						>
							{activeDish.tag}
						</Typography>
						<Box
							sx={{
								width: "1px",
								background: "#cccccc",
								height: "18px",
							}}
						/>
						<Box
							sx={{
								transform: "translateX(7px)",
								display: "inline-flex",
							}}
						>
							{kidsIcon}
						</Box>
						<Select
							defaultValue="kids"
							variant="outlined"
							size="small"
							sx={{
								fieldset: { border: "none", outline: "none" },
							}}
							value={activeDish}
							onChange={(e) => setActiveDish(e.target.value)}
						>
							{dishlist.map((item) => (
								<MenuItem value={item}>{item.dishName}</MenuItem>
							))}
						</Select>
					</Box>
				</Box>
			</Card>
		</Box>
	);
};

const DishEditModal = ({ open, setOpen }) => {
	return (
		<Dialog
			open={open}
			sx={{
				".MuiDialog-paperScrollPaper": {
					maxWidth: "927px",
					width: "100%",
					margin: "0 auto",
				},
			}}
			onClose={() => setOpen(false)}
		>
			<DialogContent>
				<Box
					sx={{
						padding: 4,
						width: "100%",
						margin: "0 auto",
					}}
				>
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						1 - Course
					</Typography>

					{/* Main Dish Section */}
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
							<div style={{ transform: "translateY(-50%)" }}>Dish</div>
						</Typography>

						<DishCard
							dishName="Caprese Salad"
							description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
							icon={menuicons.meat}
							tag="Meat"
							kidsIcon={menuicons.kids}
							dishlist={[
								{
									dishName: "Kids",
									description:
										"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
									icon: menuicons.meat,
									tag: "Meat",
								},
								{
									dishName: "Salad Caprese",
									description:
										"Vine-ripened tomatoes, basil, and balsamic reduction.",
									icon: menuicons.meat,
									tag: "Meat",
								},
							]}
						/>
						<Box
							sx={{
								ml: { xs: 2, md: 4 },
								mt: 2,
								position: "relative",
							}}
						>
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
									Sub Dish
								</div>
							</Typography>
							<DishCard
								dishName="Caprese Salad"
								description="Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction."
								icon={menuicons.meat}
								tag="Meat"
								dishlist={[
									{
										dishName: "Kids",
										description:
											"Fresh mozzarella, vine-ripened tomatoes, basil, and balsamic reduction.",
										icon: menuicons.meat,
										tag: "Meat",
									},
									{
										dishName: "Caprese Salad",
										description:
											"Vine-ripened tomatoes, basil, and balsamic reduction.",
										icon: menuicons.meat,
										tag: "Meat",
									},
								]}
							/>
						</Box>
					</Box>

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
						>
							CONFIRM SAVE
						</Button>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default DishEditModal;
