import { useEffect, useState } from "react";
// @ts-ignore
import kroman from "kroman";

import { FrequencyData } from "../types";
import { KoreanCharacter, StyledTextField } from "./styles";

interface Props {
    frequencyData: FrequencyData,
    inReview: boolean,
    onAnswer: (isCorrect: boolean) => void,
    setInReview: (value: boolean) => void,
}

function LetterForm({ frequencyData, onAnswer, inReview, setInReview }: Props) {
    const [currentCharacter, setCurrentCharacter] = useState<string>('');
    const [englishCharacter, setEnglishCharacter] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [shouldCount, setShouldCount] = useState<boolean>(true);

    function getCharacter() {
        const num = Math.floor(Math.random() * (frequencyData.total + 2));
        for (const key of Object.keys(frequencyData)) {
            if (num < frequencyData[key].runningSum) {
                return key;
            }
        }
        throw new Error('No character found');
    }

    function prepareRound() {
        const char = getCharacter();
        setCurrentCharacter(char);
        setEnglishCharacter(kroman.parse(char));
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
        <KoreanCharacter color={inReview ? '#E74C3C' : '#007BFF'}>
            {currentCharacter}
        </KoreanCharacter>
        <StyledTextField
            fullWidth
            borderColor={inReview ? '#E74C3C' : '#007BFF'}
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