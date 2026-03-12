import { useEffect, useState } from "react"
import {Chart as ChartJS, Colors} from"chart.js/auto"
import CompanyLogo from "../CompanyLogo"
import {Line,Pie} from "react-chartjs-2"
import { useNavigate, useNavigation } from "react-router-dom"
function Dashboard(){
    
    const [yourstock,setYourStock] = useState([])
    const [yourdata,setYourdata] = useState({})
    const [indivdualTotalinvested,setIndivdualTotalinvested] = useState({})
    const [topgainers,setTopgainers] = useState([])
    const [toplosers,setToplosers] = useState([])
    const [labels,setLabels] = useState([])
    const [piedata,setPiedata] = useState([])
    const apikey = import.meta.env.VITE_API_KEY
    const nav = useNavigate()

    useEffect(() => {
        async function loadYourStock(){
            const res = await fetch("http://localhost:8080/getUser",{
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem("jwt")
                }
            })
            if(res.status != 200){
                nav("/")
            }
            const data = await res.json()
            setYourStock(data.stocks)
            setYourdata({
            "username" : data.username,
            "email" : data.email,
            "balance" : data.balance
        })
        }
        async function loadTrending(){
            const res = await fetch("https://stock.indianapi.in//trending",{
                method : "GET",
                headers : {
                    "x-api-key" : apikey
                }
            })
            const data = await res.json()
            setTopgainers(data.trending_stocks.top_gainers)
            setToplosers(data.trending_stocks.top_losers)
        }
        loadYourStock()
        loadTrending()
    },[])

    useEffect(() => {
        const indivdualstock = {}
        const totalInvested = (yourstock || []).reduce((total, stock) => {
            let quantity = 0;
            let totalCost = 0;
            (stock.transactions || []).forEach(tx => {
                if (tx.transaction_type === "BUY") {
                    quantity += tx.quantity;
                    totalCost += tx.quantity * tx.price;
                } else {
                    const avgCost = quantity ? totalCost / quantity : 0;
                    quantity -= tx.quantity;
                    totalCost -= avgCost * tx.quantity;
                }
                indivdualstock[stock.company_name] = totalCost
            });
            return total + totalCost;
        }, 0);
        setIndivdualTotalinvested(indivdualstock)
            const Lresult = yourstock.map((stock) => {return( stock.company_name)}) || []
            const Dresult = yourstock.map((stock) => {return (stock.quantity)}) || []
            setLabels(Lresult)
            setPiedata(Dresult)
    },[yourstock])

    return(
        <>
        <div className="w-full flex justify-between p-8">
            <div className="w-auto">
                <span className="text-2xl ">Welcome to </span>
                <span className="text-3xl font-extrabold text-green-400">Stock X Change</span>
                <p>Invest Today Rise Tomorrow</p>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 inline mr-6 hover:cursor-pointer">
                    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                    <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-neutral-500 p-2 text-2xl">{yourdata.username}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 inline mr-3 hover:cursor-pointer">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
            </div>
        </div> 
        
        <div className="flex gap-6">
            <div className="w-200 h-100">
                <h1 className="text-2xl font-bold">Portfolio summary 2026</h1>
                <Line data = {{
                    labels : ["jan","feb","march","april","may","june","july","aug","sept","oct","nov","dec"],
                    datasets : [
                        {
                            label : "Return",
                            data : [100,45,23]
                        }
                    ]
                }}
                options={{
                    maintainAspectRatio : false,
                    fill:true
                }}
                >
                </Line>
            </div>
            <div className="  w-100 h-100">
                <div className="flex w-full justify-between">
                <span className="font-bold text-2xl">Trending Stock</span> 
                <span className="font-bold text-green-500 hover:cursor-pointer">View All</span>                   
                </div>

                <div className="shadow-md rounded-2xl p-2 overflow-hidden">
                    <h1 className="text-center text-green-600 font-bold">Top Gainers</h1>
                    <table className="w-full text-left">
                        <thead>
                            <tr >
                                <th className=" text-neutral-600 p-3">#</th>
                                <th className=" text-neutral-600 p-3">stock_name</th>
                                <th className=" text-neutral-600 p-3">price</th>
                                <th className=" text-neutral-600 p-3">percent_change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topgainers.map((stock,index) => {
                                if(index < 3){
                                     return(
                                        <tr key={stock.ticker_id}>
                                            <td className="p-3 text-left" >{index + 1}</td>
                                            <td className="p-3 text-left">{stock.company_name}</td>
                                            <td className="p-3 text-left">{stock.price}</td>
                                            <td className="p-3 text-left">{stock.percent_change}</td>
                                        </tr>
                                    )
                                }
                                else return null
                            })}
                        </tbody>
                    </table>
                    <h1 className="text-center text-red-600 font-bold">Top Loses</h1>
                    <table className="w-full text-left">
                        <thead>
                            <tr >
                                <th className=" text-neutral-600 p-3">#</th>
                                <th className=" text-neutral-600 p-3">stock_name</th>
                                <th className=" text-neutral-600 p-3">price</th>
                                <th className=" text-neutral-600 p-3">percent_change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {toplosers.map((stock,index) => {
                                if(index < 2){
                                     return(
                                        <tr key={stock.ticker_id}>
                                            <td className="p-2 text-left" >{index + 1}</td>
                                            <td className="p-2 text-left">{stock.company_name}</td>
                                            <td className="p-2 text-left">{stock.price}</td>
                                            <td className="p-2 text-left">{stock.percent_change}</td>
                                        </tr>
                                    )
                                }
                                else return null
                            })}
                        </tbody>
                    </table>
                </div>
                    
            </div>
        </div><br></br>
        <div className="flex w-full gap-4  mt-20">
            <div className="w-200">
               <div className="flex w-full justify-between mb-3">
                <span className="font-bold text-2xl">Your Portfolio</span> 
                <span className="font-bold text-green-500 hover:cursor-pointer">View All</span>                   
                </div>
                {yourstock.map((stock) => {
                    return(
                        <div className="w-full h-25 rounded-3xl my-8 flex p-6 justify-between shadow-[0px_0px_4px_rgb(0,0,0,0.2)]">
                            <div className="flex justify-between w-full">
                                <div className="flex gap-4">
                                    <CompanyLogo  domain={stock.company_name}></CompanyLogo>
                                    <div>
                                        <h1 className=" font-bold">{stock.company_name}</h1>
                                    <p className="text-neutral-400">A Multimedia company</p>
                                    </div>                            
                                </div>
                                <div className="flex gap-16">
                                    <div>
                                        <h1 className="font-bold">{indivdualTotalinvested[stock.company_name]}</h1>
                                        <p className="text-neutral-400">Total Invested</p>
                                    </div>
                                    <div>
                                        <h1 className="font-bold text-green-400">{stock.quantity}</h1>
                                        <p className="text-neutral-400">Stocks owned</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="pl-4">
                <h1 className="font-bold text-2xl">Your Holdings</h1>
                {labels.length > 0 &&  
                    <Pie className="ml-4"
                    data = {{
                        labels : labels,
                        datasets : [
                            {
                                label : "holding",
                                data : piedata
                            }
                        ]
                    }}>
                    </Pie>  || <h1>loading..</h1>
                }
            </div>
        </div>
        </>
    )
}

export default Dashboard