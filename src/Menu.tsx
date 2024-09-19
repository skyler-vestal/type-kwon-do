import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ColoredContainer } from "./components/styles";

type Settings = {
  rounds: number;
};

type Props = {
  letters: string[][];
};

const getGrid = (letters: string[][]) =>
  letters.map((row) => row.map((char) => ({ letter: char, enabled: true })));

function Menu({ letters }: Props) {
  const [settings, setSettings] = useState<Settings>({
    rounds: 5,
  });

  const [charactersOpen, setCharactersOpen] = useState(false);
  const [grid, _] = useState(getGrid(letters));

  return (
    <>
      <Modal open={charactersOpen} onClose={() => setCharactersOpen(false)}>
        <ColoredContainer
          style={{
            width: '45%',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Grid container style={{ width: "100%", height: "100%" }}>
            {grid.map((row) => (
              <Grid
                container
                wrap="nowrap"
                sx={{
                  width: "100%",
                  "--Grid-borderWidth": "1px",
                  borderTop: "var(--Grid-borderWidth) solid",
                  borderLeft: "var(--Grid-borderWidth) solid",
                  borderColor: "divider",
                  "& > div": {
                    borderRight: "var(--Grid-borderWidth) solid",
                    borderBottom: "var(--Grid-borderWidth) solid",
                    borderColor: "divider",
                    margin: "0 -1px -1px 0",
                  },
                }}
              >
                {row.map((char) => (
                  <Box
                    sx={{
                      borderRadius: 1,
                      aspectRatio: 1,
                      width: "100%",
                      minWidth: "20px",
                    }}
                  >
                    <Button sx={{ minWidth: 0, width: "100%", height: "100%" }}>
                        <Typography color='#007bff'
                          sx={{
                            fontSize: {
                              xs: '8px', 
                              sm: '12px', 
                              md: '16px', 
                              lg: '20px', 
                            },
                          }}>
                        {char.letter}
                        </Typography>
                    </Button>
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
        </ColoredContainer>
      </Modal>
      <Stack spacing={4}>
        <Stack spacing={1}>
          {
            <Button variant="contained" onClick={() => setCharactersOpen(true)}>
              Customize
            </Button>
          }
          <TextField
            label="Guesses"
            type="number"
            value={settings.rounds}
            onChange={(e) => {
              const rounds = parseInt(e.target.value);
              setSettings({ ...settings, rounds });
            }}
          />
        </Stack>
        <Divider />
        <Link to="/run" state={{ rounds: settings.rounds }}>
          <Button variant="contained">Start</Button>
        </Link>
      </Stack>
    </>
  );
}

export default Menu;
