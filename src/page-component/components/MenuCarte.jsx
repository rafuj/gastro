import { icons } from "@/components/icons";
import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

export const MenuCarte = ({ cb = () => {} }) => {
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
		cb();
	};
	const [guests, setGuests] = useState(9);

	const handleIncrement = () => {
		setGuests((prev) => prev + 1);
		cb();
	};

	const handleDecrement = () => {
		if (guests > 0) {
			setGuests((prev) => prev - 1);
			cb();
		}
	};
	return (
		<Stack
			direction="row"
			flexWrap="wrap"
			justifyContent="space-between"
			alignItems="center"
			gap={1}
			sx={{ mt: 1 }}
		>
			<Typography
				sx={{ fontSize: "24px", fontWeight: "600", marginRight: "auto" }}
				variant="h4"
			>
				Menu
			</Typography>
			<Box sx={{ flexGrow: "1", maxWidth: "659px" }}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "divider",
						background: "rgba(204, 204, 204, 0.2)",
						borderRadius: "8px",
						".MuiTabs-root": {
							minHeight: "42px",
						},
					}}
				>
					<Tabs
						value={value}
						onChange={handleChange}
						sx={{
							p: 0,
							gap: 0,
							".MuiTabs-indicator": {},
						}}
					>
						{tabmenu.map((item, index) => {
							return (
								<Tab
									key={index}
									label={item.name}
									sx={{
										py: 0,
										minHeight: "54px",
										lineHeight: "54px",
										textTransform: "capitalize",
										fontSize: "14px",
										fontWeight: "500",
										flexGrow: 1,
										maxWidth: "100%",
										"&:last-child": {
											borderRadius: "0 0 8px 8px",
										},
										"&:first-child": {
											borderRadius: "8px 8px 0 0",
										},
									}}
								/>
							);
						})}
					</Tabs>
				</Box>
			</Box>
			<Box
				sx={{
					border: "1px solid #ccc",
					borderRadius: "8px",
					padding: "8px 16px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "120px",
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
						background: "#f4f6f8",
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
		</Stack>
	);
};

const tabmenu = [
	{
		name: "A La Carte",
	},
	{
		name: "Standard Menu",
	},
];
