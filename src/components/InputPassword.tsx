import { forwardRef, useState } from 'react';
import { IconButton, InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const InputPassword = forwardRef(({ ...rest }: TextFieldProps, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      inputRef={ref}
      type={visible ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setVisible(!visible)} edge="end">
                {visible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...rest}
    />
  );
});

export default InputPassword;
