import { ToyPreview } from "./toy-preview"
import { Toys } from "@/interfaces/toy"

export const ToyList = ({ toys } : {toys: Toys}) => {

    return <section className='toy-list'>
        {toys.map(toy => <ToyPreview key={toy.id} toy={toy} />)}
    </section>
}