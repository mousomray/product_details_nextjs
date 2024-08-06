
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router' // Routing for next
import { singleproduct } from '@/Reducer/reducer'
import Link from 'next/link'



const Index = () => {

    //Substitute of useParams
    const router = useRouter()
    const { id } = router.query
    
    const dispatch = useDispatch();

    // Get Product For Use Query 
    const getSingleProductdata = async () => {
        const response = await dispatch(singleproduct(id)) // Call Product function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: singleproductdata, error, refetch } = useQuery({
        queryKey: ['singleproduct', id], // In NextJS pass id in dependency is must 
        queryFn: getSingleProductdata // This line of code work as same as useEffect()
    })

    return (
        <>


            <div className='container' style={{ marginTop: '150px' }}>
                <img src={singleproductdata?.image} alt="" style={{ height: '300px' }} />
                <h1>{singleproductdata?.title}</h1>
                <p><b>Price :</b> {singleproductdata?.price}</p>
                <p><b>Description :</b> {singleproductdata?.description}</p>
                <Link rel="stylesheet" href="/product" >
                    <button className='btn-primary'>
                        Back to Product
                    </button>
                </Link>
            </div>


        </>
    )
}

export default Index
