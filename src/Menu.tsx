import {
  Button,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Character } from "./types";
import LetterMenu from "./components/LetterMenu";

type Settings = {
  rounds: number;
};

type Props = {
  letters: Character[][];
};

const getGrid = (letters: Character[][]) =>
  letters.map((row) => row.map((char) => ({ ...char })));

function Menu({ letters }: Props) {
  const [settings, setSettings] = useState<Settings>({
    rounds: 5,
  });

  const [charactersOpen, setCharactersOpen] = useState(false);
  const [grid, setGrid] = useState<Character[][]>(getGrid(letters));

  function toggleLetter(row: number, col: number, value?: boolean) {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const newValue = value ?? !newGrid[row][col].selected;
      newGrid[row][col].selected = !newGrid[row][col].disabled && newValue;
      return newGrid;
    });
  }

  return (
    <>
      <LetterMenu open={charactersOpen} letterGrid={grid} onClose={() => setCharactersOpen(false)} toggleLetter={toggleLetter} />
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
