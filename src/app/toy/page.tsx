import Link from "next/link"
import { ToyList } from "@/cmps/toy-list"
import { ToyFilter } from "@/cmps/toy-filter"
import { httpService } from "@/services/http.service"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { Toy } from "@/interfaces/toy"

async function getData(searchParams : any) {
  try {
    let toys = await httpService.get('toy')
    let { name, onlyInStock } = searchParams
    onlyInStock = (onlyInStock === 'true') ? true : false
    const regex = new RegExp(name, 'i')
    toys = toys?.filter((toy: Toy) => regex.test(toy.name) && (!onlyInStock || toy.inStock))
    return toys
  } catch (error) {
    console.log(error)
  }
}


export default async function ToysPage({ searchParams } : {searchParams: any}) {

  const toys = await getData(searchParams)
  const data = await getServerSession(authOptions)

  return <section className='main-content main-layout toy-app'>
    {data && data.user?.role === "ADMIN" &&
      <Link href='/edit'>
        <button className="add-btn">Add new toy</button>
      </Link>
    }
    <ToyFilter />
    <ToyList toys={toys} user={data?.user} />
  </section>
}