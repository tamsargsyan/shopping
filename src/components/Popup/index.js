import React, {useState, useContext} from "react"
import "./index.css"
import close from "../../images/close.png"

import { changeData, UserDataContext } from "../../context"

const Popup = ({popup, id}) => {
    const context = useContext(UserDataContext)
    
    const [stateId, setStateId] = useState({
        title: context.state.userData.find(item => item.id === id).title,
        price: context.state.userData.find(item => item.id === id).price
    })
    
    const handle = (e) => {
        setStateId((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <div className="popup-wrapper">
                <h2>You can change name and price of this product</h2>
                <div className="close-popup">
                    <img src={close} onClick={() => popup(null)} />
                </div>
                <form>
                    <input type="text" name="title" value={stateId.title} onChange={handle}/>
                    <input type = "text" name = "price" value = {stateId.price} onChange={handle}/>
                    <button onClick={(e) => {
                        e.preventDefault()
                        popup()
                        changeData(id, stateId, context.dispatch)
                    }}>enter</button>
                </form>
            </div>
    )
}

export default Popup