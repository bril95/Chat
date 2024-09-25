import { FormHelperText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps {
  field: object;
  errors: FieldError;
  text: string;
  id: string;
}

const InputField: React.FC<InputProps> = ({ field, errors, text, id }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor={id}>{text}</InputLabel>
      <OutlinedInput
        id={id}
        {...field}
        error={!!errors}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={text}
      />
      {errors && (
        <FormHelperText error>{errors.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default InputField;
