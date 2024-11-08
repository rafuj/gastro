import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { icons } from "./icons";

export const Navbar = () => {
	return (
		<Box component="header" sx={{ px: { xs: 1, md: 3 }, py: 2 }}>
			<Stack
				justifyContent="space-between"
				alignItems="center"
				direction="row"
			>
				<Box
					sx={{
						width: { xs: "100px", md: "190px" },
					}}
				>
					<Link href="#" style={{ display: "block" }}>
						<img
							src="/img/logo.svg"
							style={{ maxWidth: "100%" }}
							alt=""
						/>
					</Link>
				</Box>
				<Stack
					direction="row"
					sx={{ columnGap: { xs: 1, md: 3 } }}
					alignItems="center"
				>
					<Box
						component="span"
						sx={{
							textTransform: "uppercase",
							pr: { xl: 6 },
							borderRight: { xl: "1px solid #cccccc" },
							fontSize: { xs: "0.75rem", md: "15px" },
							py: { md: "2px" },
						}}
					>
						List your Service
					</Box>
					<Link href="#">{icons.heart}</Link>
					<Link href="#">{icons.user}</Link>
					<Link href="#">{icons.globe}</Link>
				</Stack>
			</Stack>
		</Box>
	);
};
