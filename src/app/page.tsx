import Image from 'next/image'
import Link from 'next/link'
import bear from '../../public/imgs/bear.png'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Mister Toy",
    description: "Mister Toy Full stack Project with Next.js 13 Beta",
    themeColor: "#A9C9FF"
}

export default async function HomePage() {

    return <section className="flex home-page">
        <div className="flex col justify-center left-side">
            <div className='text'>
                <span>DISCOVER <span className='inner-span'>OUR NEW</span> TOYS.</span>
                <p>Our store have an awesome toys for babies and childrens <br />Check them out.</p>
                <Link href="/toy"><button>Browse</button></Link>
            </div>
        </div>
        <div className="flex align-center right-side">
            <Image alt='toy-image' src={bear} placeholder='empty' />
        </div>
    </section>
}