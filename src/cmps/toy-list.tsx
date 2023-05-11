import { ToyPreview } from "./toy-preview"
import { Toys } from "@/interfaces/toy"

export const ToyList = ({ toys, user } : {toys: Toys, user: any}) => {

    return <section className='toy-list'>
        {toys.map(toy => <ToyPreview key={toy.id} toy={toy} user={user} />)}
    </section>
}