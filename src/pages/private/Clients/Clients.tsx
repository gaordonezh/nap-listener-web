import { Button, ButtonGroup } from '@mui/material';
import CustomTable from 'components/CustomTable';
import Page from 'components/Page';
import { useEffect, useState } from 'react';
import type { ClientProps } from 'services/clients/clients';
import type { ModalStateProps } from 'types/global';
import { ModalStateEnum } from 'types/global.enum';
import ClientsModal from './ClientsModal';
import { notification } from 'antd';
import { getClientsRequest } from 'services/clients/clients.requests';
import { formatPhoneNumber } from 'utils/normalize';
import { Edit } from '@mui/icons-material';

const Clients = () => {
  const [modal, setModal] = useState<ModalStateProps<ClientProps>>(null);
  const [data, setData] = useState<Array<ClientProps>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      setLoading(true);
      const result = await getClientsRequest();

      const formattedPhone = result.map((item) => ({
        ...item,
        phone: `+51 ${formatPhoneNumber.format(item.phone)}`,
      }));

      setData([...formattedPhone]);
    } catch (error) {
      notification.error({ title: 'No se logró obtener a los clientes' });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      filter: true,
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
      sorter: true,
      filter: true,
    },
    {
      title: 'Acciones',
      dataIndex: '_id',
      key: '_id',
      render: (_: string, record: ClientProps) => (
        <ButtonGroup variant="contained">
          <Button color="primary" endIcon={<Edit />} onClick={() => setModal({ mode: ModalStateEnum.BOX, data: record })}>
            Editar
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <Page component={<Button onClick={() => setModal({ mode: ModalStateEnum.BOX })}>AGREGAR CLIENTE</Button>}>
      <CustomTable columns={columns} data={data} loading={loading} />

      {modal?.mode === ModalStateEnum.BOX ? <ClientsModal onClose={() => setModal(null)} data={modal.data} onReload={getClients} /> : null}
    </Page>
  );
};

export default Clients;
