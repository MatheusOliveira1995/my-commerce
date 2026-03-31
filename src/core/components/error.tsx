import { ReactElement } from "react";
import {
  Button,
  Stack,
  Typography,
  Paper,
  Container,
  useTheme,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorProps {
  handleRetry: () => void;
}

const Error = (props: ErrorProps): ReactElement => {
  const { handleRetry } = props;
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Stack
        sx={{
          py: { xs: 4, md: 8 },
          minHeight: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            textAlign: "center",
            maxWidth: 500,
            bgcolor: "background.paper",
          }}
        >
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
        </Paper>
      </Stack>
    </Container>
  );
};

export default Error;
