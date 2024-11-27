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
					".Mui-disabled": {
						opacity: "0.4",
					},
					"label.Mui-disabled": {
						opacity: "0.5",
					},
					".MuiInputAdornment-root .MuiTypography-root": {
						fontFamily: '"Roboto", sans-serif',
						color: "#000",
					},
					".MuiInputBase-root": {
						fontFamily: '"Roboto", sans-serif',
						color: "#000",
						"&.MuiInputBase-readOnly": {
							pointerEvents: "none",
						},
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
								value="Soft Drink"
								InputProps={{
									readOnly: true,
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
									value="Coca Cola"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Light"
									value="Light"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
									value="1"
									sx={{ input: { textAlign: "center" } }}
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
									value="Glass"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="6.00"
									value="6.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
										readOnly: true,
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
									placeholder="Ice Tea"
									value="Ice Tea"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Peach"
									value="Peach"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
									value="1"
									sx={{ input: { textAlign: "center" } }}
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="l"
									value="l"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="5.00"
									value="5.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
										readOnly: true,
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
									placeholder="Orange Juice"
									value="Orange Juice"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Freshly squeezed juice from sun-ripened oranges"
									value="Freshly squeezed juice from sun-ripened oranges"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="250"
									value="250"
									sx={{ input: { textAlign: "center" } }}
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="ml"
									value="ml"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="8.20"
									value="8.20"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
										readOnly: true,
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
									placeholder="Rivella"
									value="Rivella"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									disabled
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									disabled
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									disabled
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="5.00"
									value="5.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
										readOnly: true,
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
								placeholder="Hot Beverages"
								value="Hot Beverages"
								InputProps={{
									readOnly: true,
								}}
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
									placeholder="Espresso"
									value="Espresso"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Aromatic Italian coffee"
									value="Aromatic Italian coffee"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
									value="1"
									sx={{ input: { textAlign: "center" } }}
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Cup"
									value="Cup"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="4.50"
									value="4.50"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
										readOnly: true,
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
									placeholder="Latte Macchiato"
									value="Latte Macchiato"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Espresso with plenty of milk and milk foam"
									value="Espresso with plenty of milk and milk foam"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
									value="1"
									sx={{ input: { textAlign: "center" } }}
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
									value="Glass"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="5.00"
									value="5.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
										readOnly: true,
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
								placeholder="Alcoholic Drinks"
								value="Alcoholic Drinks"
								InputProps={{
									readOnly: true,
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
									placeholder="Beer"
									value="Beer"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Regional draft lager beer"
									value="Regional draft lager beer"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="5"
									value="5"
									sx={{ input: { textAlign: "center" } }}
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="dl"
									value="dl"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="8.00"
									value="8.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
										readOnly: true,
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
									placeholder="White Wine"
									value="White Wine"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Dry white wine from the region"
									value="Dry white wine from the region"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
									value="1"
									sx={{ input: { textAlign: "center" } }}
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
									value="Glass"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="7.00"
									value="7.00"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
										readOnly: true,
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
									placeholder="Red Wine"
									value="Red Wine"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={5} md={5} xl={5.75}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Description"
									placeholder="Full-bodied red wine with fruity notes"
									value="Full-bodied red wine with fruity notes"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.5} md={1.5} xl={1.25}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Quantity"
									placeholder="1"
									value="1"
									sx={{ input: { textAlign: "center" } }}
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Unit of Measurement"
									placeholder="Glass"
									value="Glass"
									InputProps={{
										readOnly: true,
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={1.75} md={1.75} xl={1.5}>
								<TextField
									fullWidth
									InputLabelProps={{ shrink: true }}
									label="Price "
									placeholder="8.20"
									value="8.20"
									InputProps={{
										endAdornment: (
											<InputAdornment>CHF</InputAdornment>
										),
										readOnly: true,
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
