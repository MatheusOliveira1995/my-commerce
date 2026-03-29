import { ReactElement } from "react";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";

const FOOTER_SX = {
  container: {
    backgroundColor: "#F5A33A",
    display: {
      xs: "none",
      md: "block",
    },
    mt: 10,
    py: 8,
  },
  content: {
    maxWidth: "1200px",
    mx: "auto",
    px: { md: 4, lg: 6 },
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    pb: 2.5,
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    px: 1,
    py: 0.5,
  },
  socialRow: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },

  iconButton: {
    color: "#2C3035",
    p: 1,
    "&:hover": {
      bgcolor: "rgba(44,48,53,0.08)",
    },
  },
  divider: {
    borderColor: "rgba(152, 84, 20, 0.45)",
  },
  bottomRow: {
    pt: 3,
    display: "flex",
    alignItems: "center",
    gap: 1,
    fontSize: "0.85rem",
  },
  terms: {
    fontWeight: 600,
  },
};

const PageFooter = (): ReactElement => {
  return (
    <Box sx={FOOTER_SX.container}>
      <Box sx={FOOTER_SX.content}>
        <Stack gap={3}>
          <Box sx={FOOTER_SX.topRow}>
            <Box sx={FOOTER_SX.logoBox}>
              <Image
                src="/my-commerce-logo.svg"
                alt="My commerce"
                width={196}
                height={44}
                priority
                style={{ height: "auto" }}
              />
            </Box>
            <Box sx={FOOTER_SX.socialRow}>
              <Typography variant="h5">
                Acompanhe nossas redes sociais:
              </Typography>
              <IconButton aria-label="YouTube" sx={FOOTER_SX.iconButton}>
                <YouTubeIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="X" sx={FOOTER_SX.iconButton}>
                <XIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="Facebook" sx={FOOTER_SX.iconButton}>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="Instagram" sx={FOOTER_SX.iconButton}>
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Divider sx={FOOTER_SX.divider} />
          <Box sx={FOOTER_SX.bottomRow}>
            <Typography component="span" variant="body2" sx={FOOTER_SX.terms}>
              2026 My commerce
            </Typography>
            <Typography component="span" variant="body2">
              •
            </Typography>
            <Typography component="span" variant="body2" sx={FOOTER_SX.terms}>
              Política de Privacidade
            </Typography>
            <Typography component="span" variant="body2">
              •
            </Typography>
            <Typography component="span" variant="body2" sx={FOOTER_SX.terms}>
              Termos de Uso
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default PageFooter;
