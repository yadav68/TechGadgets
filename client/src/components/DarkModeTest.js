import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import DarkModeToggle from "../components/DarkModeToggle";
import { useDarkMode } from "../contexts/DarkModeContext";

const DarkModeTest = () => {
  const { isDarkMode, mode } = useDarkMode();

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Card sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Dark Mode Test
          </Typography>

          <Typography variant="body1" paragraph>
            Current mode: <strong>{mode}</strong>
          </Typography>

          <Typography variant="body1" paragraph>
            Dark mode active: <strong>{isDarkMode ? "Yes" : "No"}</strong>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
            <Typography variant="body1">Toggle Dark Mode:</Typography>
            <DarkModeToggle />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              This card should change appearance when you toggle dark mode. The
              background, text colors, and component styling should all adapt
              automatically.
            </Typography>
          </Box>

          <Button variant="contained" sx={{ mt: 2 }}>
            Sample Button
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DarkModeTest;
