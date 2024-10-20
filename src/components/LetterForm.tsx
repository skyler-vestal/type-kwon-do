import { useEffect, useState } from "react";

import { BLUE, KoreanCharacter, StyledTextField } from "./styles";
import getRomanized from "../lib/getRomanized";

interface Props {
    letters: string[],
    inReview: boolean,
    onAnswer: (isCorrect: boolean) => void,
    setInReview: (value: boolean) => void,
}

function LetterForm({ letters, onAnswer, inReview, setInReview }: Props) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentCharacter, setCurrentCharacter] = useState<string>('');
    const [englishCharacters, setEnglishCharacters] = useState<string[]>(['']);
    const [answer, setAnswer] = useState<string>('');
    const [shouldCount, setShouldCount] = useState<boolean>(true);

    function prepareRound() {
        const char = letters[currentIndex];
        setCurrentCharacter(char);
        setEnglishCharacters(getRomanized(char));
        setCurrentIndex(currentIndex + 1);
    }

    function submitAnswer(answer: string) {
        const isCorrect = englishCharacters.includes(answer.toLowerCase()) ||
            answer === englishCharacters.join(', ') ||
            answer === englishCharacters.join(',');
        if (shouldCount) {
            onAnswer(isCorrect);
        }
        setInReview(!isCorrect);
        setAnswer(isCorrect ? '' : englishCharacters.join(', '));
        setShouldCount(isCorrect);
        if (isCorrect) {
            prepareRound();
        }
    }

    useEffect(() => {
        prepareRound();
    }, []);


    return (<>
        <KoreanCharacter color={inReview ? '#E74C3C' : BLUE}>
            {currentCharacter}
        </KoreanCharacter>
        <StyledTextField
            fullWidth
            borderColor={inReview ? '#E74C3C' : BLUE}
            variant="outlined"
            value={answer}
            onKeyDown={e => {
                const value = (e.target as HTMLInputElement).value;
                if (e.key === 'Enter') {
                    submitAnswer(value);
                }
            }
            }
            onChange={
                e => {
                    setInReview(false);
                    setAnswer(e.target.value);
                }
            }
        />
    </>);
}


export default LetterForm;