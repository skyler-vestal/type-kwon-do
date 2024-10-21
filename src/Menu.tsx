import {
  Button,
  Divider,
  Stack,
} from "@mui/material";
import arrayShuffle from 'array-shuffle';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Character } from "./types";
import LetterMenu from "./components/LetterMenu";

type Props = {
  letters: Character[][];
};

function Menu({ letters }: Props) {
  const [charactersOpen, setCharactersOpen] = useState(false);
  const [grid, setGrid] = useState<Character[][]>(letters);
  

  function toggleLetter(row: number, col: number, value?: boolean) {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const newValue = value ?? !newGrid[row][col].selected;
      newGrid[row][col].selected = !newGrid[row][col].disabled && newValue;
      return newGrid;
    });
  }

  const generateCharacterList = () => (arrayShuffle(grid.flatMap(row => row.filter(character => character.selected))));

  const letterSelected = grid.some((row) => row.some((char) => char.selected));


  function getGridForWindow() {
    return window.innerWidth < window.innerHeight ? 
    grid[0].map((_, colIndex) => grid.map(row => row[colIndex]))
      : grid;
  }

  useEffect(() => {
  function updateGrid() {
    setGrid(getGridForWindow());
  }
    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  return (
    <>
      <LetterMenu open={charactersOpen} characterGrid={grid} onClose={() => setCharactersOpen(false)} toggleLetter={toggleLetter} />
      <Stack spacing={4}>
        <Stack spacing={1}>
          {
            <Button variant="contained" onClick={() => setCharactersOpen(true)}>
              Customize
            </Button>
          }
        </Stack>
        <Divider />
        <Link to={letterSelected ? "/run" : "#"} state={{ characterList: generateCharacterList() }}>
          <Button variant="contained" disabled={!letterSelected}>Start</Button>
        </Link>
      </Stack>
    </>
  );
}

export default Menu;
