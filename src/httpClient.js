import axios from 'axios';

export function fetchShoppingData() {
    return axios.get('http://sku-warehouse-3.us-east-1.elasticbeanstalk.com/items')
        .then(data => {return data.data.data});
}

export function getOneParticularItem(id1) {
   return axios.get('http://sku-warehouse-3.us-east-1.elasticbeanstalk.com/item/' + id1)
   .then(data=>{return data.data.data})    
    
}

export function updateItemFromList(id1, updatedName, updatedQuantity) {
    const payload = {
        name:updatedName,
        quantity:updatedQuantity
    }
    return axios.put(`http://sku-warehouse-3.us-east-1.elasticbeanstalk.com/item/${id1}`,payload)
    .then(data=> {return data.data.data}) 
}

export function addItemToList(newQuatity,newName) {
    const payload = {
        name:newName,
        quantity:newQuatity
    }
    return axios.post('http://sku-warehouse-3.us-east-1.elasticbeanstalk.com/items' ,payload)
    .then(data=> {return data.data.data})
}

export function deleteItemFromList(id1) {
    return axios.delete('http://sku-warehouse-3.us-east-1.elasticbeanstalk.com/item/'+ id1)
    .then(data=> {return data.data.data})
}