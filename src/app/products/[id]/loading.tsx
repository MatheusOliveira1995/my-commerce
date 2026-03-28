import { Box, Container, Paper, Skeleton, Stack } from "@mui/material";

const INFO_CARDS = Array.from({ length: 8 });
const HISTORY_LINES = ["95%", "100%", "98%", "96%", "92%", "90%"];

export default function LoadingProductDetail() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Stack spacing={{ xs: 2, md: 3 }}>
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: "100%",
            height: { xs: 190, sm: 240, md: 300 },
            borderRadius: 2,
          }}
        />

        <Paper
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
          }}
        >
          <Stack spacing={{ xs: 2, md: 3 }}>
            <Skeleton variant="text" width="45%" height={44} animation="wave" />
            <Skeleton variant="text" width={110} height={24} animation="wave" />

            <Box
              sx={{
                display: "grid",
                gap: 1.2,
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(4, minmax(0, 1fr))",
                },
              }}
            >
              {INFO_CARDS.map((_, index) => (
                <Skeleton
                  key={`info-${index}`}
                  variant="rounded"
                  animation="wave"
                  sx={{
                    width: "100%",
                    height: 72,
                    borderRadius: 1.5,
                  }}
                />
              ))}
            </Box>

            <Skeleton variant="text" width="38%" height={36} animation="wave" />

            <Stack spacing={1}>
              {HISTORY_LINES.map((width, index) => (
                <Skeleton
                  key={`line-${index}`}
                  variant="text"
                  animation="wave"
                  width={width}
                  height={22}
                />
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
