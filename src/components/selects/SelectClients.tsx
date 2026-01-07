import { Select, type SelectProps } from 'antd';
import { useGlobalInformationContext } from 'context/GlobalInformationProvider';
import { filterOptions } from 'utils/select';

interface SelectClientsProps extends SelectProps {}

const SelectClients = ({ size = 'large', ...props }: SelectClientsProps) => {
  const { clients, loading } = useGlobalInformationContext();

  return (
    <Select showSearch={{ filterOption: filterOptions }} size={size} style={{ width: '100%' }} loading={loading.clients} {...props}>
      {clients.map((item) => (
        <Select.Option key={item._id} value={item._id} title={item.name} data-value={item}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectClients;
