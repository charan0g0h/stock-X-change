import CompanyLogo from "../CompanyLogo"
import { useState,useEffect } from "react"

function Stockcard(props){
    const [domain,setDomain] = useState()
    useEffect(() => {
        setDomain(props.company.replaceAll(" ",""))
    },[props.company])

    return(
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 hover:cursor-pointer  hover:shadow-xl transition duration-300">
                    <div className="flex items-center gap-8 justify-between"> 
                        <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <CompanyLogo domain={domain} />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {props.company}
                        </h1>
                        </div>
                        <div className="text-right">
                        <h1 className="text-2xl font-bold text-gray-900">
                            ₹{props.price}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Price
                        </p>
                        </div>
                    </div>
                    <div className="my-4 border-t border-gray-200"></div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600 text-sm">
                        {props.type}
                        </p>
                        <h2 className={`text-lg font-semibold ${props.type == "52_week_high" ? "text-green-500" : "text-red-500"}`}>
                        ₹ {props.percent}
                        </h2>
                    </div>
    </div>
    )
}
export default Stockcard