import { ReactElement } from "react";
import { Button, Stack, Typography, Box, useTheme } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorProps {
  handleRetry: () => void;
}

const Error = (props: ErrorProps): ReactElement => {
  const { handleRetry } = props;
  const theme = useTheme();

  return (
    <Stack sx={{ alignItems: "center", justifyContent: "center", py: 3 }}>
      <Box sx={{ textAlign: "center", maxWidth: 500, width: "100%" }}>
        <ErrorOutlineIcon
          sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 2 }}
        />
        <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
          Oops! Algo deu errado
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Desculpe, não foi possível carregar a página. Verifique sua conexão
          com a internet e tente novamente.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": { bgcolor: theme.palette.primary.dark },
          }}
          onClick={() => handleRetry()}
        >
          Tentar Novamente
        </Button>
      </Box>
    </Stack>
  );
};

export default Error;
