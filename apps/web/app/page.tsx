import {client} from "@repo/prisma/client"

export default async function HOME() {
  const user = await client.user.findFirst();

return (
  <div>
    {user?.username}
    {user?.password}
  </div>
)
}