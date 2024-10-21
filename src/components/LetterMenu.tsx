import { Modal, Grid2 as Grid, styled, Box } from "@mui/material";
import { Character } from "../types";
import LetterButton from "./LetterButton";

const StyledGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  "--Grid-borderWidth": "1px",
  borderTop: "var(--Grid-borderWidth) solid",
  borderLeft: "var(--Grid-borderWidth) solid",
  borderColor: theme.palette.divider, // Use theme to access colors
  "& > div": {
    borderRight: "var(--Grid-borderWidth) solid",
    borderBottom: "var(--Grid-borderWidth) solid",
    borderColor: theme.palette.divider,
    margin: "0 -1px -1px 0",
  },
}));

export interface Props {
  open: boolean;
  characterGrid: Character[][];
  onClose: () => void;
  toggleLetter: (row: number, col: number, value?: boolean) => void;
}

function LetterMenu({ characterGrid, open, onClose, toggleLetter }: Props) {                                                                                                                                                                                                                                                                                                

  function toggleRow(row: number) {
    console.log(characterGrid[row].map(char => char.letter));
    const newValue = characterGrid[row].some((char) => !char.disabled && !char.selected);
    [...Array(characterGrid[row].length)].forEach((_, index) => {
      toggleLetter(row, index, newValue);
    });
  }

  function toggleColumn(col: number) {
    const newValue = characterGrid.some((row) => !row[col].disabled && !row[col].selected);
    [...Array(characterGrid.length)].forEach((_, index) => {
      toggleLetter(index, col, newValue);
    });
  }

  function toggleAll() {
    const newValue = characterGrid.some((row) => row.some((char) => !char.disabled && !char.selected));
    characterGrid.map((row, i) => row.map((_, j) => toggleLetter(i, j, newValue)));
  }

  return (
    // <Modal sx={{display: 'flex', 
    // paddingY: '20px',
    // paddingX: '60px', overflow: 'scroll'}} open={open} onClose={() => onClose()}>
      <Box
        sx={{
          padding: '20px',
          backgroundColor: "#ffffff",
          border: '1px solid #007bff',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <StyledGrid container wrap="nowrap">
            {Array.from({ length: characterGrid[0].length + 1 }).map(
              (_, index) => (
                <LetterButton onClick={() => index ? toggleColumn(index - 1) : toggleAll()}/>
              )
            )}
          </StyledGrid>
          {characterGrid.map((row, rowIndex) => (
            <StyledGrid container wrap="nowrap">
              <LetterButton onClick={() => toggleRow(rowIndex)} />
              {row.map((char, columnIndex) => (
                <LetterButton
                  char={char}
                  onClick={() => toggleLetter(rowIndex, columnIndex)}
                />
              ))}
            </StyledGrid>
          ))}
        </Grid>
      </Box>
    //</Modal>
  );
}

export default LetterMenu;
