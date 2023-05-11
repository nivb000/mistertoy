"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Righteous } from 'next/font/google'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { signOut } from "next-auth/react"

const headerFont = Righteous({ subsets: ['latin'], weight: '400' })

export const AppHeader = ({ user }: any) => {

    const [isMobile, setIsMobile] = useState(false)
    const [cartItemsLength, setCartItemsLength] = useState(0)

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


    return <header>
        <div className={`main-layout flex space-between align-center ${headerFont.className} header-nav`}>
            <Link href="/"><h1>Mister Toy</h1></Link>
            {user &&
                <div className="flex space-between user-header">
                    <p>Welcome Back, {user?.fullName}</p>
                    <Link href="/api/auth/signout">
                        <button onClick={() => handleLogout}>Log out</button>
                    </Link>
                </div>}
            <nav className={isMobile ? 'mobile-nav' : 'navbar'}>
                {isMobile && <CloseIcon onClick={() => setIsMobile(false)} />}
                <Link href='/' onClick={() => setIsMobile(false)}>Home</Link>
                <Link href='/toy' onClick={() => setIsMobile(false)}>Our Toys</Link>
                <Link href='/about' onClick={() => setIsMobile(false)}>About us</Link>
                {!user && <Link href='/signin'>Sign in</Link>}
                <Link href='/cart' onClick={() => setIsMobile(false)} data-count={cartItemsLength} className="cart-navbar">
                    My Cart
                </Link>
            </nav>
            <MenuIcon className="mobile-nav-icon" onClick={() => setIsMobile(true)} />
        </div>
    </header>
}