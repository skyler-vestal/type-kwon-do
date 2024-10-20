import { useState } from "react";

import { BLUE, KoreanCharacter, StyledTextField } from "./styles";
import { Character } from "../types";

interface Props {
    characters: Character[],
    inReview: boolean,
    onAnswer: (isCorrect: boolean) => void,
    setInReview: (value: boolean) => void,
}

function LetterForm({ characters, onAnswer, inReview, setInReview }: Props) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentCharacter, setCurrentCharacter] = useState<Character>(characters[0]);
    const [answer, setAnswer] = useState<string>('');
    const [shouldCount, setShouldCount] = useState<boolean>(true);

    function prepareRound() {
        const newIndex = currentIndex + 1;
        const char = characters[newIndex];
        setCurrentCharacter(char);
        setCurrentIndex(newIndex);
    }

    function submitAnswer(answer: string) {
        const englishCharacters = currentCharacter?.roman;
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

    return (<>
        <KoreanCharacter color={inReview ? '#E74C3C' : BLUE}>
            {currentCharacter?.letter}
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