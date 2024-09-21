import { Modal, Grid2 as Grid, styled } from "@mui/material";
import { ColoredContainer } from "./styles";
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
  letterGrid: Character[][];
  onClose: () => void;
  toggleLetter: (row: number, col: number, value?: boolean) => void;
}

function LetterMenu({ letterGrid, open, onClose, toggleLetter }: Props) {
  function toggleRow(row: number) {
    const newValue = letterGrid[row].some((char) => !char.disabled && !char.selected);
    [...Array(letterGrid[row].length)].forEach((_, index) => {
      toggleLetter(row, index, newValue);
    });
  }

  function toggleColumn(col: number) {
    const newValue = letterGrid.some((row) => !row[col].disabled && !row[col].selected);
    [...Array(letterGrid.length)].forEach((_, index) => {
      toggleLetter(index, col, newValue);
    });
  }

  function toggleAll() {
    const newValue = letterGrid.some((row) => row.some((char) => !char.disabled && !char.selected));
    letterGrid.map((row, i) => row.map((_, j) => toggleLetter(i, j, newValue)));
  }

  return (
    <Modal open={open} onClose={() => onClose()}>
      <ColoredContainer
        style={{
          width: "80%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid container style={{ width: "100%", height: "100%" }}>
          <StyledGrid container wrap="nowrap">
            {Array.from({ length: letterGrid[0].length + 1 }).map(
              (_, index) => (
                <LetterButton onClick={() => index ? toggleColumn(index - 1) : toggleAll()}/>
              )
            )}
          </StyledGrid>
          {letterGrid.map((row, rowIndex) => (
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
      </ColoredContainer>
    </Modal>
  );
}

export default LetterMenu;
