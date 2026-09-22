export default function User() {
  const id = 36;
  const path = '/users/' + id

  return (
    <>
      <p>I am iron man</p>
      <p>Click here to extract the user</p>
      <a href={path}>Click here</a>
    </>
  )
}
