// @ts-ignore
import kroman from "kroman";

const backupMap: Record<string, string[]> = {
    "ㄱ": ["g", "k"],
    "ㄴ": ["n"],
    "ㄷ": ["d", "t"], 
    "ㄹ": ["r", "l"],
    "ㅁ": ["m"], 
    "ㅂ": ["b", "p"], 
    "ㅅ": ["s"], 
    "ㅇ": ["ng"], 
    "ㅈ": ["j"], 
    "ㅊ": ["ch"], 
    "ㅋ": ["k"], 
    "ㅌ": ["t"], 
    "ㅍ": ["p"], 
    "ㅎ": ["h"],
    "ㅏ": ["a"],
    "ㅑ": ["ya"],
    "ㅓ": ["eo"],
    "ㅕ": ["yeo"],
    "ㅗ": ["o"],
    "ㅛ": ["yo"],
    "ㅜ": ["u"],
    "ㅠ": ["yu"],
    "ㅡ": ["eu"],
    "ㅣ": ["i"],
    "ㅐ": ["ae"],
}

export default function getRomanized(letter: string) {
    const romanized = letter in backupMap ? backupMap[letter] : [kroman.parse(letter)] as [string];
    if (romanized[0] === letter) {
        console.error(`Could not romanize ${letter}`);
    }
    return romanized;
}