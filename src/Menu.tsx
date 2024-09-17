import { Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import frequencyData from './assets/data.json';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Mode } from './types';

type Settings = {
    mode: Mode;
    rounds: number;
}

function Menu() {
    const [settings, setSettings] = useState<Settings>({
        mode: Mode.LETTERS,
        rounds: 5,
    });

    const [_, setCharactersOpen] = useState(false);
    
    return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <FormControl>
            <InputLabel id="select-mode-label">Mode</InputLabel>
            <Select 
                labelId="select-mode-label"
                id="select-mode"
                value={settings.mode}
                label="Mode"
            >
                <MenuItem value={Mode.LETTERS}>Letters</MenuItem>
                <MenuItem value={Mode.WORDS} disabled>Words</MenuItem>
            </Select>
        </FormControl>
        {settings.mode === Mode.LETTERS && (<Button variant="contained" onClick={() => setCharactersOpen(true)} disabled>
            Customize
        </Button>)}
        <TextField
            label="Guesses"
            type="number"
            value={settings.rounds}
            onChange={(e) => {
                const rounds = parseInt(e.target.value);
                setSettings({ ...settings, rounds });
            }}
        />
        </Stack>
        <Divider />
        <Link to="/run" state={{ frequencyData, rounds: settings.rounds }}>
            <Button variant="contained">Start</Button>
        </Link>
      
    </Stack>
    );
  }
  
export default Menu;