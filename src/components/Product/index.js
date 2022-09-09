import React, { useState } from "react"
import "./index.css"
import { useContext, useReducer } from "react"
import { UserDataContext } from "../../context"
import { deleteData, changeData } from "../../context"
import Popup from "../Popup"
import close from "../../images/close.png"
import pen from "../../images/pen.png"

const Product = () => {
    const context = useContext(UserDataContext)
    const [isOpen, setIsOpen] = useState(null)
    
    const popup = (id) => {
        setIsOpen(id)
    }
    return (
        <div className="container">
            {isOpen && <Popup popup = {popup} id = {isOpen}/>}
                <div className="product-wrapper">
                {
                    context.state.userData && 
                    context.state.userData.map((item, i) => (
                        <div className="product" key={i}>
                            <div className="btns">
                                <img className="btn change" src={pen} onClick={() => {
                                    item && popup(item.id)
                                }}/>
                                    <img className="btn delete" src={close} onClick={() => {
                                    deleteData(item.id, context.dispatch)
                                }}/>

                                
                            </div>
                            <div className="img-wrapper">
                                <img src={item.image} />
                            </div>
                            <div className="info-wrapper">
                                <h3>{item.title}</h3>
                                <h4>{item.price}$</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Product