import { Spinner } from "@/cmps/spinner";

export default function loading(){
    return <div style={{height: 'calc(100vh - 70px)'}}>
        <Spinner />
    </div>
}