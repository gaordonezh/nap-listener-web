import { Search } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Button, FormHelperText, Grid, Paper, TextField, styled } from '@mui/material';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import sleep from 'utils/sleep';

interface TypeProps {
  data: Array<Object>;
  columns: any;
  loading?: boolean;
  isLoading?: boolean;
  [x: string]: any;
}

interface ColumnProps {
  setSelectedKeys: Function;
  selectedKeys: Array<string>;
  confirm: Function;
  clearFilters: Function;
}

declare global {
  export interface ObjectConstructor {
    byString(o: any, s: string): any;
  }
}

Object.byString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, ''); // strip a leading dot
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

const StyledTable = styled(Table)(({ theme }) => ({
  '& .ant-table': {
    borderRadius: '16px !important',
    backgroundColor: theme.palette.background.default + ' !important',
    color: theme.palette.text.primary + ' !important',
    borderColor: theme.palette.divider + ' !important',

    '& .ant-table-container': {
      border: 'none !important',
      borderRadius: '16px',

      '& .ant-table-content': {
        border: 'none !important',
      },

      '& .ant-table-thead > tr > th': {
        borderColor: (theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300]) + ' !important',
      },

      '& .ant-table-tbody > tr > td': {
        borderColor: (theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300]) + ' !important',
      },

      '& .ant-table-tbody .ant-table-placeholder': {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary + ' !important',
      },

      '& table > tbody > tr:hover': {
        transition: 'all 0.3s ease',
        backgroundColor: theme.palette.action.hover,

        '& td': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
}));

const CustomTable = (props: TypeProps) => {
  const { data, columns, loading = false, isLoading = false, ...rest } = props;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string | number>(0);
  const [allColumns, setAllColumns] = useState([]);

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: ColumnProps) => (
      <Paper
        elevation={6}
        sx={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          alignItems: 'center',
          width: '250px',
          maxWidth: '250px',
        }}
      >
        <TextField
          variant="outlined"
          label="Buscar..."
          size="small"
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(selectedKeys, confirm, dataIndex);
            }
          }}
        />
        <Grid container spacing={1}>
          <Grid size={6}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => handleReset(clearFilters, selectedKeys, setSelectedKeys, confirm)}
              fullWidth
            >
              Limpiar <ClearIcon />
            </Button>
          </Grid>
          <Grid size={6}>
            <Button color="primary" size="small" variant="contained" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} fullWidth>
              Buscar <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    ),
    filterIcon: (filtered: boolean) => <Search style={{ color: filtered ? '#40A9FF' : '#fff' }} />,
    onFilter: (value: string, record: Array<Object>) => {
      if (typeof dataIndex === 'string') {
        return record[dataIndex as any]?.toString().toLowerCase().includes(value.toLowerCase());
      } else {
        const findRecord = Object.byString(record, dataIndex.join('.'));
        return findRecord?.toString().toLowerCase().includes(value.toLowerCase());
      }
    },

    render: (text: string) => {
      return searchedColumn === dataIndex ? (
        <FormHelperText component="span">
          {text}
          {/* <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text?.toString()}
          /> */}
        </FormHelperText>
      ) : (
        text
      );
    },
  });

  const handleSearch = async (selectedKeys: Array<string>, confirm: Function, dataIndex: number) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

    await sleep(100);
    confirm();
  };

  const handleReset = async (clearFilters: Function, _: Array<string>, setSelectedKeys: Function, confirm: Function) => {
    setSelectedKeys(['']);
    await sleep(100);
    clearFilters();

    setSearchText('');
    setSearchedColumn('');

    await sleep(100);
    confirm();
  };

  useEffect(() => {
    if (columns.length > 0) {
      const formatColumns = columns.map((row: any) => {
        const { filter, dataIndex, sorter } = row;

        if (filter) row = { ...row, ...getColumnSearchProps(dataIndex) };

        if (sorter && typeof sorter === 'boolean') {
          row.defaultSortOrder = 'descend';
          row.sorter = (a: any, b: any) => (a[row.dataIndex] > b[row.dataIndex] ? 1 : -1);
        }

        return row;
      });
      setAllColumns(formatColumns);
    }
  }, [columns, searchText]);

  return <StyledTable bordered columns={allColumns} dataSource={data} scroll={{ x: '100%' }} loading={loading || isLoading} rowKey="_id" {...rest} />;
};

export default CustomTable;
