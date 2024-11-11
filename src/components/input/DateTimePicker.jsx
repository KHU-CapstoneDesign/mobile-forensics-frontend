import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ko';

const DateTimePick = ({ onSetValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="날짜 및 시간"
        format="YYYY-MM-DD hh:mm:ss"
        onChange={newValue => onSetValue(newValue)}
        sx={{ width: '300px' }}
      />
    </LocalizationProvider>
  );
};
export default DateTimePick;
