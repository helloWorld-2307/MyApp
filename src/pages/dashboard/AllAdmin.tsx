import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { getAllUser } from "../../features/auth/authThunks";
import {
  selectUsers,
  selectLoading,
  selectTotal_records,
} from "../../features/auth/authSelectors";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Pagination from "@mui/material/Pagination";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#2E7D32",
  "&:hover": {
    backgroundColor: alpha("#2E7D32", 0.9),
  },
  margin: "0 auto",
  width: "100%",
  maxWidth: 400,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function AllAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);
  const totalRecords = useSelector(selectTotal_records);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedCard, setSelectedCard] = React.useState(0);

  const users = useSelector(selectUsers);

  const [pageNumber, setPageNumber] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const pageSize = 20;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const totalPages = Math.ceil(totalRecords / pageSize);

  const sortedUsers = [...filteredUsers].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name),
  );

  const paginatedUsers = sortedUsers;

  useEffect(() => {
    dispatch(getAllUser({ pageNumber, pageSize }));
  }, [dispatch, pageNumber]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Search */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search users by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filter Arrow Button */}
          <IconButton
            onClick={handleOpenMenu}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
              color: "#fff",
              padding: 0.5,
              transition: "transform 0.2s ease", // smooth rotation
            }}
          >
            <ArrowDropDownIcon />
          </IconButton>
        </Search>

        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem
            onClick={() => {
              setSortOrder("asc");
              handleCloseMenu();
            }}
          >
            From A → Z
          </MenuItem>

          <MenuItem
            onClick={() => {
              setSortOrder("desc");
              handleCloseMenu();
            }}
          >
            From Z → A
          </MenuItem>
        </Menu>
      </Box>

      {/* Content Grow Area */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {loading === "getAllUser" ? (
          <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" height={60} />
          </Stack>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
              gap: 2,
            }}
          >
            {paginatedUsers.map((card, index) => (
              <Card key={card.id}>
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? "" : undefined}
                >
                  <CardContent>
                    <Typography variant="h5" color="success">
                      {card.name}
                    </Typography>
                    <Typography variant="body2">{card.email}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Pagination fixed inside right panel */}
      <Box
        sx={{
          py: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={(_, value) => setPageNumber(value)}
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#2E7D32",
              borderColor: "#2E7D32",
            },
            "& .Mui-selected": {
              backgroundColor: "#2E7D32 !important",
              color: "#fff",
            },
          }}
        />
      </Box>
    </Box>
  );
}
