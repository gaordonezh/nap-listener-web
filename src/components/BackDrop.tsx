import { CircularProgress, Paper } from '@mui/material';

interface IProps {
  loading: boolean;
}

const BackDrop = ({ loading }: IProps) => {
  if (!loading) return <></>;

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <CircularProgress color="primary" sx={{ width: 100, height: 100 }} />
    </Paper>
  );
};
export default BackDrop;
