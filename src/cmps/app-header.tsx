"use client"
import { useState, useEffect, CSSProperties } from "react"
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react"
import { Righteous } from 'next/font/google'
import Link from "next/link"
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LogoutIcon from '@mui/icons-material/Logout'

const headerFont = Righteous({ subsets: ['latin'], weight: '400' })

const navLinks = [
    { routeName: 'Home', href: '/' },
    { routeName: 'Our Toys', href: '/toy' },
    { routeName: 'About us', href: '/about' }
]

export const AppHeader = ({ user }: any) => {

    const [isMobile, setIsMobile] = useState(false)
    const [cartItemsLength, setCartItemsLength] = useState(0)
    const pathname = usePathname()



    const handleLogout = (ev: Event) => {
        ev.preventDefault()
        signOut()
    }

    useEffect(() => {
        let cartItemsCount = localStorage.getItem('cartItems')
        if (cartItemsCount !== null) {
            cartItemsCount = JSON.parse(cartItemsCount)
            setCartItemsLength(cartItemsCount?.length ?? 0)
        }
    }, [])

    const homePageStyles: CSSProperties = {
        backgroundImage: "none",
        backgroundColor: "whitesmoke"
    }


    return <header style={pathname === '/' ? homePageStyles : undefined}>
        <div className={`main-layout flex space-between align-center ${headerFont.className} header-nav`}>
            <Link href="/"><h1>MISTER TOY</h1></Link>
            <nav className={isMobile ? 'mobile-nav' : 'navbar'}>
                {isMobile && <CloseIcon onClick={() => setIsMobile(false)} />}
                {navLinks.map(nav => <Link href={nav.href} key={nav.routeName}
                    className={(pathname === nav.href) ? "active" : ""}
                    onClick={() => setIsMobile(false)}>
                    {nav.routeName}
                </Link>)}
                <Link href='/cart' className={pathname === "/cart" ? "active cart-navbar" : 'cart-navbar'} onClick={() => setIsMobile(false)} data-count={cartItemsLength}>
                    My Cart
                </Link>
            </nav>
            {user ?
                <div className="flex user-header">
                    <p>Welcome Back, {user?.fullName}</p>
                    <Link href="/api/auth/signout">
                        <LogoutIcon onClick={() => handleLogout} />
                    </Link>
                </div>
            :
            <Link href="/signin" onClick={() => setIsMobile(false)}>Sign in</Link>}
            <MenuIcon className="mobile-nav-icon" onClick={() => setIsMobile(true)} />
        </div>
    </header>
}