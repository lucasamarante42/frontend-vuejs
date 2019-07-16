<template>
  <div class="orders">
    <div class="card mb-3 mg-top">
      <div class="card-header text-white bg-dark">
        Cadastro de pedidos
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">

          <div class="form-group">
            <select v-model="orderData.order_client" class="form-control ml-sm-2 mr-sm-4 my-2" required>
              <option value="">Escolha o cliente</option>
              <option v-for="client in clients" v-bind:value="client.id">
                {{ client.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <select v-model="orderData.order_seller" class="form-control ml-sm-2 mr-sm-4 my-2" required>
              <option value="">Escolha o vendedor</option>
              <option v-for="seller in sellers" v-bind:value="seller.id">
                {{ seller.name }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <input v-model="orderData.order_total_quantity" type="number" placeholder="Quant. Total" class="form-control ml-sm-2 mr-sm-4 my-2 size_field " required>
          </div>
          <div class="form-group">
            <input v-model="orderData.order_price" v-money="money" placeholder="Preço" class="form-control ml-sm-2 mr-sm-4 my-2 size_field" required>
          </div>
          <div class="form-group">
            <input v-model="orderData.order_date" placeholder="Data" onfocus="(this.type='date')" onblur="(this.type='text')" id="date" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
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

              <td width="200px">
                <select v-model="row.order_product" class="form-control ml-sm-2 mr-sm-4 my-2 size_field_row">
                  <option value="">Escolha o produto</option>
                  <option v-for="product in products" v-bind:value="product.id">
                    {{ product.name }}
                  </option>
                </select>
              </td>
            
              <td><input v-model="row.order_total_quantity" type="number" placeholder="Quant." class="form-control ml-sm-2 mr-sm-4 my-2 size_field" ></td>
              <td class="pd-bt-remove">
                  <a v-on:click="removeElement(index);" class="btn-remove">Remove</a>
              </td>
          </tr>
        </tbody>
        </table>

          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-success my-2">Adicionar</button>            
          </div>
        </form>
        <div>
            <button class="button btn-primary" @click="addRow">+ item</button>
        </div>
      </div>
    </div>


    <div class="card mt-5">
      <div class="card-header text-white bg-dark">
        Lista de Pedidos
      </div>
      <div class="card-body">
        <div class="table-responsive hg-table">
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
                <template v-if="editId == order.id">
                  <td>{{ editId }}</td>
                  <td>
                    <select v-model="editOrderData.order_client">
                      <option value="">Escolha o cliente</option>
                      <option v-for="client in clients" v-bind:value="client.id">
                        {{ client.name }}
                      </option>
                    </select>
                  </td>

                  <td>
                     <select v-model="editOrderData.order_seller">
                      <option value="">Escolha o vendedor</option>
                      <option v-for="seller in sellers" v-bind:value="seller.id">
                        {{ seller.name }}
                      </option>
                    </select>
                  </td>

                  <td>
                    <input v-model="editOrderData.order_total_quantity" type="number" placeholder="Quant. Total">
                  </td>

                  <td>
                    <input v-model="editOrderData.order_price" v-money="money" placeholder="Preço">
                  </td>
               
                  <td>
                    <input v-model="editOrderData.order_date" placeholder="Data" onfocus="(this.type='date')" onblur="(this.type='text')" id="date" type="text">
                  </td>

                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(order.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{order.id}}
                  </td>
                  <td>
                    {{order.client_name}}
                  </td>
                  <td>
                    {{order.seller_name}}
                  </td>
                  <td>
                    {{order.total_quantity}}
                  </td>
                  <td>
                     R${{order.value_total}}
                  </td>
                  <td>
                    {{order.date_order}}
                  </td>
                  <td>

                    <a href="#" class="icon">
                      <i v-on:click="onDelete(order.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(order)" class="fa fa-pencil"></i>
                    </a>
                    <router-link 
                     :to="{
                       name:'OrderItenPage', 
                       params:{id: order.id}
                     }" 
                     class="icon"
                     >
                       <i class="fa fa-eye"></i>
                    </router-link>
                    <a href="#" class="icon">
                      <i v-on:click="onReportPdf(order)" class="fa fa-file-pdf-o"></i>
                    </a>
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

    // busca os pedidos
    this.getAPIOrders();

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

    getAPIOrders(){
      apiService.getOrders().then((data) => {
        this.orders = data.results;
      })
    },

    // deleta o pedido
    deleteAPIOrder(order_id){
      apiService.deleteOrder(order_id).then((data) => {
        this.$notify.success('Seu dado foi deletado com sucesso!')
        this.getAPIOrders();
      }).catch(e => this.$notify.error('Não foi possível deletar!'))  
    },

    // criacao de pedido
    onSubmit(){      
      const data = {
        'client': this.orderData.order_client,
        'seller': this.orderData.order_seller,
        'total_quantity': this.orderData.order_total_quantity,
        'value_total':  this.orderData.order_price.replace('R$',''),
        'date_order': this.orderData.order_date
      }

        apiService.createOrder(data).then((data) => {
          const order_id = data.data.id;
          const order_date = data.data.date_order;

          if (this.rows.length > 0){
            for (let index = 0; index < this.rows.length; index++) {

              const iten_order_data = {
                'order': order_id,
                'product': this.rows[index].order_product,
                'quantity': this.rows[index].order_total_quantity,
                'date_order_iten': order_date
              }

              apiService.createItenOrder(iten_order_data).then((data) => {
                console.log('Item salvo com sucesso')
              }).catch(e => this.$notify.error('Não foi possível salvar!')) 

            }
          }

          this.$notify.success('Seus dados foram salvos com sucesso!')

          this.orderData.order_client = ''
          this.orderData.order_seller = ''
          this.orderData.order_total_quantity = ''
          this.orderData.order_price = ''
          this.orderData.order_date = ''

          this.rows=[]

          this.getAPIOrders();
        }).catch(e => this.$notify.error('Não foi possível salvar!')) 

    },
      
    onDelete(order_id){
      this.deleteAPIOrder(order_id);  
    },
    
    onEdit(order){
      this.editId = order.id
      this.editOrderData.order_id = order.id
      this.editOrderData.order_client = order.client_name
      this.editOrderData.order_seller = order.seller_name
      this.editOrderData.order_total_quantity = order.total_quantity
      this.editOrderData.order_price = order.value_total
      this.editOrderData.order_date = order.date_order
    },
    onCancel(){
      this.editId = ''
      this.editOrderData.order_id = ''
      this.editOrderData.order_client = ''
      this.editOrderData.order_seller = ''
      this.editOrderData.order_total_quantity = ''
      this.editOrderData.order_price = ''
      this.editOrderData.order_date = ''

    },
    onEditSubmit (id){
    
        const data = {
          'client': this.editOrderData.order_client,
          'seller': this.editOrderData.order_seller,
          'total_quantity': this.editOrderData.order_total_quantity,
          'value_total':  this.editOrderData.order_price.replace('R$',''),
          'date_order': this.editOrderData.order_date
        }
      console.log(data)
      console.log(id)  
      apiService.updateOrder(id, data).then((data) => {
        this.$notify.success('Seu dado foi atualizado com sucesso!')
        this.editId = ''      
        this.editOrderData.order_client = ''
        this.editOrderData.order_seller = ''
        this.editOrderData.order_total_quantity = ''
        this.editOrderData.order_price = ''
        this.editOrderData.order_date = ''
        this.getAPIOrders();
      }).catch(e => this.$notify.error('Não foi possível atualizar!'))      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.size_field{
    width: 150px;
}

.size_field_row{
    width: 450px;
}

.btn-remove{
  cursor: pointer;
  padding: 8px;
  background-color: orange;
}

.pd-bt-remove{
  padding: 30px;
}


</style>
