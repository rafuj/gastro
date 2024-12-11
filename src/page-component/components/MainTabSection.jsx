import { Box } from "@mui/material";
import React from "react";
import { DrinksMenu } from "./DrinksMenu";
import LaCarteContent from "./LaCarteContent";
import { MenuCarte } from "./MenuCarte";
import NewStandardMenu from "./NewStandardMenu";

export const MainTabSection = () => {
	const [value, setValue] = React.useState(1);

	const [guests, setGuests] = React.useState(9);
	// useEffect(() => {
	// 	if (value == 1) {
	// 		setGuests(15);
	// 	}
	// }, [value]);

	return (
		<Box sx={{ width: "100%", px: 3 }}>
			<MenuCarte {...{ guests, setGuests, value, setValue }} />
			<Box
				sx={{
					display: value === 0 ? "block" : "none",
				}}
			>
				<LaCarteContent referanceGuest={guests} />
			</Box>
			<Box
				sx={{
					display: value === 1 ? "block" : "none",
				}}
			>
				<NewStandardMenu referanceGuest={guests} />
			</Box>
			<Box
				sx={{
					display: value === 2 ? "block" : "none",
				}}
			>
				<DrinksMenu />
			</Box>
		</Box>
	);
};
