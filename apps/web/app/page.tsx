import { prisma } from "@repo/prisma/client"

export default async function HOME() {
  const user = await prisma.user.findFirst();

return (
  <div>
    name:
    {user?.username}
    password:
    {user?.password}
  </div>
)
}