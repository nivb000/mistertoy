import '../styles/main.scss'
import { AppHeader } from '@/cmps/app-header'
import { getServerSession } from 'next-auth/next'
import { authOptions } from "./api/auth/[...nextauth]/route"


export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const data = await getServerSession(authOptions)

  return (
    <html lang="en">
        <body>
          <AppHeader user={data?.user} />
            <main className="main-layout">
              {children}
            </main>
        </body>
    </html >
  )
}

//YOU CAN WRAP THE BODY WITH <SessionProvider> imported from next-auth/react
//AND INSIDE CLIENT COMPONENT const { data } = useSession() imported also from next-auth/react