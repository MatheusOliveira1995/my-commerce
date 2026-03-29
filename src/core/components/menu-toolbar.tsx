"use client";
import { MouseEvent, ReactElement, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const TOOLBAR_SX = {
  appBar: {
    position: "static",
    boxShadow: "none",
    bgcolor: "transparent",
    pt: { xs: 0.5, md: 2 },
    pb: { xs: 6, md: 12 },
  },
  toolbar: {
    bgcolor: "background.paper",
    border: "none",
    borderRadius: { xs: 3, md: 999 },
    px: { xs: 1 },
    minHeight: { xs: 64, md: 76 },
    gap: 1,
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    borderRadius: 2,
    p: 0.5,
    width: { xs: 150, md: 210 },
  },
  nav: {
    flexGrow: 1,
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
  },
  menuButton: {
    px: { xs: 1.5, md: 2.5 },
    py: 0.75,
    minWidth: 0,
    color: "primary.main",
    fontWeight: 700,
  },
  rightActions: {
    ml: "auto",
    display: "flex",
    alignItems: "center",
    gap: { xs: 0.25, md: 0.5 },
  },
  desktopOnly: {
    display: { xs: "none", md: "inline-flex" },
  },
  mobileOnly: {
    display: { xs: "inline-flex", md: "none" },
  },
  mobileMenuItem: {
    minWidth: 180,
    color: "text.primary",
    fontWeight: 600,
  },
};

const MenuToolbar = (): ReactElement => {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(menuAnchorElement);

  const handleOpenMobileMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMenuAnchorElement(null);
  };

  return (
    <AppBar sx={TOOLBAR_SX.appBar}>
      <Box maxWidth="xl">
        <Toolbar disableGutters sx={TOOLBAR_SX.toolbar}>
          <Box
            component={Link}
            href="/products/page/1"
            sx={TOOLBAR_SX.logoLink}
          >
            <Image
              src="/my-commerce-logo.svg"
              alt="My commerce"
              width={210}
              height={48}
              priority
              style={{ height: "auto" }}
              sizes="(max-width: 900px) 150px, 210px"
            />
          </Box>

          <Box sx={TOOLBAR_SX.nav}>
            <Button
              component={Link}
              href="/products/page/1"
              sx={TOOLBAR_SX.menuButton}
            >
              Produtos
            </Button>
            <Button component={Link} href="/" sx={TOOLBAR_SX.menuButton}>
              Menu 2
            </Button>
            <Button component={Link} href="/" sx={TOOLBAR_SX.menuButton}>
              Menu 3
            </Button>
          </Box>

          <Box sx={TOOLBAR_SX.rightActions}>
            <IconButton
              aria-label="Conta"
              color="default"
              sx={TOOLBAR_SX.desktopOnly}
            >
              <PersonIcon />
            </IconButton>
            <IconButton aria-label="Carrinho" color="default">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              aria-label="Abrir menu"
              color="default"
              sx={TOOLBAR_SX.mobileOnly}
              onClick={handleOpenMobileMenu}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>

      <Menu
        anchorEl={menuAnchorElement}
        open={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          component={Link}
          href="/products/page/1"
          onClick={handleCloseMobileMenu}
          sx={TOOLBAR_SX.mobileMenuItem}
        >
          Produtos
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default MenuToolbar;
