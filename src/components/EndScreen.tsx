import { Box, Button } from "@mui/material";
import { AnswerData, TimeData } from "../types";
import { EndScreenCharacter } from "./styles";
import { Link } from "react-router-dom";

interface Props {
  answerData: AnswerData;
  timeData: TimeData;
}

function EndScreen({ answerData, timeData }: Props) {
  const timeElapsed = timeData.endTime.getTime() - timeData.startTime.getTime();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
        <EndScreenCharacter>
        {(answerData.totalCorrect / answerData.totalAnswered) * 100}%
        </EndScreenCharacter>

        <EndScreenCharacter>{timeElapsed / 1000} seconds</EndScreenCharacter>

        <Box sx={{ display: 'inline-flex', gap: 1, justifyContent: 'center'}}>
            <Link to="/">
                <Button variant="contained">Again</Button>
            </Link>
        </Box>
    </Box>
  );
}

export default EndScreen;
