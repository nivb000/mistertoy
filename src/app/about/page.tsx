"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Map } from '@/cmps/map'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher';
import { Spinner } from '@/cmps/spinner';
import { Toy } from '@/interfaces/toy';


export default function About() {

    ChartJS.register(ArcElement, Tooltip, Legend)
    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
    const { data: toys, isLoading } = useSWR('/api/toy', fetcher)
    let chartData
    const toysLabels: {[key: string]: number} = {}
    
    const getToysData = () => {
        labels.forEach(label => {
            const toysWithLabel = toys.filter((toy: Toy) => toy.labels.includes(label))
            toysLabels[label] = toysWithLabel.length
        })
    }

    if(toys) getToysData()

    if(Object.keys(toysLabels).length !== 0){
        chartData = {
            labels,
            datasets: [
                {
                    label: '# of Prices',
                    data: Object.values(toysLabels),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 109, 64, 0.7)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 109, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    }


    return <section className='about-us'>
        <div className='main-content'>
            <h1>About us</h1>
            <p>This is demo store project where you can add new toys, remove, edit, view details.
            Project Is builded with Next.js 13.2 Beta version with App directory, Next-auth, SASS, fetch requests, Rest API Prisma ORM and more.
            </p>
            <h1>Dashboard</h1>
            <div className='flex justify-center dashboard-container'>
                {isLoading || !chartData ?
                    <Spinner /> :
                    <Doughnut data={chartData} />
                }
            </div>
            <h1>Our branches 🏪</h1>
            <Map />
        </div>
        </section>

}