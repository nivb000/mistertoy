"use client"
import { useState } from 'react'
import Button from '@mui/material/Button'
import { useSession } from "next-auth/react"
import { httpService } from '@/services/http.service'
import Rating from '@mui/material/Rating'

export const AddReview = ({ toyId }: { toyId: string }) => {

    const { data } = useSession()

    const [review, setReview] = useState({
        toyId,
        content: '',
        userFullName: data?.user.fullName,
        rating: 1,
    })

    const handleChange = ({ target }: any) => {
        const name = target.name
        const value = target.value
        setReview(prevReview => ({ ...prevReview, [name]: value }))
    }

    const handleRating = (ev: any, newValue: number | null) => {
        if (newValue !== null) setReview(prev => ({ ...prev, rating: newValue }))
    }

    const handleAddComment: React.FormEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault()
        await httpService.post('/review/', review)
        window.location.reload()
    }

    if (data?.user) return <section className="flex col add-review">
        <h1>Add review</h1>
        <form className='flex col space-between' onSubmit={handleAddComment}>
            <textarea value={review.content} onChange={handleChange} name="content" />
            <Rating name="simple-controlled" value={review.rating} onChange={(ev, newValue) => handleRating(ev, newValue)} />
            <Button variant="contained" type='submit'>Add</Button>
        </form>
    </section>
}