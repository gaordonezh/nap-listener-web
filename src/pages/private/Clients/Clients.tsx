import { Button, ButtonGroup } from '@mui/material';
import CustomTable from 'components/CustomTable';
import Page from 'components/Page';
import { useState } from 'react';
import type { ClientProps } from 'services/clients/clients';
import type { ModalStateProps } from 'types/global';
import { ModalStateEnum } from 'types/global.enum';
import ClientsModal from './ClientsModal';
import { Edit } from '@mui/icons-material';
import { useGlobalInformationContext } from 'context/GlobalInformationProvider';

const Clients = () => {
  const [modal, setModal] = useState<ModalStateProps<ClientProps>>(null);
  const { clients, loading, handleGetClients } = useGlobalInformationContext();

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
      <CustomTable columns={columns} data={clients} loading={loading.clients} />

      {modal?.mode === ModalStateEnum.BOX ? <ClientsModal onClose={() => setModal(null)} data={modal.data} onReload={handleGetClients} /> : null}
    </Page>
  );
};

export default Clients;
