// NewStandardMenu.jsx

import { icons } from "@/components/icons";
import { menuicons } from "@/components/menuicons";
import { errorToast } from "@/utls/toasts";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  Collapse,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CartEditModal from "./CartEditModal";
import SelectGroup from "./SelectGroup";

// Define availability ranges and price per guest for each menu
const WEDDING_RANGE = { min: 10, max: 15, pricePerGuest: 50 };
const BIRTHDAY_RANGE = { min: 15, max: 20, pricePerGuest: 60 };
const SCHOOL_PARTY_RANGE = { min: 20, max: 100, pricePerGuest: 70 };

/**
 * Helper to determine effective guest count for pricing:
 * If referanceGuest is out of range, we use the minimum of that range.
 */
function getEffectiveGuestCount(referanceGuest, menuRange) {
  if (referanceGuest < menuRange.min) return menuRange.min;
  if (referanceGuest > menuRange.max) return menuRange.min;
  return referanceGuest;
}

/**
 * Initial cart data with at least one original dish per course.
 * Marking them as isOriginal: true so they cannot be deleted.
 */
export const cartFakeData = [
  {
    id: "course-1",
    title: "1 - Course",
    subtitle: "3 Courses",
    submenus: [
      {
        id: "course-1-1",
        dishName: "Stuffed Mushrooms",
        description: "Garlic-herb stuffed mushrooms with crispy topping.",
        icon: menuicons.vegetarian,
        tag: "Vegetarian",
        price: 25,
        guestCount: 1,
        isOriginal: true,
      },
    ],
    subTotal: 0,
  },
  {
    id: "course-2",
    title: "2 - Course",
    subtitle: "7 Courses",
    submenus: [
      {
        id: "course-2-2",
        dishName: "Vegetable Stir-Fry with Tofu",
        description: "Colorful vegetables and tofu in a savory sauce.",
        icon: menuicons.vegetarian,
        tag: "Vegetarian",
        price: 33,
        guestCount: 1,
        isOriginal: true,
      },
    ],
    subTotal: 0,
  },
  {
    id: "course-3",
    title: "3 - Course",
    subtitle: "2 Courses",
    submenus: [
      {
        id: "sub-wedding-2-1",
        dishName: "Lava cake",
        description: "Chocolate with ice cream",
        icon: menuicons.vegetarian,
        tag: "Vegetarian",
        price: 25,
        guestCount: 1,
        isOriginal: true,
      },
    ],
    subTotal: 0,
  },
];

/**
 * Dishes available for selection (original menu options).
 * These represent possible alternatives or additional dishes the user can add.
 * Newly added dishes should be marked isOriginal: false in CartEditModal.
 */
const dish1 = {
  id: "course-1",
  title: "1 - Course",
  selectedMenu: "course-1-1",
  icon: menuicons.meat,
  dishList: [
    {
      id: "course-1-1",
      dishName: "Stuffed Mushrooms",
      description: "Garlic-herb stuffed mushrooms with crispy topping.",
      icon: menuicons.vegetarian,
      tag: "Vegetarian",
      price: 25,
    },
    {
      id: "course-1-2",
      dishName: "Caprese Skewers",
      description: "Mozzarella, tomatoes, basil, and balsamic.",
      icon: menuicons.vegetarian,
      tag: "Vegetarian",
      price: 25,
    },
    {
      id: "course-1-3",
      dishName: "Salmon Crostini",
      description: "Smoked salmon on crostini with cream cheese.",
      icon: menuicons.fish,
      tag: "Fish",
      price: 20,
    },
    {
      id: "course-1-4",
      dishName: "Shrimp Cocktail",
      description: "Chilled shrimp with zesty sauce.",
      icon: menuicons.fish,
      tag: "Fish",
      price: 20,
    },
    {
      id: "course-1-5",
      dishName: "Tomato Bruschetta",
      description: "Baguette with tomato and basil.",
      icon: menuicons.meat,
      tag: "Meat",
      price: 22,
    },
  ],
};

