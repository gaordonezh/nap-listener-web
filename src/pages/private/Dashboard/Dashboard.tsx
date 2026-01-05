import { Button } from '@mui/material';
import CustomTable from 'components/CustomTable';
import Page from 'components/Page';
import { useSocketContext } from 'context/webSocketContext';
import dayjs from 'dayjs';

export default function Dashboard() {
  const { handleSendMessage, eventlist, loading } = useSocketContext();

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      filter: true,
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
      filter: true,
    },
    {
      title: 'App',
      dataIndex: 'package',
      key: 'package',
      sorter: true,
      filter: true,
    },
    {
      title: 'Fecha',
      dataIndex: 'datetime',
      key: 'datetime',
      render: (value: string) => dayjs(value).format('dddd DD MMMM YYYY'),
    },
    {
      title: 'Hora',
      dataIndex: 'datetime',
      key: 'datetime',
      render: (value: string) => dayjs(value).format('HH:mm a'),
    },
  ];

  return (
    <Page component={<Button onClick={handleSendMessage}>SEND TEST MESSAGE</Button>}>
      <CustomTable columns={columns} data={eventlist} loading={loading} />
    </Page>
  );
}
