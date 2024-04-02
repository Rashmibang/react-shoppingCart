import { useState } from "react";

export  function NewItemsAdded({onSave}){

    const [itemValue, setItemValue] = useState('');
    const [quantityValue, setQuanityValue] = useState('');

    function newItemValue(e) {
        setItemValue(e.target.value)
    }
    
    function newQuantity(e) {
        setQuanityValue(e.target.value)
    }

    function onSubmit(event) {
        event.preventDefault();
        onSave({item:itemValue,quantity:quantityValue})
    }
    
    
    return (
        <div>
            <form onSubmit={onSubmit} >
                <label >Enter New Item:<input type='text' value={itemValue} onChange={event => newItemValue(event)} /></label>
                <label >Enter Qunatity:<input type='text' value={quantityValue} onChange={event => newQuantity(event)} /></label>
                <button type="submit" style={{ margin: '15px' }}>Click me!!!</button>
            </form>
        </div>
    )
}

