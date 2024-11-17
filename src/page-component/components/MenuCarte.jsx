import { icons } from "@/components/icons";
import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";

export const MenuCarte = ({ guests, setGuests, value, setValue }) => {
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleIncrement = () => {
		setGuests((prev) => prev + 1);
	};

	const handleDecrement = () => {
		if (guests > 0) {
			setGuests((prev) => prev - 1);
		}
	};
	return (
		<Stack
			direction="row"
			flexWrap="wrap"
			justifyContent="space-between"
			alignItems="center"
			gap={1}
			sx={{ rowGap: 3 }}
		>
			<Typography
				sx={{ fontSize: "20px", fontWeight: "600", marginRight: "auto" }}
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
										minHeight: "42px",
										lineHeight: "42px",
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
					padding: "4px 16px",
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
