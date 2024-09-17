import { Routes, Route, BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import Run from "./Run";
import { Container } from "@mui/material";
import { ColoredContainer } from "./components/styles";

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
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/run" element={<Run />} />
            </Routes>
        </BrowserRouter>
        </ColoredContainer>
        </Container>
      );
}

export default App;