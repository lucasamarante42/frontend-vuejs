<template>
  <div class="products">
    <h3>Pedidos</h3>
    <div class="card">
      <div class="card-header">
        Crie seu pedido aqui:
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">

          <div class="form-group">
            <select v-model="orderData.order_client" class="form-control ml-sm-2 mr-sm-4 my-2">
              <option value="">Escolha o cliente</option>
              <option v-for="client in clients" v-bind:value="client.id">
                {{ client.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <select v-model="orderData.order_seller" class="form-control ml-sm-2 mr-sm-4 my-2">
              <option value="">Escolha o vendedor</option>
              <option v-for="seller in sellers" v-bind:value="seller.id">
                {{ seller.name }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <input v-model="orderData.order_total_quantity" type="number" placeholder="Quant. Total" class="form-control ml-sm-2 mr-sm-4 my-2 " >
          </div>
          <div class="form-group">
            <input v-model="orderData.order_price" v-money="money" placeholder="Preço" class="form-control ml-sm-2 mr-sm-4 my-2 size_field">
          </div>
          <div class="form-group">
            <input v-model="orderData.order_date" placeholder="Data" onfocus="(this.type='date')" onblur="(this.type='text')" id="date" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" >
          </div>

        <table class="table">
        <thead>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows">

              <td>
                <select v-model="row.order_product" class="form-control ml-sm-2 mr-sm-4 my-2">
                  <option value="">Escolha o produto</option>
                  <option v-for="product in products" v-bind:value="product.id">
                    {{ product.name }}
                  </option>
                </select>
              </td>
            
              <td><input v-model="row.order_total_quantity" type="number" placeholder="Quant." class="form-control ml-sm-2 mr-sm-4 my-2 size_field" ></td>
              <td>
                  <a v-on:click="removeElement(index);" style="cursor: pointer">Remove</a>
              </td>
          </tr>
        </tbody>
        </table>

          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Salvar</button>            
          </div>
        </form>
        <div>
            <button class="button btn-primary" @click="addRow">+ item</button>
        </div>
      </div>
    </div>


    <div class="card mt-5">
      <div class="card-header">
        Lista de Pedidos
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  ID
                </th>
                <th>
                  Nome do Cliente
                </th>
                <th>
                  Nome do Vendedor
                </th>
                <th>
                  Quantidade Total
                </th>
                <th>
                  Valor Total
                </th>
                <th>
                  Data
                </th>
                <th>
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" v-bind:key="order.id">
                <template v-if="editId == product.id">
                  <td>{{ editId }}</td>
                  <td><input v-model="editProductData.product_name" type="text"></td>
                  <td><input v-model="editProductData.product_description" type="text"></td>
                  <td> <select v-model="editProductData.product_description_category">
                        <option v-for="category in categories" v-bind:value="category.id">
                          {{ category.description }}
                        </option>
                      </select>
                  </td>
                  <td><input v-model="editProductData.product_total_quantity" type="number"></td>
                  <td><input v-model="editProductData.product_price" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(product.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{product.id}}
                  </td>
                  <td>
                    {{product.name}}
                  </td>
                  <td>
                    {{product.description}}
                  </td>
                  <td>
                    {{product.category_description}}
                  </td>
                  <td>
                     {{product.total_quantity}}
                  </td>
                  <td>
                    R${{product.price}}
                  </td>
                  <td>

                    <a href="#" class="icon">
                      <i v-on:click="onDelete(product.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(product)" class="fa fa-pencil"></i>
                    </a>
                    <!-- <router-link 
                     :to="{
                       name:'ProductPage', 
                       params:{id: product.id}
                     }" 
                     class="icon"
                     >
                       <i class="fa fa-eye"></i>
                    </router-link> -->
                  </td>
                </template>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {APIService} from '../APIService';

const API_URL = 'http://127.0.0.1:8000';
const apiService = new APIService();

export default {
  name: 'Orders',
  data () {
    return {
      editId: '',
      orderData: {
        'id' : '',
        'order_client': '',
        'order_seller': '',
        'order_total_quantity': '',
        'order_price': '',
        'order_date': ''

      },
      editOrderData: {
        'id' : '',
        'order_client': '',
        'order_seller': '',
        'order_total_quantity': '',
        'order_price': '',
        'order_date': ''
      },
      clients: [],
      sellers: [],
      rows: [],
      products: [],
      orders: [],
      money: {
        decimal: '.',
        thousands: '',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    }
  },
  created() {
    // this.getProducts()
  },
  mounted() {

    // busca os clients ao carregar a pagina
    this.getAPIClients();

    //busca os vendedores 
    this.getAPISellers();

    // busca os produtos ao carregar a pagina
    this.getAPIProducts();

  },
  computed:{
    
  },
  methods: {

    addRow: function() {
        var elem = document.createElement('tr');
        this.rows.push({
            order_product: "",
            order_total_quantity: ""            
        });
    },

    removeElement: function(index) {
        this.rows.splice(index, 1);
    },

    // busca todos os clientes
    getAPIClients(){
      apiService.getClients().then((data) => {
        this.clients = data.results;
    })},

    // busca todos os vendedores
    getAPISellers(){
        apiService.getSellers().then((data) => {
        this.sellers = data.results;
        })
      },

    // busca todos os produtos
    getAPIProducts(){
      apiService.getProducts().then((data) => {
        this.products = data.results;
    })},

    // busca todas as categorias
    getAPICategories(){
      apiService.getCategories().then((data) => {
        this.categories = data.results;
    })},

    // deleta o produto
    // deleteAPIProduct(product_id){
    //   apiService.deleteProduct(product_id).then((data) => {
    //     this.$notify.success('Seu dado foi deletado com sucesso!')
    //     this.getAPIProducts();
    //   }).catch(e => this.$notify.error('Não foi possível deletar!'))  
    // },

    // criacao de produto
    // onSubmit(){      
    //   const data = {
    //     'name': this.productData.product_name,
    //     'description': this.productData.product_description,
    //     'price': this.productData.product_price.replace('R$',''),
    //     'total_quantity': this.productData.product_total_quantity,
    //     'category': this.productData.product_description_category
    //   }
      
    //   apiService.createProduct(data).then((data) => {
    //     this.$notify.success('Seus dados foram salvos com sucesso!')
    //     this.productData.product_description = ''
    //     this.productData.product_name = ''
    //     this.productData.product_price = ''
    //     this.productData.product_total_quantity = ''
    //     this.productData.product_description_category = ''
    //     this.getAPIProducts();
    //   }).catch(e => this.$notify.error('Não foi possível salvar!'))  
                  
    // },
    // onDelete(product_id){
    //   this.deleteAPIProduct(product_id);  
    // },
    
    // onEdit(product){
    //   this.editId = product.id
    //   this.editProductData.product_id = product.id
    //   this.editProductData.product_name = product.name
    //   this.editProductData.product_price = product.price
    //   this.editProductData.product_description = product.description
    //   this.editProductData.product_description_category = product.product_description_category
    //   this.editProductData.product_total_quantity = product.total_quantity
    // },
    // onCancel(){
    //   this.editId = ''
    //   this.editProductData.product_id = ''
    //   this.editProductData.product_name = ''
    //   this.editProductData.product_price = ''
    //   this.editProductData.product_description = ''
    //   this.editProductData.product_description_category = ''
    //   this.editProductData.product_total_quantity = ''

    // },
    // onEditSubmit (id){
    
    //     const data = {
    //     'name': this.editProductData.product_name,
    //     'description': this.editProductData.product_description,
    //     'price': this.editProductData.product_price,
    //     'total_quantity': this.editProductData.product_total_quantity,
    //     'category': this.editProductData.product_description_category
    //   }
      
    //   apiService.updateProduct(id, data).then((data) => {
    //     this.$notify.success('Seu dado foi atualizado com sucesso!')
    //     this.editId = ''      
    //     this.editProductData.product_description = ''
    //     this.editProductData.product_name = ''
    //     this.editProductData.product_price = ''
    //     this.editProductData.product_description_category = ''
    //     this.editProductData.product_total_quantity = ''
    //     this.getAPIProducts();
    //   }).catch(e => this.$notify.error('Não foi possível atualizar!'))      
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.icon{
  margin-right: 10px;
}
.icon i{
  cursor: pointer;
}

.size_field{
    width: 100px;
}

a {
  background-color: orange;

}

</style>
