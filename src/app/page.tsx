import { Box, Button, Grid, Typography } from "@mui/material";
import { GridList } from "@/core/components";
import mock from "./mock.json";

export default function Home() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Testando</Typography>
      <GridList
        data={mock}
        isLoading
        gridContainerProps={{
          container: true,
          spacing: 2,
          direction: "row",
          columns: { xs: 4, sm: 8, md: 12 },
        }}
        gridItemProps={{
          size: { xs: 4, sm: 4, md: 3 },
        }}
        renderItem={(product) => (
          <Typography variant="body2">{product.title}</Typography>
        )}
      />
    </Box>
  );
}
