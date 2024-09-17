export type FrequencyData = {
    total: number;
} & {
    [key: string]: { total: number, runningSum: number, frequencyPercentage: number }
}

export type AnswerData = {
    totalAnswered: number;
    totalCorrect: number;
}

export type TimeData = {
    startTime: Date;
    endTime: Date;
}

export enum Mode {
    LETTERS = "Letters",
    WORDS = "Words",
}