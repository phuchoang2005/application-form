import UserTable from "../components/UserTable"

export default async function User() {
  const res = await fetch("http://localhost:8000/users", {
    method: "GET"
  }
  )
  const data = await res.json()
  return (
    <>
      <UserTable users={data ? data : []} />
    </>
  )
}