const dish2 = {
  id: "course-2",
  title: "2 - Course",
  selectedMenu: "course-2-3",
  dishList: [
    {
      id: "course-2-2",
      dishName: "Vegetable Stir-Fry with Tofu",
      description: "Colorful vegetables and tofu in a savory sauce.",
      icon: menuicons.vegetarian,
      tag: "Vegetarian",
      price: 33,
    },
    {
      id: "course-2-3",
      dishName: "Grilled Salmon with Lemon-Dill Sauce",
      description: "Juicy grilled salmon with a zesty lemon-dill sauce.",
      icon: menuicons.fish,
      tag: "Fish",
      price: 33,
    },
    {
      id: "course-2-4",
      dishName: "Chicken Alfredo Pasta",
      description: "Creamy pasta with tender chicken and Parmesan.",
      icon: menuicons.meat,
      tag: "Meat",
      price: 33,
      subdata: [
        {
          id: "sub-course-2-4-1",
          dishName: "Fries",
          description: "Fresh homemade fries",
          price: 20,
        },
      ],
    },
    {
      id: "course-2-5",
      dishName: "Stuffed Bell Peppers",
      description: "Bell peppers filled with rice, beans, and vegetables.",
      icon: menuicons.vegetarian,
      tag: "Vegetarian",
      price: 33,
      subdata: [
        {
          id: "sub-course-2-5-1",
          dishName: "Truffle fries",
          description: "Fresh homemade fries with truffle",
          price: 20,
        },
      ],
    },
    {
      id: "course-2-6",
      dishName: "Spaghetti Bolognese",
      description: "Classic spaghetti with rich tomato-meat sauce.",
      icon: menuicons.meat,
      tag: "Meat",
      kidsIcon: menuicons.kids,
      price: 25.5,
    },
  ],
};

const dish3 = {
  id: "course-3",
  title: "3 - Course",
  selectedMenu: "sub-wedding-2-1",
  dishList: [
    {
      id: "sub-wedding-2-1",
      dishName: "Lava cake",
      description: "Chocolate with ice cream",
      icon: menuicons.vegetarian,
      tag: "Vegetarian",
      price: 25,
    },
  ],
};

/**
 * Utility to check if all courses in a given cartData match the referanceGuest count.
 */
function allCoursesMatchGuestCount(cartData, referanceGuest) {
  return cartData.every((course) => {
    const totalGuestInCourse = course.submenus.reduce(
      (acc, submenu) => acc + (submenu.guestCount || 0),
      0
    );
    return totalGuestInCourse === referanceGuest;
  });
}

