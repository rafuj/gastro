import { icons } from "@/components/icons";
import { Box } from "@mui/material";
import React from "react";
import LaCarteContent from "./LaCarteContent";
import { MenuCarte } from "./MenuCarte";
import { MenuContent } from "./MenuContent";

export const MainTabSection = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// const [disabledBtn, setDisabledBtn] = React.useState(true);
	const [guests, setGuests] = React.useState(9);

	return (
		<Box sx={{ width: "100%", px: 3 }}>
			{/* <Box
				sx={{
					borderBottom: 1,
					borderColor: "divider",
					background: "rgba(204, 204, 204, 0.2)",
					borderRadius: "8px",
					mb: 4,
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
								icon={item.icon}
								label={item.name}
								iconPosition="start"
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
			<SearchOptions /> */}
			<MenuCarte {...{ guests, setGuests, value, setValue }} />
			{value === 0 ? <LaCarteContent /> : <MenuContent guests={guests} />}
		</Box>
	);
};
const tabmenu = [
	{
		name: "Restaurant",
		icon: icons.restaurant,
	},
	{
		name: "Catering Service",
		icon: icons.catering,
	},
	{
		name: "Food Truck",
		icon: icons.truck,
	},
	{
		name: "Event Location",
		icon: icons.location,
	},
];
