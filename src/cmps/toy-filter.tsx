"use client"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useState, useRef, useCallback } from "react"
import { NativeSelect, TextField } from '@mui/material'
import { Filter } from '@/interfaces/filter'

export const ToyFilter = () => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const isFirst = useRef(true)
    const setParams = new URLSearchParams(searchParams)

    const [filter, setFilter] = useState({
        name: '',
        onlyInStock: 'false'
    })

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return
        }
        setToysFilter(filter)
    }, [filter])

    const createQueryString = useCallback(
        (key1: string, value1: string, key2: string, value2: string) => {
            setParams.set(key1, value1)
            setParams.set(key2, value2)
            return setParams.toString()
        },
        [searchParams]
    )

    const setToysFilter = (filter: Filter) => {
        const { name, onlyInStock } = filter
        router.push(pathname + '?' + createQueryString('name', name, 'onlyInStock', onlyInStock))
    }


    const handleChange = ({ target }: any) => {
        const name = target.name
        const value = target.value
        setFilter(prevFilter => ({ ...prevFilter, [name]: value }))
    }


    return <section>
        <form className="toy-filter flex space-between align-center">
            <div className="form-item">
                <TextField
                    id="outlined-basic"
                    label="Search by name"
                    variant="outlined"
                    name="name"
                    onChange={handleChange} />
            </div>
            <div className="form-item">
                <NativeSelect
                    name="onlyInStock"
                    onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="true">In stock</option>
                </NativeSelect>
            </div>
        </form>
    </section>

}