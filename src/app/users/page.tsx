import UserTable from "../components/UserTable"


export default async function User({ searchParams }: PageProps<'/users'>) {
  const LIMIT = 1;
  const { page } = await searchParams;
  const current_page = typeof page === 'string' ? page : '1';
  const res = await fetch(`http://localhost:8000/users?_page=${current_page}&_limit=${LIMIT}`, {
    method: "GET"
  }
  )
  const data = await res.json()


  return (
    <>
      <UserTable
        users={
          data ? data : []
        }
        meta={{
          pageSize: LIMIT,
          total: 10
        }} />
    </>
  )
}