const NewStandardMenu = ({ referanceGuest }) => {
  const [openMenu, setOpenMenu] = useState([]);

  const [weddingCartData, setWeddingCartData] = useState(cartFakeData);
  const [birthdayCartData, setBirthdayCartData] = useState(cartFakeData);
  const [schoolPartyCartData, setSchoolPartyCartData] = useState(cartFakeData);

  // Effective guest counts based on range
  const weddingEffectiveGuests = getEffectiveGuestCount(
    referanceGuest,
    WEDDING_RANGE
  );
  const birthdayEffectiveGuests = getEffectiveGuestCount(
    referanceGuest,
    BIRTHDAY_RANGE
  );
  const schoolPartyEffectiveGuests = getEffectiveGuestCount(
    referanceGuest,
    SCHOOL_PARTY_RANGE
  );

  // Calculate totals based on effective guests
  const weddingTotal = weddingEffectiveGuests * WEDDING_RANGE.pricePerGuest;
  const birthdayTotal = birthdayEffectiveGuests * BIRTHDAY_RANGE.pricePerGuest;
  const schoolPartyTotal =
    schoolPartyEffectiveGuests * SCHOOL_PARTY_RANGE.pricePerGuest;

  // Check if referanceGuest is in range for each menu
  const isWeddingInRange =
    referanceGuest >= WEDDING_RANGE.min && referanceGuest <= WEDDING_RANGE.max;
  const isBirthdayInRange =
    referanceGuest >= BIRTHDAY_RANGE.min &&
    referanceGuest <= BIRTHDAY_RANGE.max;
  const isSchoolPartyInRange =
    referanceGuest >= SCHOOL_PARTY_RANGE.min &&
    referanceGuest <= SCHOOL_PARTY_RANGE.max;

  const matchWeddingGuests = allCoursesMatchGuestCount(
    weddingCartData,
    referanceGuest
  );
  const matchBirthdayGuests = allCoursesMatchGuestCount(
    birthdayCartData,
    referanceGuest
  );
  const matchSchoolPartyGuests = allCoursesMatchGuestCount(
    schoolPartyCartData,
    referanceGuest
  );

  // Determine which menus are open and if conditions to request menu are met
  const canRequestMenu =
    openMenu.length > 0 &&
    openMenu.every((menu) => {
      if (menu === "wedding") return isWeddingInRange && matchWeddingGuests;
      if (menu === "birthday") return isBirthdayInRange && matchBirthdayGuests;
      if (menu === "school-party")
        return isSchoolPartyInRange && matchSchoolPartyGuests;
      return false;
    });

  // Overall total (sum of all displayed menu totals)
  const overallTotal =
    (openMenu.includes("wedding") ? weddingTotal : 0) +
    (openMenu.includes("birthday") ? birthdayTotal : 0) +
    (openMenu.includes("school-party") ? schoolPartyTotal : 0);

  return (
    <Stack sx={{ minHeight: "calc(100vh - 135px)", pt: 4 }}>
      {/* Wedding Menu */}
      <Card
        sx={{
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          p: 2,
          mb: 2,
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Box
            sx={{
              minWidth: "1050px",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "600",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              columnGap={{ xs: 2, xl: 3 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                  width: { xs: "80px", md: "100px" },
                  fontWeight: "600",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                Wedding
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "90px",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                {icons.coursesCountIcon}3 Courses
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "120px",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                {icons.availableGuestsIcon}
                <Box
                  width={0}
                  flexGrow={1}
                  sx={{
                    opacity: isWeddingInRange ? 1 : 0.3,
                  }}
                >
                  Available for {WEDDING_RANGE.min}-{WEDDING_RANGE.max} Guests
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "120px",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                {icons.pricePerGuestIcon}
                <Box width={0} flexGrow={1}>
                  Price per Guest: {WEDDING_RANGE.pricePerGuest} CHF
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "120px",
                  flexGrow: 1,
                }}
              >
                {icons.vegIcon}
                <Box width={0} flexGrow={1}>
                  Vegetarian, Meat
                </Box>
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: "600",
                  width: { xs: "140px", md: "160px" },
                  justifyContent: "flex-end",
                }}
              >
                CHF {weddingTotal.toFixed(2)}
                <Button
                  type="button"
                  sx={{
                    p: 0,
                    m: 0,
                    minWidth: 0,
                    background: "transparent",
                  }}
                  onClick={() =>
                    setOpenMenu((prev) =>
                      prev.includes("wedding")
                        ? prev.filter((itemId) => itemId !== "wedding")
                        : [...prev, "wedding"]
                    )
                  }
                >
                  {openMenu.includes("wedding")
                    ? menuicons.caretUp
                    : menuicons.caretDown}
                </Button>
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Collapse in={openMenu.includes("wedding")}>
          <StandardMenu
            referanceGuest={referanceGuest}
            cartData={weddingCartData}
            setCartData={setWeddingCartData}
          />
        </Collapse>
      </Card>

      {/* Birthday Menu */}
      <Card
        sx={{
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          p: 2,
          mb: 2,
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Box
            sx={{
              minWidth: "1050px",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "600",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              columnGap={{ xs: 2, xl: 3 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                  width: { xs: "80px", md: "100px" },
                  fontWeight: "600",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                Birthday
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "90px",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                {icons.coursesCountIcon}5 Courses
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "120px",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                {icons.availableGuestsIcon}
                <Box
                  width={0}
                  flexGrow={1}
                  sx={{
                    opacity: isBirthdayInRange ? 1 : 0.3,
                  }}
                >
                  Available for {BIRTHDAY_RANGE.min}-{BIRTHDAY_RANGE.max} Guests
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "120px",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                {icons.pricePerGuestIcon}
                <Box width={0} flexGrow={1}>
                  Price per Guest: {BIRTHDAY_RANGE.pricePerGuest} CHF
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "120px",
                  flexGrow: 1,
                }}
              >
                {icons.vegIcon}
                <Box width={0} flexGrow={1}>
                  Vegetarian, Meat, Fish
                </Box>
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: "600",
                  width: { xs: "140px", md: "160px" },
                  justifyContent: "flex-end",
                }}
              >
                CHF {birthdayTotal.toFixed(2)}
                <Button
                  type="button"
                  sx={{
                    p: 0,
                    m: 0,
                    minWidth: 0,
                    background: "transparent",
                  }}
                  onClick={() =>
                    setOpenMenu((prev) =>
                      prev.includes("birthday")
                        ? prev.filter((itemId) => itemId !== "birthday")
                        : [...prev, "birthday"]
                    )
                  }
                >
                  {openMenu.includes("birthday")
                    ? menuicons.caretUp
                    : menuicons.caretDown}
                </Button>
              </Typography>
            </Stack>
            <Collapse in={openMenu.includes("birthday")}>
              <StandardMenu
                referanceGuest={referanceGuest}
                cartData={birthdayCartData}
                setCartData={setBirthdayCartData}
              />
            </Collapse>
          </Box>
        </Box>
      </Card>

      {/* School Party Menu */}
      <Card
        sx={{
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          p: 2,
          mb: 2,
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Box
            sx={{
              minWidth: "1050px",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "600",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              columnGap={{ xs: 2, xl: 3 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                  width: { xs: "80px", md: "100px" },
                  fontWeight: "600",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                School Party
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "90px",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                {icons.coursesCountIcon}7 Courses
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "120px",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                {icons.availableGuestsIcon}
                <Box
                  width={0}
                  flexGrow={1}
                  sx={{
                    opacity: isSchoolPartyInRange ? 1 : 0.3,
                  }}
                >
                  Available for {SCHOOL_PARTY_RANGE.min}-
                  {SCHOOL_PARTY_RANGE.max} Guests
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "120px",
                  flexGrow: 1,
                  borderRight: "1px solid #cccccc",
                }}
              >
                {icons.pricePerGuestIcon}
                <Box width={0} flexGrow={1}>
                  Price per Guest: {SCHOOL_PARTY_RANGE.pricePerGuest} CHF
                </Box>
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={1}
                sx={{
                  width: "120px",
                  flexGrow: 1,
                }}
              >
                {icons.vegIcon}
                <Box width={0} flexGrow={1}>
                  Vegetarian
                </Box>
              </Stack>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "16px", sm: "20px" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: "600",
                  width: { xs: "140px", md: "160px" },
                  justifyContent: "flex-end",
                }}
              >
                CHF {schoolPartyTotal.toFixed(2)}
                <Button
                  type="button"
                  sx={{
                    p: 0,
                    m: 0,
                    minWidth: 0,
                    background: "transparent",
                  }}
                  onClick={() =>
                    setOpenMenu((prev) =>
                      prev.includes("school-party")
                        ? prev.filter((itemId) => itemId !== "school-party")
                        : [...prev, "school-party"]
                    )
                  }
                >
                  {openMenu.includes("school-party")
                    ? menuicons.caretUp
                    : menuicons.caretDown}
                </Button>
              </Typography>
            </Stack>
            <Collapse in={openMenu.includes("school-party")}>
              <StandardMenu
                referanceGuest={referanceGuest}
                cartData={schoolPartyCartData}
                setCartData={setSchoolPartyCartData}
              />
            </Collapse>
          </Box>
        </Box>
      </Card>

      <>
        <Box sx={{ opacity: "0.3", my: 1, mt: "auto" }}>
          <hr />
        </Box>
        <Stack flexDirection={"row"} alignItems="center">
          <Typography fontSize="20px" fontWeight="600" marginRight="auto">
            Subtotal
          </Typography>
          <Typography
            fontSize="20px"
            fontWeight="500"
            sx={{
              mr: { xs: 0, md: 2, lg: 7 },
            }}
          >
            {referanceGuest} Guests
          </Typography>
          <Typography fontSize="20px" fontWeight="600">
            CHF {overallTotal.toFixed(2)}
          </Typography>
        </Stack>
        <Box sx={{ opacity: "0.3", my: 1 }}>
          <hr />
        </Box>
        <TextField
          variant="outlined"
          placeholder="Add remarks here..."
          label="Add Remarks"
          sx={{
            width: "100%",
          }}
        />
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems={"center"}
          flexWrap={"wrap-reverse"}
          sx={{
            py: 3,
            rowGap: 2,
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            gap="6px"
            sx={{
              fontWeight: "500",
              width: { xs: "100%", sm: "0" },
              maxWidth: "771px",
              flexGrow: "1",
            }}
          >
            {icons.info}{" "}
            <Box sx={{ width: "0", flexGrow: "1" }}>
              For allergies, specific food instructions, or questions about the
              origin of meat: Please contact the restaurant directly at{" "}
              <a href="tel:+41585620030" style={{ color: "#1D9BF0" }}>
                +41585620030
              </a>{" "}
              or add your questions to the remark section.
            </Box>
          </Stack>
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={!canRequestMenu}
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              textTransform: "uppercase",
              height: "44px",
              ml: "auto",
            }}
          >
            Request Menu
          </Button>
        </Stack>
      </>
    </Stack>
  );
};

/**
 * StandardMenu Component
 * Handles the cart display for each course in the selected menu.
 * Note: Pricing no longer depends on dish changes, so we skip recalculating totals here.
 */
const StandardMenu = ({ referanceGuest, cartData, setCartData }) => {
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const [accordionOpenIds, setAccordionOpenIds] = React.useState(
    cartData.map((course) => course.id)
  );

  /**
   * Function to get total guests for a course.
   */
  const getTotalGuestCountForCourse = (course) => {
    let totalGuestCount = 0;
    course.submenus?.forEach((submenu) => {
      totalGuestCount += submenu.guestCount || 0;
    });
    return totalGuestCount;
  };

  return (
    <>
      <Stack gap={1} mt={3}>
        {cartData.map((item, index) => {
          const { id, submenus, title } = item;
          const dishData = index === 0 ? dish1 : index === 1 ? dish2 : dish3;
          const { dishList } = dishData;

          return (
            <Card
              key={id}
              sx={{
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                p: 2,
                mb: 2,
              }}
            >
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize="20px" fontWeight="600" mr="auto">
                  {title}
                </Typography>
                <Typography fontSize="16px" fontWeight="600" color="primary">
                  {getTotalGuestCountForCourse(item)} / {referanceGuest} Guests
                  <Button
                    type="button"
                    sx={{
                      p: 0,
                      m: 0,
                      minWidth: 0,
                      background: "transparent",
                      ml: "34px",
                    }}
                    onClick={() =>
                      setAccordionOpenIds((prev) =>
                        prev.includes(id)
                          ? prev.filter((itemId) => itemId !== id)
                          : [...prev, id]
                      )
                    }
                  >
                    {accordionOpenIds.includes(id)
                      ? menuicons.caretUp
                      : menuicons.caretDown}
                  </Button>
                </Typography>
              </Stack>
              <Box sx={{ overflowX: "auto" }}>
                <Box minWidth={"700px"}>
                  <Collapse in={accordionOpenIds.includes(id)}>
                    <Box>
                      {submenus?.length > 0 && (
                        <Box>
                          {submenus.map(
                            (subitem) =>
                              subitem && (
                                <React.Fragment key={subitem.id}>
                                  <Box mb={2}>
                                    <SelectGroup
                                      title={
                                        subitem.subdata ? "Side Dish" : "Dish"
                                      }
                                    >
                                      <CartItem
                                        dishlist={dishList}
                                        cartData={cartData}
                                        setCartData={setCartData}
                                        subitem={subitem}
                                        courseId={item.id}
                                        referanceGuest={referanceGuest}
                                      />
                                    </SelectGroup>
                                  </Box>
                                </React.Fragment>
                              )
                          )}
                        </Box>
                      )}
                      <Stack flexDirection={"row"} justifyContent={"flex-end"}>
                        <ButtonBase
                          variant="contained"
                          sx={{
                            background: "#8211011A",
                            color: "#821101",
                            height: "42px",
                            width: {
                              xs: "120px",
                              lg: "147px",
                            },
                            borderRadius: "5px",
                            textTransform: "uppercase",
                            fontSize: {
                              xs: "12px",
                              lg: "15px",
                            },
                            fontWeight: "600",
                            mr: "57px",
                          }}
                          onClick={() => {
                            // Ensure we do not exceed referanceGuest if adding more dishes
                            const courseGuestCount =
                              getTotalGuestCountForCourse(item);
                            if (courseGuestCount >= referanceGuest) {
                              errorToast(
                                `Cannot add more than ${referanceGuest} guests to this course.`
                              );
                            } else {
                              // Set modal data to add a new dish (isOriginal: false)
                              setModalData({
                                ...dishData,
                                courseId: item.id,
                              });
                              setOpen(true);
                            }
                          }}
                        >
                          {icons.increment2} Add Meal
                        </ButtonBase>
                      </Stack>
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            </Card>
          );
        })}
      </Stack>
      {open && (
        <CartEditModal
          {...{
            setCartData,
            cartData,
            modalData,
            setOpen,
            open,
            referanceGuest,
          }}
          // Ensure that any newly added dish in CartEditModal is marked isOriginal: false
        />
      )}
    </>
  );
};

/**
 * CartItem Component
 * Handles dish selection, guest count, and deletion logic.
 */
export const CartItem = ({
  dishlist,
  cartData,
  setCartData,
  subitem,
  isSubDishId = false,
  mainList = [],
  courseId,
  referanceGuest,
}) => {
  const [selectedDish, setSelectedDish] = React.useState(null);

  useEffect(() => {
    if (isSubDishId) {
      const selectedArray = mainList.find((it) => it.id === isSubDishId);
      setSelectedDish(
        selectedArray?.subdata?.find((it) => it.id === subitem.id) || null
      );
    } else {
      setSelectedDish(dishlist.find((it) => it.id === subitem.id) || null);
    }
  }, [isSubDishId, subitem.id, dishlist, mainList]);

  const handleIncrement = () => {
    const updatedCartData = cartData.map((item) => {
      if (item.id !== courseId) return item;
      let newSubmenus = item.submenus.map((submenuItem) => {
        if (submenuItem.id === subitem.id && !isSubDishId) {
          // Check if we can increment without exceeding referanceGuest
          const courseGuestCount = item.submenus.reduce(
            (acc, si) => acc + (si.guestCount || 0),
            0
          );
          if (courseGuestCount >= referanceGuest) {
            errorToast(
              `Cannot have more than ${referanceGuest} guests in this course.`
            );
            return submenuItem;
          }
          return {
            ...submenuItem,
            guestCount: submenuItem.guestCount + 1,
          };
        }
        return submenuItem;
      });
      return {
        ...item,
        submenus: newSubmenus,
      };
    });

    setCartData(updatedCartData);
  };

  const handleDecrement = () => {
    const updatedCartData = cartData.map((item) => {
      if (item.id !== courseId) return item;
      let newSubmenus = item.submenus.map((submenuItem) => {
        if (submenuItem.id === subitem.id && !isSubDishId) {
          return {
            ...submenuItem,
            guestCount: Math.max(submenuItem.guestCount - 1, 1),
          };
        }
        return submenuItem;
      });
      return {
        ...item,
        submenus: newSubmenus,
      };
    });
    setCartData(updatedCartData);
  };

  /*   const handleDelete = () => {
    // Only allow deletion if subitem.isOriginal is false
    if (subitem.isOriginal) {
      errorToast("You cannot delete a standard dish.");
      return;
    }
    const updatedCartData = cartData.map((item) => {
      if (item.id !== courseId) return item;

      let newSubmenus;
      if (isSubDishId) {
        // Deleting a sub-dish
        newSubmenus = item.submenus.map((submenuItem) => {
          if (submenuItem.id === isSubDishId) {
            const newSubdata = (submenuItem.subdata || []).filter(
              (subSubitem) => subSubitem.id !== subitem.id
            );
            return {
              ...submenuItem,
              subdata: newSubdata,
            };
          }
          return submenuItem;
        });
      } else {
        // Deleting a main dish
        newSubmenus = item.submenus.filter(
          (submenuItem) => submenuItem.id !== subitem.id
        );
      }

      return {
        ...item,
        submenus: newSubmenus,
      };
    });
    setCartData(updatedCartData);
  }; */

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginY: 1,
          gap: 2,
        }}
      >
        <Card variant="outlined" sx={{ width: "0", padding: 0, flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ width: "200px", flexGrow: 1 }}>
              <Select
                value={selectedDish || ""}
                onChange={(e) => {
                  setSelectedDish(e.target.value);
                  // You can update the dish in cartData as well if needed
                  const updatedCartData = cartData.map((course) => {
                    if (course.id !== courseId) return course;
                    const newSubmenus = course.submenus.map((s) => {
                      if (s.id === subitem.id) {
                        return {
                          ...s,
                          ...e.target.value,
                          // Keep guestCount and isOriginal status
                          guestCount: s.guestCount,
                          isOriginal: s.isOriginal,
                        };
                      }
                      return s;
                    });
                    return { ...course, submenus: newSubmenus };
                  });
                  setCartData(updatedCartData);
                }}
                variant="outlined"
                sx={{
                  width: "100%",
                  position: "relative",
                  zIndex: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                  },
                }}
                displayEmpty
                renderValue={(selected) =>
                  selected ? (
                    <SelectedOption selected={selected} />
                  ) : (
                    <Typography color="textSecondary">Select a dish</Typography>
                  )
                }
              >
                {dishlist?.map((item) => (
                  <MenuItem key={item.dishName} value={item}>
                    <SelectOption item={item} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Card>

        {!isSubDishId ? (
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "4px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: {
                xs: "120px",
                lg: "150px",
              },
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
                background: "#ffffff",
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
              <IconButton
                size="small"
                onClick={subitem?.guestCount > 1 ? handleDecrement : null}
              >
                {icons?.decrement}
              </IconButton>
              <Typography variant="h6">{subitem?.guestCount}</Typography>
              <IconButton size="small" onClick={handleIncrement}>
                {icons?.increment}
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: {
                xs: "120px",
                lg: "150px",
              },
            }}
          />
        )}

        {/* <Button
          type="button"
          sx={{
            border: "none",
            outline: "none",
            minWidth: "0",
            background: "transparent",
          }}
          onClick={handleDelete}
        >
          {menuicons.trash}
        </Button> */}
      </Box>

      {subitem?.subdata?.length > 0 &&
        subitem.subdata.map((subSubmenu) => (
          <Box
            sx={{
              ml: {
                xs: 2,
                md: 4,
              },
              mt: 2,
              mb: 2,
              position: "relative",
            }}
            key={subSubmenu.id}
          >
            <SelectGroup title="Side Dish">
              <CartItem
                dishlist={subSubmenu.dishList}
                cartData={cartData}
                setCartData={setCartData}
                subitem={subSubmenu}
                isSubDishId={subitem.id}
                mainList={dishlist}
                courseId={courseId}
                referanceGuest={referanceGuest}
              />
            </SelectGroup>
          </Box>
        ))}
    </>
  );
};

/**
 * SelectOption Component for dropdown items
 */
const SelectOption = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography fontWeight="700" mr={1}>
        {item.dishName}
      </Typography>
      <Typography>{item.description}</Typography>
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          alignItems: "center",
          mr: 1,
        }}
      >
        {item.icon}
        <Typography variant="body2" color="textSecondary" ml={1}>
          {item.tag}
        </Typography>
      </Box>
    </Box>
  );
};

/**
 * SelectedOption Component for the selected dish in the dropdown
 */
const SelectedOption = ({ selected }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography fontWeight="700" mr={0.4}>
        {selected.dishName}
      </Typography>
      <Typography flexGrow={1} width="0">
        <Box
          sx={{
            display: "-webkit-flex",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            mr: 1,
          }}
        >
          {selected.description}
        </Box>
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mr: 1,
        }}
      >
        {selected.icon}
      </Box>
      <Typography variant="body2" color="textSecondary">
        {selected.tag}
      </Typography>
    </Box>
  );
};

export default NewStandardMenu;
