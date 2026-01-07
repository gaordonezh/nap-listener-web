import { Button, ButtonGroup } from '@mui/material';
import CustomTable from 'components/CustomTable';
import Page from 'components/Page';
import { useState } from 'react';
import type { ModalStateProps } from 'types/global';
import { ModalStateEnum } from 'types/global.enum';
import type { UserProps } from 'services/user/user';
import UsersModal from './UsersModal';
import type { UserRolEnum } from 'services/user/user.enum';
import { Delete, Edit } from '@mui/icons-material';
import ModalConfirmDelete from 'components/ConfirmDelete';
import { useGlobalInformationContext } from 'context/GlobalInformationProvider';

const Users = () => {
  const [modal, setModal] = useState<ModalStateProps<UserProps>>(null);
  const { users, handleGetUsers, loading } = useGlobalInformationContext();

  const columns = [
    {
      title: 'Nombres',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      filter: true,
    },
    {
      title: 'Apellidos',
      dataIndex: 'lastname',
      key: 'lastname',
      sorter: true,
      filter: true,
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (values: Array<UserRolEnum>) => values.join(' - '),
    },
    {
      title: 'Acciones',
      dataIndex: '_id',
      key: '_id',
      render: (_: string, record: UserProps) => (
        <ButtonGroup variant="contained">
          <Button color="primary" endIcon={<Edit />} onClick={() => setModal({ mode: ModalStateEnum.BOX, data: record })}>
            Editar
          </Button>
          <Button color="error" endIcon={<Delete />} onClick={() => setModal({ mode: ModalStateEnum.DELETE, data: record })}>
            Eliminar
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <Page component={<Button onClick={() => setModal({ mode: ModalStateEnum.BOX })}>AGREGAR USUARIO</Button>}>
      <CustomTable columns={columns} data={users} loading={loading.users} />

      {modal?.mode === ModalStateEnum.BOX ? <UsersModal onClose={() => setModal(null)} data={modal.data} onReload={handleGetUsers} /> : null}

      {modal?.mode === ModalStateEnum.DELETE ? (
        <ModalConfirmDelete endpoint={`/users/${modal.data?._id}`} handleClose={() => setModal(null)} handleRefresh={handleGetUsers} />
      ) : null}
    </Page>
  );
};

export default Users;
