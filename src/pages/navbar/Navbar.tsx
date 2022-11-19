import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Logo from "./Logo";
import { Link } from "react-chrome-extension-router";
import Settings from "../settings/Settings";
import Job from "../job/Job";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";

export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#343ac8" }}>
        <Toolbar>
          <IconButton>
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Explorer
          </Typography>
          <Link
            component={Job}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">
              <SearchIcon sx={{ fontSize: 30 }} />
            </Button>
          </Link>
          <Link
            component={Settings}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="inherit">
              <TuneIcon sx={{ fontSize: 30 }} />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
