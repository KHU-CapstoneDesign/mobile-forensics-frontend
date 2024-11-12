import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';

const DateTimePick = ({ onSetValue, errorDateTime }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(errorDateTime);
  }, [errorDateTime]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="날짜 및 시간"
        format="YYYY-MM-DD hh:mm:ss"
        onChange={newValue => onSetValue(newValue)}
        sx={{ width: '300px' }}
        slotProps={{
          textField: {
            helperText: error ? '날짜 및 시간을 입력해주세요' : '',
            error: error,
          },
        }}
      />
    </LocalizationProvider>
  );
};
export default DateTimePick;
