import { Box, Typography } from "@mui/material";

const SelectGroup = ({ title, children }) => {
	return (
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
				<div style={{ transform: "translateY(-50%)" }}>{title}</div>
			</Typography>
			{children}
		</Box>
	);
};

export default SelectGroup;
