import { useEffect, useState } from "react"
import CompanyLogo from "../CompanyLogo"
import PortfolioCard from "./PortfolioCard"

function Portfolio(){
    const [mystockdata , setMystockdata] = useState()
    const [user ,setuser ] = useState()
    useEffect(() => {
       async function fetchmystock(){
            const res = await fetch("http://localhost:8080/getUser",{
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("jwt")
                }
            })
            const data = await res.json()
            setuser(data)
            console.log(data)
            const res2 = await fetch("http://localhost:8080/getStockdata",{
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("jwt")
                }
            })
            const data2 = await res2.json()
            setMystockdata(data2)
            console.log(data2)
       }
       fetchmystock() 
    },[])

    return(
        <>
            <div className="w-full flex justify-between p-4">
            <div className="w-auto">
                <span className="text-3xl font-extrabold text-green-400">Stock X Change</span>
                <span className="text-center ml-4 font-extrabold text-purple-500 text-4xl">Portfolio</span>
                <p>Invest Today Rise Tomorrow</p>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 inline mr-6 hover:cursor-pointer">
                    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                    <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-neutral-500 p-2 text-2xl"></span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 inline mr-3 hover:cursor-pointer">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
            </div>
            </div> 
            <p className="mx-10 font-extrabold">View Your Stocks</p>
            <div className="w-full px-10 h-fit">

                {
                    user?.stocks?.map((stock) => {
                        return(
                            <PortfolioCard stock={stock} mystockdata={mystockdata}></PortfolioCard>
                        )
                        
                    })
                }
                
            </div>
        </>
    )
}
export default Portfolio
