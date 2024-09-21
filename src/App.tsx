import { Routes, Route, BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import Run from "./Run";
import { Container } from "@mui/material";
import { ColoredContainer } from "./components/styles";
import kroman from "kroman";

const disabledSyllables = ['', '댜', "쟈", "탸", "퍄", "햐", "됴", "툐"];

const koreanSyllables = [
    ["", "ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
    ["ㅏ", "가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하"],
    ["ㅑ", "갸", "냐", "댜", "랴", "먀", "뱌", "샤", "야", "쟈", "챠", "캬", "탸", "퍄", "햐"],
    ["ㅓ", "거", "너", "더", "러", "머", "버", "서", "어", "저", "처", "커", "터", "퍼", "허"],
    ["ㅕ", "겨", "녀", "뎌", "려", "며", "벼", "셔", "여", "져", "쳐", "켜", "텨", "펴", "혀"],
    ["ㅗ", "고", "노", "도", "로", "모", "보", "소", "오", "조", "초", "코", "토", "포", "호"],
    ["ㅛ", "교", "뇨", "됴", "료", "묘", "뵤", "쇼", "요", "죠", "쵸", "쿄", "툐", "표", "효"],
    ["ㅜ", "구", "누", "두", "루", "무", "부", "수", "우", "주", "추", "쿠", "투", "푸", "후"],
    ["ㅠ", "규", "뉴", "듀", "류", "뮤", "뷰", "슈", "유", "쥬", "츄", "큐", "튜", "퓨", "휴"],
    ["ㅡ", "그", "느", "드", "르", "므", "브", "스", "으", "즈", "츠", "크", "트", "프", "흐"],
    ["ㅣ", "기", "니", "디", "리", "미", "비", "시", "이", "지", "치", "키", "티", "피", "히"],
    ["ㅐ", "개", "내", "대", "래", "매", "배", "새", "애", "재", "채", "캐", "태", "패", "해"]
].map((row) => row.map((char) => { const disabled = disabledSyllables.includes(char); return ({letter: char, roman: kroman.parse(char), disabled, selected: !disabled }); }));

function App() {
    return (
        <Container
        maxWidth="sm"
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}
    >
        <ColoredContainer>
        <BrowserRouter basename="/type-kwon-do">
            <Routes>
                <Route path="/" element={<Menu letters={koreanSyllables} />} />
                <Route path="/run" element={<Run />} />
            </Routes>
        </BrowserRouter>
        </ColoredContainer>
        </Container>
      );
}

export default App;