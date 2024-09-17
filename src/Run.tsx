import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import LetterForm from "./components/LetterForm";
import { AnswerData, FrequencyData } from "./types";
import EndScreen from "./components/EndScreen";

interface Props {
  frequencyData: FrequencyData;
  rounds: number;
}

function Run() {
  const { frequencyData, rounds } = useLocation().state as Props;

  const [answerData, setAnswerData] = useState<AnswerData>({
    totalAnswered: 0,
    totalCorrect: 0,
  });

  const [startTime] = useState(new Date());
  const [inReview, setInReview] = useState(false);

  useEffect(() => {
    console.log(answerData);
  }, [answerData]);

  const onAnswer = (isCorrect: boolean) =>
    setAnswerData((oldData) => ({
      totalAnswered: oldData.totalAnswered + 1,
      totalCorrect: oldData.totalCorrect + (isCorrect ? 1 : 0),
    }));

  return (
    <>
      {answerData.totalAnswered < rounds || inReview ? (
        <LetterForm
          frequencyData={frequencyData}
          onAnswer={onAnswer}
          inReview={inReview}
          setInReview={setInReview}
        />
      ) : (
        <EndScreen
          answerData={answerData}
          timeData={{ startTime, endTime: new Date() }}
        />
      )}
    </>
  );
}

export default Run;
