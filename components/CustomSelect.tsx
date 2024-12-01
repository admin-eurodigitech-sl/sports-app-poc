import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface CustomSelectProps {
  selectName: string;
  selectArray: any[];
  selectLabel: string;
  useStateHook: (newState: any) => void
}

export function CustomSelect({ selectName, selectArray, selectLabel, useStateHook }: CustomSelectProps) {
  const [selectValue, setSelectValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
    useStateHook(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{selectName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectValue}
          label={selectLabel}
          onChange={handleChange}
        >
          {
            selectArray.map(({ name, value }) => {
              return (
                <MenuItem value={value}>{name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}