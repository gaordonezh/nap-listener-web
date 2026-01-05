import { Button } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';

interface IProps {
  file: File;
  setFile: Function;
}

const InputFile = ({ file, setFile, ...rest }: IProps) => {
  return (
    <Button {...rest} component="label">
      <FileOpenIcon /> Seleccionar archivos
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => e.target.files && e.target.files[0]}
      />
      {file && file.name}
    </Button>
  );
};

export default InputFile;
