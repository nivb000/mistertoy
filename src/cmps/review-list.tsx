import { Reviews } from "@/interfaces/review"
import { ReviewCard } from "./review-card"

export const ReviewList = ({ reviews }: { reviews: Reviews }) => {    

    if(!reviews.length) return <h3>No reviews yet</h3>
    return <div className='flex reviews'>
        {reviews?.map(review => <ReviewCard key={review.id} {...review} />)}
    </div>
}

