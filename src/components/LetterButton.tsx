import { Box, Tooltip, Fade, Button, Typography } from "@mui/material";
import { Character } from "../types";
import { BLUE, WHITE } from "./styles";

export interface Props {
    char?: Character;
    onClick: () => void;
}

function LetterButton({ char, onClick }: Props) {
    const character = char ?? { letter: "", roman: "", disabled: false, selected: false };

    return (<Box
    sx={{
      backgroundColor: (character.selected ? BLUE + "1a" : WHITE),
      borderRadius: 1,
      aspectRatio: 1,
      width: "100%",
      minWidth: "20px",
    }}
  >
    <Tooltip
      title={character.disabled ? "Never Used" : character.roman}
      TransitionComponent={Fade}
    >
      <Button
        sx={{ minWidth: 0, width: "100%", height: "100%"
          }}
        disabled={character.disabled}
        onClick={onClick}
      >
        <Typography
          color={character.disabled ? "#CCCCCC" : BLUE}
          sx={{
            fontSize: {
              xs: "8px",
              sm: "12px",
              md: "16px",
              lg: "20px",
            },
          }}
        >
          {character.letter}
        </Typography>
      </Button>
    </Tooltip>
  </Box>
);
}

export default LetterButton;