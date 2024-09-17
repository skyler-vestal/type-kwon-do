import styled from "@emotion/styled";
import { Typography, TextField } from "@mui/material";

export const ColoredContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ffffff; /* White background for a cleaner look */
  border: 1px solid #007bff; /* Slightly lighter blue outline */
  border-radius: 12px; /* More rounded corners */
  padding: 30px;
  text-align: center;
  width: 60%; /* Slightly wider */
  minHeight: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
`;

export const KoreanCharacter = styled(Typography)<{ color?: string }>`
  font-size: 3rem; /* Larger font size for emphasis */
  color: ${({ color }) => color || '#007bff'}; /* Use the provided color or default to #007bff */
  margin-bottom: 20px; /* Space between character and input box */
`;

export const EndScreenCharacter = styled(Typography)`
  font-size: 1.5rem; /* Larger font size for emphasis */
  color: #007bff; /* Matching color with the border */
`;

export const StyledTextField = styled(TextField)<{ borderColor?: string }>`
  & .MuiInputBase-input {
    font-size: 1.2rem; /* Larger text inside the input field */
  }

  & label.Mui-focused {
    color: ${({ borderColor }) => borderColor || '#007bff'};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${({ borderColor }) => borderColor || '#007bff'};
    }
  }
`;