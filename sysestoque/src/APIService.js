import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export class APIService{

constructor(){
}
// products
getProducts() {
    const url = `${API_URL}/api/v1/products`
    return axios.get(url).then(response => response.data)
}

getProduct(id) {
    const url = `${API_URL}/api/v1/products/${id}`
    return axios.get(url).then(response => response.data);
}

createProduct(product){
    const url = `${API_URL}/api/v1/products/`
    return axios.post(url, product);
}

deleteProduct(id) {
    const url = `${API_URL}/api/v1/products/${id}`
    return axios.delete(url).then(response => response)
}

updateProduct(id, product) {
    const url = `${API_URL}/api/v1/products/${id}`
    return axios.put(url, product).then(response => response)
}

//categories
getCategories() {
    const url = `${API_URL}/api/v1/categories`
    return axios.get(url).then(response => response.data)
}

createCategory(category){
    const url = `${API_URL}/api/v1/categories/`
    return axios.post(url, category);
}

deleteCategory(id) {
    const url = `${API_URL}/api/v1/categories/${id}`
    return axios.delete(url).then(response => response)
}

updateCategory(id, category) {
    const url = `${API_URL}/api/v1/categories/${id}`
    return axios.put(url, category).then(response => response)
}

//clients
getClients(){
    const url = `${API_URL}/api/v1/clients`
    return axios.get(url).then(response => response.data)
}

deleteClient(id) {
    const url = `${API_URL}/api/v1/clients/${id}`
    return axios.delete(url).then(response => response)
}

createClient(client){
    const url = `${API_URL}/api/v1/clients/`
    return axios.post(url, client).then(response => response.data)
}

updateClient(id, client) {
    const url = `${API_URL}/api/v1/clients/${id}`
    return axios.put(url, client).then(response => response)
}

//client address
createClientAddress(client_address){
    
    const url = `${API_URL}/api/v1/client_addresses/`
    return axios.post(url, client_address).then(response => response.data).catch(error => console.log(error))

    
}


}