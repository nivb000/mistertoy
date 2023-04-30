import { httpService } from "@/services/http.service"
import Link from "next/link"
import { Toy } from "@/interfaces/toy"
import { AddReview } from "@/cmps/add-review"
import { ReviewList } from "@/cmps/review-list"
import { Reviews } from "@/interfaces/review"

const getToy = async (id: string) => {
    const toy: Toy = await httpService.get(`toy/${id}`)
    return toy
}

const getToyReviews = async (toyId: string) => {
    const reviews: Reviews = await httpService.get(`review/${toyId}`, 'default')
    return reviews
}

export default async function ToyDetails({ params }: any) {

    const toy = await getToy(params.id)
    const reviews = await getToyReviews(params.id)

    return <section className="toy-details">
        <div className="stepper">
            <Link href="/"><span>Home</span></Link>
            {'>'}
            <Link href="/toy"><span>Toys</span></Link>
            {'>'}
            <span className="stepper-active">{params.id}</span>
        </div>
        <div className='toy-details-container flex space-around'>
            <div className="toy-info-l">
                <img src={`https://robohash.org/${toy.name}?set=set4`} alt="Toy" />
            </div>
            <div className='toy-info-r flex col space-around'>
                <h1>{toy.name}</h1>
                <p className="sku">SKU: {toy.id}</p>
                <span>{toy.price}.00$</span>
                {toy.inStock ? <p style={{ color: 'green' }}>IN STOCK</p>
                    : <p style={{ color: 'red' }}>Out of stock</p>
                }
                {toy.labels &&
                    <div className="toy-categories">
                        <h3>Categories</h3>
                        {toy.labels.map((label: string) => (
                            <span key={label}>{label}</span>))}
                    </div>
                }
            </div>
        </div>
        <AddReview toyId={toy.id} />
        <h1>Reviews</h1>
        <ReviewList reviews={reviews} />
    </section>
}