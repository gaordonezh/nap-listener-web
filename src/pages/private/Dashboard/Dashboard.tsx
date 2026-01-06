import { Box, Button, Tooltip, Typography } from '@mui/material';
import CustomTable from 'components/CustomTable';
import Page from 'components/Page';
import { useSocketContext } from 'context/webSocketContext';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import type { EventProps } from 'services/events/events';
import { formatPhoneNumber } from 'utils/normalize';

export default function Dashboard() {
  const { handleSendMessage, eventlist, loading } = useSocketContext();

  const formattedData = useMemo(
    () =>
      eventlist.map((item) => ({
        ...item,
        room: `+51 ${formatPhoneNumber.format(item.room)}`,
        amount: `S/ ${parseFloat(String(item.amount)).toFixed(2)}`,
        date: dayjs(item.datetime).format('dddd DD MMMM YYYY'),
        time: dayjs(item.datetime).format('HH:mm a'),
      })),
    [eventlist]
  );

  const columns = [
    {
      title: 'Notificación',
      dataIndex: 'description',
      key: 'description',
      minWidth: 300,
      render: (value: string, record: EventProps) => {
        return (
          <Tooltip
            arrow
            placement="left"
            title={
              <Box width={250} boxShadow="0 0 10px 2px rgba(0,0,0,0.25)" borderRadius={1} px={1} py={0.5}>
                <Typography variant="subtitle2">{record.title}</Typography>
                <Typography variant="body2" color="textSecondary" lineHeight={1}>
                  {record.description}
                </Typography>
                <Typography variant="caption" color="info">
                  {record.package}
                </Typography>
              </Box>
            }
          >
            <Typography noWrap maxWidth={300}>
              {value}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      title: 'Teléfono',
      dataIndex: 'room',
      key: 'room',
      sorter: true,
      filter: true,
      minWidth: 150,
    },
    {
      title: 'Remitente',
      dataIndex: 'sender',
      key: 'sender',
      sorter: true,
      filter: true,
      minWidth: 200,
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      filter: true,
      minWidth: 100,
      align: 'right',
    },
    {
      title: 'Código de seguridad',
      dataIndex: 'securityCode',
      key: 'securityCode',
      minWidth: 100,
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      filter: true,
      minWidth: 225,
    },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
      minWidth: 100,
      sorter: true,
      filter: true,
    },
  ];

  return (
    <Page component={<Button onClick={handleSendMessage}>SEND TEST MESSAGE</Button>}>
      <CustomTable columns={columns} data={formattedData} loading={loading} />
    </Page>
  );
}
