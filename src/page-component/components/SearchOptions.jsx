import { icons } from "@/components/icons";
import {
	Box,
	Button,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";

const SearchOptions = () => {
	return (
		<Box
			sx={{
				py: 2,
				backgroundColor: "#f5f5f5",
				borderRadius: 1,
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				gap: 2,
			}}
		>
			{/* Where input */}
			<TextField
				variant="outlined"
				placeholder="Zürish"
				label="Where?"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{icons.search}
						</InputAdornment>
					),
				}}
				sx={{
					width: "200px",
					flexGrow: 1,
					maxWidth: { xs: "320px", xl: "unset" },
				}}
			/>

			{/* Date Selection */}
			<TextField
				variant="outlined"
				placeholder="22/10"
				label="Date Selection"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{icons.calendar}
						</InputAdornment>
					),
				}}
				sx={{
					width: "150px",
					flexGrow: 1,
					maxWidth: { xs: "320px", xl: "unset" },
					gap: 1,
				}}
			/>

			{/* Category */}
			<Select
				variant="outlined"
				defaultValue="Launch - 3 Course"
				label="Category"
				sx={{
					width: "200px",
					flexGrow: 1,
					maxWidth: { xs: "320px", xl: "unset" },
					gap: 1,
					legend: {
						visibility: "visible",
						zIndex: "99",
						lineHeight: "11px",
						span: { opacity: 1, lineHeight: "11px" },
					},
				}}
				startAdornment={icons.category}
			>
				<MenuItem value="Launch - 3 Course">Launch - 3 Course</MenuItem>
				<MenuItem value="Dinner - 5 Course">Dinner - 5 Course</MenuItem>
				<MenuItem value="Breakfast Buffet">Breakfast Buffet</MenuItem>
			</Select>

			{/* Guests */}
			<Select
				variant="outlined"
				defaultValue="7"
				label="Guests"
				sx={{
					width: "100px",
					flexGrow: 1,
					maxWidth: { xs: "320px", xl: "unset" },
					gap: 1,
					legend: {
						visibility: "visible",
						zIndex: "99",
						lineHeight: "11px",
						span: { opacity: 1, lineHeight: "11px" },
					},
				}}
				startAdornment={icons.guests}
			>
				<MenuItem value="7">7</MenuItem>
				<MenuItem value="10">10</MenuItem>
				<MenuItem value="15">15</MenuItem>
			</Select>

			{/* Budget */}
			<TextField
				variant="outlined"
				placeholder="$20,000"
				label="Budget"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{icons.budget}
						</InputAdornment>
					),
				}}
				sx={{
					width: "150px",
					flexGrow: 1,
					maxWidth: { xs: "320px", xl: "unset" },
				}}
			/>

			{/* More Options Button */}
			<Button
				variant="outlined"
				color="inherit"
				sx={{
					height: "56px",
					background: "#CCCCCC",
					border: "none",
				}}
			>
				More Options
			</Button>

			{/* Search Button */}
			<Button
				variant="contained"
				color="primary"
				sx={{
					height: "56px",
					border: "none",
				}}
			>
				Search
			</Button>
		</Box>
	);
};

export default SearchOptions;
