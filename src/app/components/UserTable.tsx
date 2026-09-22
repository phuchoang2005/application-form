import { Table, TableProps } from 'antd';

import { IUser } from '../types/backend';
interface IProps {
  users: IUser[] | []
}
export default function UserTable(props: IProps) {

  const { users } = props;


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

  return (
    <>
      <Table bordered dataSource={users} columns={columns} />
    </>

  )
}
