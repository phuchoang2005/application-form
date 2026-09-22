import UserTable from "../components/UserTable"


export default async function User(props: any) {
  const LIMIT = 10;
  const page = props?.searchParams?.page;
  const res = await fetch(`http://localhost:8000/users?_page=${page}&_limit=${LIMIT}`, {
    method: "GET"
  }
  )
  const data = await res.json()

  const total_item = 1;
  const total_page = 3;

  return (
    <>
      <UserTable
        users={
          data ? data : []
        }
        meta={{
          pageSize: total_item,
          total: total_page
        }} />
    </>
  )
}
