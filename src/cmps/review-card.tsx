"use client"
import { ReviewCardProps } from '@/interfaces/reviewcardprops'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'

export const ReviewCard = ({userFullName, rating, content}: ReviewCardProps) => {
  return <div className='flex col review-card'>
    <div className="flex col space-between user-info">
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <span>{userFullName}</span>
      <Rating name="read-only" value={rating} readOnly />
    </div>
    <p>{content}</p>
  </div>
}
