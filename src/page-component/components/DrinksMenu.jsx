import { icons } from "@/components/icons";
import { Box, Grid, InputAdornment, Stack, TextField } from "@mui/material";
import React from "react";

export const DrinksMenu = () => {
	const [open, setOpen] = React.useState(false);
	const [modalData, setModalData] = React.useState({});

	return (
		<Stack sx={{ mt: 3, minHeight: "calc(100vh - 135px)" }}>
			<Stack
				gap={3}
				sx={{
					input: {
						fontFamily: '"Roboto", sans-serif',
						color: "#000",
					},
					".Mui-disabled": {
						opacity: "0.4",
					},
					"label.Mui-disabled": {
						opacity: "0.5",
					},
				}}
			>
				<Box
					sx={{
						boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)",
						p: 3,
						borderRadius: "4px",
						border: "1px solid rgba(0, 0, 0, 0.1)",
					}}
				>
					<Grid container spacing={3}>
						<Grid item xs={6} sm={12} md={12}>
							<TextField
								fullWidth
								InputLabelProps={{ shrink: true }}
								label="Drink Menu Name"
								placeholder="Soft Drink"
							/>
						</Grid>
						{/* Single Item */}
						<>
							<Grid item xs={6} sm={2} md={2}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Name"
									placeholder="Coca Cola"
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
									}}
								/>
							</Grid>
						</>
						{/* Single Item */}
						<>
							<Grid item xs={6} sm={2} md={2}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Name"
									placeholder="Coca Cola"
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
									}}
								/>
							</Grid>
						</>
						{/* Single Item */}
						<>
							<Grid item xs={6} sm={2} md={2}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Name"
									placeholder="Coca Cola"
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
									}}
								/>
							</Grid>
						</>
						{/* Single Item */}
						<>
							<Grid item xs={6} sm={2} md={2}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Name"
									placeholder="Coca Cola"
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
									disabled
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
									disabled
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
									disabled
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
									}}
								/>
							</Grid>
						</>
					</Grid>
				</Box>
				<Box
					sx={{
						boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)",
						p: 3,
						borderRadius: "4px",
						border: "1px solid rgba(0, 0, 0, 0.1)",
					}}
				>
					<Grid container spacing={3}>
						<Grid item xs={6} sm={12} md={12}>
							<TextField
								fullWidth
								InputLabelProps={{ shrink: true }}
								label="Drink Menu Name"
								placeholder="Soft Drink"
							/>
						</Grid>
						<Grid xs={12}>
							<Box
								style={{
									borderBottom: "1px solid #e5e5e5",
									marginLeft: "24px",
									marginTop: "16px",
								}}
							/>
						</Grid>
						{/* Single Item */}
						<>
							<Grid item xs={6} sm={2} md={2}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Name"
									placeholder="Coca Cola"
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
									}}
								/>
							</Grid>
						</>
						{/* Single Item */}
						<>
							<Grid item xs={6} sm={2} md={2}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Name"
									placeholder="Coca Cola"
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
									}}
								/>
							</Grid>
						</>
					</Grid>
				</Box>
				<Box
					sx={{
						boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)",
						p: 3,
						borderRadius: "4px",
						border: "1px solid rgba(0, 0, 0, 0.1)",
					}}
				>
					<Grid container spacing={3}>
						<Grid item xs={6} sm={12} md={12}>
							<TextField
								fullWidth
								InputLabelProps={{ shrink: true }}
								label="Drink Menu Name"
								placeholder="Soft Drink"
							/>
						</Grid>
						{/* Single Item */}
						<>
							<Grid item xs={6} sm={2} md={2}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Name"
									placeholder="Coca Cola"
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
									}}
								/>
							</Grid>
						</>
						{/* Single Item */}
						<>
							<Grid item xs={6} sm={2} md={2}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Name"
									placeholder="Coca Cola"
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
									}}
								/>
							</Grid>
						</>
						{/* Single Item */}
						<>
							<Grid item xs={6} sm={2} md={2}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Name"
									placeholder="Coca Cola"
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
									}}
								/>
							</Grid>
						</>
					</Grid>
				</Box>
			</Stack>
			<Box sx={{ py: 3, fontWeight: "500", mt: "auto" }}>
				{icons.info} Feed allergies, specific food instrctions or questions
				about the origion of meat: Please contact the restaurant directly at{" "}
				<a href="tel:+41585620030" style={{ color: "#1D9BF0" }}>
					+41585620030
				</a>{" "}
				or add your questions to the remark section.
			</Box>
		</Stack>
	);
};
