import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { Alert } from 'antd';
import CustomTable from 'components/CustomTable';
import Page from 'components/Page';
import { useAppContext } from 'context';
import { useGlobalInformationContext } from 'context/GlobalInformationProvider';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import type { EventProps } from 'services/events/events';
import { phoneNumberUtils } from 'utils/normalize';

const Dashboard = () => {
  const { events, loading, handleGetEvents } = useGlobalInformationContext();
  const { selectedClient } = useAppContext();

  useEffect(() => {
    if (!selectedClient) return;
    handleGetEvents(phoneNumberUtils.clean(selectedClient.phone, '51'));
  }, [selectedClient]);

  const formattedData = useMemo(
    () =>
      events.map((item) => ({
        ...item,
        room: `+51 ${phoneNumberUtils.format(item.room)}`,
        amount: `S/ ${parseFloat(String(item.amount)).toFixed(2)}`,
        date: dayjs(item.datetime).format('dddd DD MMMM YYYY'),
        time: dayjs(item.datetime).format('HH:mm:ss a'),
      })),
    [events]
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
    <Page
    // component={
    //   selectedClient ? (
    //     <Button
    //       size="large"
    //       variant="contained"
    //       color="primary"
    //       onClick={() => handleSendMessage(phoneNumberUtils.clean(selectedClient.phone, '51'))}
    //     >
    //       SEND TEST MESSAGE
    //     </Button>
    //   ) : undefined
    // }
    >
      <Stack direction="column" spacing={2}>
        {selectedClient ? null : (
          <Alert
            showIcon
            type="warning"
            title="Cliente no seleccionado"
            description="Seleccione a un cliente para ver sus notificaciones en tiempo real."
          />
        )}

        <CustomTable columns={columns} data={formattedData} loading={loading.events} />
      </Stack>
    </Page>
  );
};

export default Dashboard;
