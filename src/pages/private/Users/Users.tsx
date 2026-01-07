import { Button, ButtonGroup } from '@mui/material';
import CustomTable from 'components/CustomTable';
import Page from 'components/Page';
import { useEffect, useState } from 'react';
import type { ModalStateProps } from 'types/global';
import { ModalStateEnum } from 'types/global.enum';
import { notification } from 'antd';
import type { UserProps } from 'services/user/user';
import UsersModal from './UsersModal';
import { getUsersRequest } from 'services/user/user.requests';
import type { UserRolEnum } from 'services/user/user.enum';
import { Delete, Edit } from '@mui/icons-material';
import ModalConfirmDelete from 'components/ConfirmDelete';

const Users = () => {
  const [modal, setModal] = useState<ModalStateProps<UserProps>>(null);
  const [data, setData] = useState<Array<UserProps>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      const result = await getUsersRequest();

      setData([...result]);
    } catch (error) {
      notification.error({ title: 'No se logró obtener a los usuarios' });
    } finally {
      setLoading(false);
    }
  };

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
      <CustomTable columns={columns} data={data} loading={loading} />

      {modal?.mode === ModalStateEnum.BOX ? <UsersModal onClose={() => setModal(null)} data={modal.data} onReload={getUsers} /> : null}

      {modal?.mode === ModalStateEnum.DELETE ? (
        <ModalConfirmDelete endpoint={`/users/${modal.data?._id}`} handleClose={() => setModal(null)} handleRefresh={getUsers} />
      ) : null}
    </Page>
  );
};

export default Users;
