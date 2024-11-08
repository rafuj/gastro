import { Navbar } from "@/components/Navbar";
import { icons } from "@/components/icons";
import { Box } from "@mui/material";
import { MainTabSection } from "./components/MainTabSection";

const Homepage = () => {
	return (
		<>
			<Navbar />
			<MainTabSection />
			<Box sx={{ px: 3, py: 3, fontWeight: "500" }}>
				{icons.info} Feed allergies, specific food instrctions or questions
				about the origion of meat: Please contact the restaurant directly at
				<a href="tel:+41585620030" sx={{ color: "#1D9BF0" }}>
					+41585620030
				</a>{" "}
				or add your questions to the remark section.
			</Box>
		</>
	);
};

export default Homepage;
