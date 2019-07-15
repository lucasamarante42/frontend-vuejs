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

getClientAddressByID(id) {
    const url = `${API_URL}/api/v1/client_addresses/${id}`
    return axios.get(url).then(response => response)
}

//sellers
getSellers() {
    const url = `${API_URL}/api/v1/sellers`
    return axios.get(url).then(response => response.data)
}

createSeller(seller){
    const url = `${API_URL}/api/v1/sellers/`
    return axios.post(url, seller);
}

deleteSeller(id) {
    const url = `${API_URL}/api/v1/sellers/${id}`
    return axios.delete(url).then(response => response)
}

updateSeller(id, seller) {
    const url = `${API_URL}/api/v1/sellers/${id}`
    return axios.put(url, seller).then(response => response)
}

getOrders() {
    const url = `${API_URL}/api/v1/orders`
    return axios.get(url).then(response => response.data)
}

createOrder(order){
    const url = `${API_URL}/api/v1/orders/`
    return axios.post(url, order);
}

createItenOrder(iten_order){
    const url = `${API_URL}/api/v1/orders_itens/`
    return axios.post(url, iten_order);
}

deleteOrder(id){
    const url = `${API_URL}/api/v1/orders/${id}`
    return axios.delete(url).then(response => response)
}

updateOrder(id, order){
    const url = `${API_URL}/api/v1/orders/${id}`
    return axios.put(url, order).then(response => response)
}

getZipAddress(zip) {
    const url = `https://webmaniabr.com/api/1/cep/${zip}?app_key=NnxhXtzLOLmrI3dgjgOxgTUa3RzTIbaB&app_secret=vBW64VhvLeenNbxnGLNIG8uQmVBT2tptaCXd0br9iHasX8ky`
    return axios.get(url).then(response => response)
}

}