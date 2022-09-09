import React, { useContext } from "react"
import { useEffect } from "react"
import { getData } from "../context"
import { UserDataContext } from "../context"
import Heading from "../components/Heading"

// components
import Product from "../components/Product"

const BrandPage = () => {
    const context = useContext(UserDataContext)
    useEffect(() => {
        getData(context.dispatch)
    }, [])
    
    return (
        <div className="main">
            <Heading />
            <Product />
        </div>
    )
}
export default BrandPage