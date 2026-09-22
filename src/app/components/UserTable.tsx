'use client'
import { Table, TableProps } from 'antd';
import { IUser } from '../types/backend';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
interface IProps {
  users: IUser[] | [],
  meta: {
    pageSize: number,
    total: number
  }
}


export default function UserTable(props: IProps) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { users, meta } = props;

  const columns: TableProps<IUser>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id'
    }, {
      title: 'name',
      dataIndex: 'name'
    }, {
      title: 'Email',
      dataIndex: 'email'
    },
  ];

  const onChange: NonNullable<TableProps<IUser>['onChange']> = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set('page', pagination.current.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <>
      <Table
        rowKey={'id'}
        bordered
        dataSource={users}
        columns={columns}
        onChange={onChange}
        pagination={{
          placement: ['bottomCenter'],
          ...meta
        }}
      />
    </>
  )
}
