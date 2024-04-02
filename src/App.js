import './App.css';
import { useEffect, useState } from 'react';
import { fetchShoppingData, updateItemFromList, deleteItemFromList, addItemToList } from './httpClient'
import { CartItem } from './Components/CartItem';
import { NewItemsAdded } from './Components/NewItemsToAdd';

// const a = 10
// const b = () => {}

// const c = a + 10
// const d = b()

function App() {
  let heading = 'Shopping experience';
  const [shoppingItems, setShoppingData] = useState([]);
  const [currentlyEditingId, setCurrentlyEditingId] = useState('');

  useEffect(() => {
    fetchShoppingData().then(data => setShoppingData(data))
  }, []);


  function additems(id, name, quantity) {
    quantity = parseInt(quantity) + 1;
    updateItemFromList(id, name, quantity).then(data => {
      let foundElement = shoppingItems.find((data) => data.id === id);
      foundElement.quantity = data.quantity;
      foundElement.name = data.name;
      setShoppingData([...shoppingItems])
    })
  }

  function removeItems(id, name, quantity) {
    quantity = parseInt(quantity) - 1;
    updateItemFromList(id, name, quantity).then(data => {
      let foundElement = shoppingItems.find((data) => data.id === id);
      foundElement.quantity = data.quantity;
      foundElement.name = data.name;
      setShoppingData([...shoppingItems])
    })
  }

  function updateEntries(id, name , quantity){
    updateItemFromList(id,name, quantity).then(data=>{
      let foundElement = shoppingItems.find((data) => data.id === id);
      foundElement.quantity = data.quantity;
      foundElement.name = data.name;
      setShoppingData([...shoppingItems]);
      setCurrentlyEditingId('')
    })
    
  }

  function deleteItem(id) {
    let item = shoppingItems.find(i => i.id === id);
    let index = shoppingItems.map(item => item.id).indexOf(id);
    deleteItemFromList(id).then(data => {
      if (data.status == 'ok') {
        shoppingItems.splice(index, 1)
        setShoppingData([...shoppingItems])
      }
    })
  }

  function addnewItems(event) {
    addItemToList(event.quantity, event.item).then(data => {
      setShoppingData([...shoppingItems, data])
    })
  }

  let shoppingListView= shoppingItems.map((item, index) => <CartItem key={index + '-' + item.id} item={item} onAddItem={additems} onEditClick={setCurrentlyEditingId}
      onRemoveItem={removeItems} onDeleteItem={deleteItem} isEditMode={currentlyEditingId == item.id} resetEdit={e => setCurrentlyEditingId('')}
      updatedValues={updateEntries}></CartItem>)
  
  return (
    <div >
      < NewItemsAdded onSave={addnewItems} ></NewItemsAdded>
      <h1> {heading}</h1>

    <div className='aligned'>
      {shoppingListView}
    </div>
  
    </div>
  );
}

export default App;