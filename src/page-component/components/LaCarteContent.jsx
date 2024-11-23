// LaCarteContent.jsx

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
import React, { useEffect } from "react";
import CartEditModal from "./CartEditModal";
import SelectGroup from "./SelectGroup";

/**
 * LaCarteContent Component
 * Main component handling the cart content, guest counts, and totals.
 */
const LaCarteContent = ({ referanceGuest }) => {
  // State variables
  const [open, setOpen] = React.useState(false);
  const [cartData, setCartData] = React.useState(cartFakeData);
  const [modalData, setModalData] = React.useState({});
  const [total, setTotal] = React.useState(0);

  const [accordionOpenIds, setAccordionOpenIds] = React.useState([
    "course-1",
    "course-2",
    "course-3",
  ]);

  /**
   * useEffect to calculate the overall total whenever cartData changes.
   */
  useEffect(() => {
    let total = 0;

    cartData.forEach((course) => {
      total += course.subTotal || 0;
    });

    setTotal(total);
  }, [cartData]);

  /**
   * Function to calculate the total guest count for a specific course.
   * @param {Object} course - The course object.
   * @returns {number} - Total number of guests for the course.
   */
  const getTotalGuestCountForCourse = (course) => {
    let totalGuestCount = 0;

    course.submenus?.forEach((submenu) => {
      totalGuestCount += submenu.guestCount || 0;

      if (submenu.subdata && submenu.subdata.length > 0) {
        // Sub-dishes inherit guest count from main dish
        // No additional guest count is added here
      }
    });

    return totalGuestCount;
  };

  /**
   * Function to determine if any course has dishes added.
   * @returns {boolean} - True if at least one course has dishes, else false.
   */
  const isAnyCourseHasDishes = () => {
    return cartData.some((course) => course.submenus.length > 0);
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
                <Typography
                  fontSize="16px"
                  fontWeight="500"
                  color="textSecondary"
                  mr={2}
                >
                  {getTotalGuestCountForCourse(item)} / {referanceGuest} Guests
                </Typography>
                <Typography fontSize="20px" fontWeight="600">
                  CHF {item.subTotal.toFixed(2)}
                  <Button
                    type="button"
                    sx={{
                      p: 0,
                      m: 0,
                      minWidth: 0,
                      background: "transparent",
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
                          {/* Optional: Add a title here if needed */}
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            Select Your Dishes
                          </Typography>
                          {submenus.map(
                            (subitem) =>
                              subitem && (
                                <React.Fragment key={subitem.id}>
                                  <Box mb={2}>
                                    <SelectGroup title="Dish">
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
                              lg: "150px",
                            },
                            borderRadius: "5px",
                            textTransform: "uppercase",
                            fontSize: {
                              xs: "12px",
                              lg: "15px",
                            },
                            fontWeight: "700",
                            mr: "177px",
                          }}
                          onClick={() => {
                            if (
                              getTotalGuestCountForCourse(item) >=
                              referanceGuest
                            ) {
                              errorToast(
                                `Cannot add more than ${referanceGuest} guests to this course.`
                              );
                            } else {
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
        <Box sx={{ opacity: "0.3", my: 1 }}>
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
            CHF {total.toFixed(2)}
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
            disabled={!isAnyCourseHasDishes()}
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
        />
      )}
    </>
  );
};

/**
 * CartItem Component
 * Handles individual dish selection, guest count, and deletion.
 * Modified to remove guest count controls for sub-dishes.
 */
export const CartItem = ({
  dishlist,
  cartData,
  setCartData,
  subitem,
  // for subdish
  isSubDishId = false,
  mainList = [],
  courseId,
  referanceGuest,
}) => {
  const [selectedDish, setSelectedDish] = React.useState(null);

  /**
   * Function to calculate the total guest count for a specific course.
   * @param {Object} course - The course object.
   * @returns {number} - Total number of guests for the course.
   */
  const getTotalGuestCountForCourse = (course) => {
    let totalGuestCount = 0;

    course.submenus?.forEach((submenu) => {
      totalGuestCount += submenu.guestCount || 0;

      if (submenu.subdata && submenu.subdata.length > 0) {
        // Sub-dishes inherit guest count from main dish
        // No additional guest count is added here
      }
    });

    return totalGuestCount;
  };

  /**
   * Helper function to recalculate the subTotal for a course.
   * @param {Object} course - The course object.
   * @returns {number} - The recalculated subTotal.
   */
  const recalculateCourseSubTotal = (course) => {
    let courseSubTotal = 0;

    course.submenus.forEach((submenuItem) => {
      const mainDishSubTotal = submenuItem.price * submenuItem.guestCount;

      let subdataSubTotal = 0;
      if (submenuItem.subdata && submenuItem.subdata.length > 0) {
        subdataSubTotal = submenuItem.subdata.reduce((acc, subSubitem) => {
          // Sub-dishes inherit guest count from main dish
          return acc + subSubitem.price * submenuItem.guestCount;
        }, 0);
      }

      courseSubTotal += mainDishSubTotal + subdataSubTotal;
    });

    return courseSubTotal;
  };

  /**
   * Handles incrementing the guest count for a main dish.
   * Note: Sub-dishes' guest counts are automatically handled.
   */
  const handleIncrement = () => {
    const updatedCartData = cartData.map((item) => {
      if (item.id !== courseId) return item; // Only update the relevant course

      let newSubmenus = item.submenus.map((submenuItem) => {
        if (isSubDishId) {
          // Handling sub-dishes
          // No guest count controls for sub-dishes
          return submenuItem;
        } else {
          // Handling main dishes
          if (submenuItem.id === subitem.id) {
            const courseGuestCount = getTotalGuestCountForCourse(item);
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
        }
      });

      // Recalculate course subTotal
      const newSubTotal = recalculateCourseSubTotal({
        ...item,
        submenus: newSubmenus,
      });

      return {
        ...item,
        submenus: newSubmenus,
        subTotal: newSubTotal,
      };
    });

    setCartData(updatedCartData);
  };

  /**
   * Handles decrementing the guest count for a main dish.
   * Note: Sub-dishes' guest counts are automatically handled.
   */
  const handleDecrement = () => {
    const updatedCartData = cartData.map((item) => {
      if (item.id !== courseId) return item; // Only update the relevant course

      let newSubmenus = item.submenus.map((submenuItem) => {
        if (isSubDishId) {
          // Handling sub-dishes
          // No guest count controls for sub-dishes
          return submenuItem;
        } else {
          // Handling main dishes
          if (submenuItem.id === subitem.id) {
            return {
              ...submenuItem,
              guestCount: Math.max(submenuItem.guestCount - 1, 1),
            };
          }
          return submenuItem;
        }
      });

      // Recalculate course subTotal
      const newSubTotal = recalculateCourseSubTotal({
        ...item,
        submenus: newSubmenus,
      });

      return {
        ...item,
        submenus: newSubmenus,
        subTotal: newSubTotal,
      };
    });

    setCartData(updatedCartData);
  };

  /**
   * Handles deleting a dish from the course.
   */
  const handleDelete = () => {
    const updatedCartData = cartData.map((item) => {
      if (item.id !== courseId) return item; // Only update the relevant course

      let newSubmenus;

      if (isSubDishId) {
        // Handle deletion of sub-dishes
        newSubmenus = item.submenus.map((submenuItem) => {
          if (submenuItem.id === isSubDishId) {
            const newSubdata = submenuItem.subdata.filter(
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
        // Handle deletion of main dishes
        newSubmenus = item.submenus.filter(
          (submenuItem) => submenuItem.id !== subitem.id
        );
      }

      // Recalculate course subTotal
      const newSubTotal = recalculateCourseSubTotal({
        ...item,
        submenus: newSubmenus,
      });

      return {
        ...item,
        submenus: newSubmenus,
        subTotal: newSubTotal,
      };
    });
    setCartData(updatedCartData);
  };

  /**
   * Initialize selectedDish based on whether it's a sub-dish or main dish.
   */
  useEffect(() => {
    if (isSubDishId) {
      const selectedArray = mainList.find((item) => item.id === isSubDishId);
      setSelectedDish(
        selectedArray?.subdata?.find((item) => item.id === subitem.id)
      );
    } else {
      setSelectedDish(dishlist.find((item) => item.id === subitem.id));
    }
  }, [isSubDishId, mainList, subitem.id, dishlist]);

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
        {/* Dish Selection Dropdown */}
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
                onChange={(e) => setSelectedDish(e.target.value)}
                variant="outlined"
                sx={{
                  width: "100%",
                  position: "relative",
                  zIndex: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Removes default border
                  },
                  "& .MuiSelect-select": {
                    padding: "10px 14px", // Adjust padding for appearance
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

        {/* Guest Count Controls */}
        {/* Render guest count controls only for main dishes */}
        {!isSubDishId && (
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
        )}

        {/* Price Display */}
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: {
              xs: "16px",
              lg: "18px",
            },
            width: "105px",
          }}
        >
          CHF{" "}
          {isSubDishId
            ? (
                subitem?.price * getMainDishGuestCount(cartData, courseId)
              ).toFixed(2)
            : (subitem?.price * subitem?.guestCount).toFixed(2)}
        </Typography>

        {/* Delete Button */}
        <Button
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
        </Button>
      </Box>

      {/* Sub-Dishes (if any) */}
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
 * Helper function to get the main dish's guest count.
 * @param {Array} cartData - The cart data array.
 * @param {string} courseId - The ID of the course.
 * @returns {number} - The guest count of the main dish.
 */
const getMainDishGuestCount = (cartData, courseId) => {
  const course = cartData.find((item) => item.id === courseId);
  if (!course) return 1;
  const mainDish = course.submenus.find((submenu) => !submenu.isSubDish);
  return mainDish ? mainDish.guestCount : 1;
};

/**
 * SelectOption Component
 * Renders each option in the dropdown menu.
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
 * SelectedOption Component
 * Renders the selected option in the dropdown.
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

/**
 * Initial fake data for the cart.
 */
export const cartFakeData = [
  {
    id: "course-1",
    title: "1 - Course Starter",
    subtitle: "3 Courses",
    submenus: [],
    subTotal: 0,
  },
  {
    id: "course-2",
    title: "2 - Course Main",
    subtitle: "7 Courses",
    submenus: [],
    subTotal: 0,
  },
  {
    id: "course-3",
    title: "3 - Course Dessert",
    subtitle: "2 Courses",
    submenus: [],
    subTotal: 0,
  },
];

/**
 * Dish data for Course 1
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
      guestCount: 1,
    },
    {
      id: "course-1-2",
      dishName: "Caprese Skewers",
      description: "Mozzarella, tomatoes, basil, and balsamic.",
      icon: menuicons.vegetarian,
      tag: "Vegetarian",
      price: 25,
      guestCount: 1,
    },
    {
      id: "course-1-3",
      dishName: "Salmon Crostini",
      description: "Smoked salmon on crostini with cream cheese.",
      icon: menuicons.fish,
      tag: "Fish",
      price: 20,
      guestCount: 1,
    },
    {
      id: "course-1-4",
      dishName: "Shrimp Cocktail",
      description: "Chilled shrimp with zesty sauce.",
      icon: menuicons.fish,
      tag: "Fish",
      price: 20,
      guestCount: 1,
    },
    {
      id: "course-1-5",
      dishName: "Tomato Bruschetta",
      description: "Baguette with tomato and basil.",
      icon: menuicons.meat,
      tag: "Meat",
      price: 22,
      guestCount: 1,
    },
  ],
};

/**
 * Dish data for Course 2
 */
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
      guestCount: 1,
    },
    {
      id: "course-2-3",
      dishName: "Grilled Salmon with Lemon-Dill Sauce",
      description: "Juicy grilled salmon with a zesty lemon-dill sauce.",
      icon: menuicons.fish,
      tag: "Fish",
      price: 33,
      guestCount: 1,
    },
    {
      id: "course-2-4",
      dishName: "Chicken Alfredo Pasta",
      description: "Creamy pasta with tender chicken and Parmesan.",
      icon: menuicons.meat,
      tag: "Meat",
      price: 33,
      guestCount: 1,
      subdata: [
        {
          id: "sub-course-2-4-1",
          dishName: "Fries",
          description: "Fresh homemade fries",
          price: 20,
          // Removed guestCount as it's now inherited
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
      guestCount: 1,
      subdata: [
        {
          id: "sub-course-2-5-1",
          dishName: "Truffle fries",
          description: "Fresh homemade fries with truffle",
          price: 20,
          // Removed guestCount as it's now inherited
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
      guestCount: 1,
    },
  ],
};

/**
 * Dish data for Course 3
 */
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
      guestCount: 1,
    },
  ],
};

export default LaCarteContent;
