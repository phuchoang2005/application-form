export default function Blog() {
  const id = 13;
  const path = '/blogs/' + id;
  return (
    <>
      <p>I am blog</p>
      <p>Click to the button below to enter the document</p>
      <a href={path}> Clikc here </a>
    </>
  )
}
