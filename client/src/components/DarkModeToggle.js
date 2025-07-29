import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useDarkMode } from "../contexts/DarkModeContext";

const DarkModeToggle = ({ sx = {} }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Tooltip
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <IconButton
        onClick={toggleDarkMode}
        color="inherit"
        sx={{
          ...sx,
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
