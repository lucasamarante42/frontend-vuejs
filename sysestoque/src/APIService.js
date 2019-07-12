import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export class APIService{

constructor(){
}

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

getCategories() {
    const url = `${API_URL}/api/v1/categories`
    return axios.get(url).then(response => response.data)
}

deleteProduct(id) {
    const url = `${API_URL}/api/v1/products/${id}`
    return axios.delete(url).then(response => response)
}

updateProduct(id, product) {
    const url = `${API_URL}/api/v1/products/${id}`
    return axios.put(url, product).then(response => response)
}

}