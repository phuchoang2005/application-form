export default async function UserPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div>
      <p>This is data of user page</p>
      <div>
        {slug}
      </div>
    </div>
  )
}
