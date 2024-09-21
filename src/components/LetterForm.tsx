import { useEffect, useState } from "react";
// @ts-ignore
import kroman from "kroman";

import { BLUE, KoreanCharacter, StyledTextField } from "./styles";

interface Props {
    letters: string[],
    inReview: boolean,
    onAnswer: (isCorrect: boolean) => void,
    setInReview: (value: boolean) => void,
}

function LetterForm({ letters, onAnswer, inReview, setInReview }: Props) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentCharacter, setCurrentCharacter] = useState<string>('');
    const [englishCharacter, setEnglishCharacter] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [shouldCount, setShouldCount] = useState<boolean>(true);

    function prepareRound() {
        const char = letters[currentIndex + 1];
        setCurrentCharacter(char);
        setEnglishCharacter(kroman.parse(char));
        setCurrentIndex(currentIndex + 1);
    }

    function submitAnswer(answer: string) {
        const isCorrect = answer.toLowerCase() === englishCharacter.toLowerCase();
        if (shouldCount) {
            onAnswer(isCorrect);
        }
        setInReview(!isCorrect);
        setAnswer(isCorrect ? '' : englishCharacter)
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