import prisma from "@/lib/prismadb"
import { redirect } from "next/navigation"

async function create(formData: FormData) {
    "use server"
    const toy = await prisma.toy.create({
        data: {
            name: formData.get('name'),
            price: +formData.get('price'),
            labels: formData.getAll('labels'),
            createdAt: Date.now().toString(),
            inStock: formData.get('inStock') === 'true' ? true : false
        }
    })
    redirect(`/toy/${toy.id}`)
}

const AddNewPageExp = () => {

    const labels = [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor'
    ]

    return <section className={`flex col align-center toy-edit`}>
        <h1>Toy Edit</h1>
        <div className="flex space-around align-center edit-container">
            <div className="edit-left">
                <form className="flex col space-between" action={create}>
                    <div className='flex space-between form-item'>
                        <label htmlFor="name">Name &nbsp;</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className='flex space-between form-item'>
                        <label htmlFor="price">Price &nbsp;</label>
                        <input type="number" inputMode="numeric" name="price" id="price" />
                    </div>
                    <div className='flex space-between form-item'>
                        <label htmlFor="inStock">Stock</label>
                        <select name="inStock" id="inStock">
                            <option value="true">In stock</option>
                            <option value="false">Out of stock</option>
                        </select>
                    </div>
                    <div className='flex col space-between form-item'>
                        <h3>Labels</h3>
                        {labels.map(label => (
                            <>
                                <label htmlFor="labels">{label}</label><br />
                                <input type="checkbox" id="labels" name="labels" value={label} />
                            </>
                        ))}
                    </div>
                    <button className="add-new-edit-btn">Add new toy</button>
                </form>
            </div>
        </div>
    </section>
}

export default AddNewPageExp