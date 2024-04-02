import { useState } from 'react';
import Card from 'react-bootstrap/Card';


export function CartItem({ item, isEditMode, onEditClick, onAddItem, onRemoveItem, onDeleteItem, resetEdit, updatedValues }) {

  let title = '';
  let qty = '';
  let editUI = <></>

  const [originalItemValue, updateOriginalItemValue] = useState(item.name);
  const [originalQtyValue, updateOriginalQtyValue] = useState(item.quantity);

  function updateItemValue(e) {
    updateOriginalItemValue(e.target.value)
  }

  function updateQtyValue(e) {
    updateOriginalQtyValue(e.target.value)
  }

  function saveUpdatedData(event) {
    event.preventDefault();
    updatedValues(item.id,  originalItemValue , originalQtyValue)
  }

  if (isEditMode) {
    title = <input value={originalItemValue} onChange={e => updateItemValue(e)}></input>
    qty = <input value={originalQtyValue} onChange={e => updateQtyValue(e)}></input>;

    editUI = <div style={{ float: 'right', margin: 'auto' }}>
      <button style={{ width: '50px' }} onClick={e => saveUpdatedData(e)}>Save</button>
      <button style={{ width: '70px' }} onClick={resetEdit}>Cancel</button>
    </div>

  } else {
    title = <Card.Body>{item.name}</Card.Body>
    qty = <>
      <Card.Body style={{ marginTop: '-6%' }}> Quantity: {item.quantity}</Card.Body>
      <div> <button style={{ width: '25px' }} onClick={event => onAddItem(item.id, item.name, item.quantity)}>+</button></div>
      <div><button style={{ width: '25px' }} onClick={event => onRemoveItem(item.id, item.name, item.quantity)}>-</button></div>
      <div> <button onClick={event => onDeleteItem(item.id)}>Del</button> </div>
    </>
  }

  return <Card style={{ width: '25%', padding: '2%', backgroundColor: '#f5f5f5', margin: '10px' }}>
    {title}
    <div className='content'>
      {qty}
    </div>
    <button style={{ width: '50px' }} onClick={event => onEditClick(item.id)}>Edit</button>
    {editUI}
  </Card>
}