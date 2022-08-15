import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BirthPicker() {
  const [birth, setBirth] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="생년월일"
        value={birth}
        onChange={(newBirth) => {
          setBirth(newBirth);
        }}
        renderInput={(params) => <TextField {...params} sx={{ mt:1, width: '100%' }} />}
      />
    </LocalizationProvider>
  );
}
