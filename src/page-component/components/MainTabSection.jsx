import { icons } from "@/components/icons";
import { Box } from "@mui/material";
import React from "react";
import { DrinksMenu } from "./DrinksMenu";
import LaCarteContent from "./LaCarteContent";
import { MenuCarte } from "./MenuCarte";
import NewStandardMenu from "./NewStandardMenu";

export const MainTabSection = () => {
	const [value, setValue] = React.useState(1);

	const [guests, setGuests] = React.useState(9);

	return (
		<Box sx={{ width: "100%", px: 3 }}>
			<MenuCarte {...{ guests, setGuests, value, setValue }} />
			{value === 0 && <LaCarteContent referanceGuest={guests} />}
			{/* {value === 1 && <MenuContent guests={guests} />} */}
			{value === 1 && <NewStandardMenu referanceGuest={guests} />}
			{value === 2 && <DrinksMenu />}
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
