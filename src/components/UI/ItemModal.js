import React from "react";
import './ItemModal.css';
const ItemModal = (props) => {
    return (
        <div className='Item_Modal'>
            {props.children}
        </div>
    )
}
export default ItemModal;