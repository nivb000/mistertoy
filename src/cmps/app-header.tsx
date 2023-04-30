"use client"
import { useState } from "react"
import Link from "next/link"
import { Righteous } from 'next/font/google'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useSession, signOut } from "next-auth/react"

const headerFont = Righteous({ subsets: ['latin'], weight: '400' })

export const AppHeader = () => {

    const { data } = useSession()
    const [isMobile, setIsMobile] = useState(false)

    const handleLogout = (ev: Event) => {
        ev.preventDefault()
        signOut()
    }

    return <header>
        <div className={`main-layout flex space-between align-center ${headerFont.className} header-nav`}>
            <Link href="/"><h1>Mister Toy</h1></Link>
            {data?.user &&
                <div className="flex space-between user-header">
                    <p>Welcome Back, {data?.user?.fullName}</p>
                    <Link href="/api/auth/signout">
                        <button onClick={() => handleLogout}>Log out</button>
                    </Link>
                </div>}
            <nav className={isMobile ? 'mobile-nav' : 'navbar'}>
                {isMobile && <CloseIcon onClick={() => setIsMobile(false)} />}
                <Link href='/' onClick={() => setIsMobile(false)}>Home</Link>
                <Link href='/toy' onClick={() => setIsMobile(false)}>Our Toys</Link>
                <Link href='/about' onClick={() => setIsMobile(false)}>About us</Link>
                {!data?.user && <Link href='/signin'>Sign in</Link>}
            </nav>
            <MenuIcon className="mobile-nav-icon" onClick={() => setIsMobile(true)} />
        </div>
    </header>
}