export default async function UserPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <p>This is {slug} of user page</p>
    </div>
  )
}
