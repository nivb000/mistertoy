"use client"
import { useState, forwardRef } from "react"
import { TextField, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { httpService } from "@/services/http.service"
import useSWR from 'swr'
import { fetcher } from "@/lib/fetcher"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@/cmps/spinner"
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { MultipleSelect } from "@/cmps/muilti-select"
import { Righteous } from 'next/font/google'

const headerFont = Righteous({ subsets: ['latin'], weight: '400' })

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

const EditPage = ({ params }) => {

    const { data, isLoading } = useSWR(`/api/toy/${params.id}`, fetcher)
    const router = useRouter()
    const [alertData, setAlertData] = useState({
        open: false,
        msg: '',
    })
    const [toy, setToy] = useState({
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now().toString(),
        inStock: true,
    })

    useEffect(() => {
        if (data) setToy(data)
    }, [data])


    const handleChange = ({ target }: any) => {
        const name = target.name
        let value: string | boolean | string[] | number
        switch (name) {
            case 'price':
                value = +target.value
                break;
            case 'inStock':
                value = (target.value === 'true') ? true : false
                break
            case 'labels':
                value = (typeof target.value === 'string') ? value.split(',') : target.value
            case 'name':
                value = target.value
                break
        }
        setToy(prevToy => ({ ...prevToy, [name]: value }))
    }

    const handleSave: React.FormEventHandler = async (ev) => {
        ev.preventDefault()
        const updatedToy = await httpService.put('/toy/', toy)
        setAlertData({ open: true, msg: `Toy ${updatedToy.id} updated successfully` })
        setTimeout(() => {
            router.push("/toy")
        }, 1000)
    }


    if (isLoading) return <Spinner />
    return <>
        <section className={`flex col align-center ${headerFont.className} toy-edit`}>
            <h1>Toy Edit</h1>
            <div className="flex space-around align-center edit-container">
                <div className="edit-left">
                    <form className="flex col space-between" onSubmit={handleSave}>
                        <div className='form-item'>
                            <TextField id="standard-input" variant="standard" label="Toy Name" value={toy.name} name="name" onChange={handleChange} />
                        </div>
                        <div className='form-item'>
                            <TextField id="standard-input" variant="standard" label="Toy Price" type="number" value={toy.price} name="price" onChange={handleChange} />
                        </div>
                        <div className="form-item">
                            <MultipleSelect
                                toyLabels={toy?.labels}
                                handleChange={handleChange} />
                        </div>
                        <div className='flex space-between form-item'>
                            <label htmlFor="inStock">Stock:</label>
                            <select name="inStock" id="inStock" value={toy.inStock.toString()} onChange={handleChange}>
                                <option value="true">In stock</option>
                                <option value="false">Out for stock</option>
                            </select>
                        </div>
                        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                            Save
                        </Button>
                    </form>
                </div>
                <div className="flex justify-center edit-right">
                    <img src={`https://robohash.org/${toy?.name}?set=set4`} alt="Toy preview image" />
                </div>
            </div>
        </section>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={alertData.open}
            autoHideDuration={1000} onClose={
                () => setAlertData(prev => ({ ...prev, open: false }))}>
            <Alert onClose={() => setAlertData(prev => ({ ...prev, open: false }))}
                severity="success" sx={{ width: '100%' }}>
                {alertData.msg}
            </Alert>
        </Snackbar>
    </>

}

export default EditPage