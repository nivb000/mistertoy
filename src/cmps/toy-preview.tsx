"use client"
import { useState, forwardRef } from 'react'
import Link from 'next/link'
import Fab from '@mui/material/Fab'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSession } from 'next-auth/react'
import { httpService } from '@/services/http.service'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { Toy } from '@/interfaces/toy'

const Alert = forwardRef < HTMLDivElement, AlertProps> (function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export const ToyPreview = ({ toy } : {toy: Toy}) => {

    const { data } = useSession()
    const [isHovering, setIsHovering] = useState(false)
    const [alertData, setAlertData] = useState({
        open: false,
        msg: '',
    })

    const handleMouseOver = () => {
        setIsHovering(true)
    }
    const handleMouseOut = () => {
        setIsHovering(false)
    }

    const handleDelete = async (id : string) => {
        await httpService.delete(`toy/${id}`)
        setAlertData({ open: true, msg: `Toy ${id} has deleted successfully` })
        window.location.reload()
    }

    return <>
        <div className="toy-preview flex col align-center" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <Link href={`/toy/${toy.id}`}><img src={`https://robohash.org/${toy.name}?set=set4`} alt="Toyimg" /></Link>
            <h1>{toy.name}</h1>
            <p>{toy.price}.00$</p>
            {isHovering && data?.user.role === 'ADMIN' &&
                <div className='preview-btns'>
                    <Link href={`/edit/${toy.id}`}>
                        <Fab size="small" color="primary" aria-label="add">
                            <EditIcon />
                        </Fab>
                    </Link>
                    <Fab size="small" color="error" aria-label="add">
                        <DeleteIcon onClick={() => handleDelete(toy.id)} />
                    </Fab>
                </div>
            }
        </div>
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