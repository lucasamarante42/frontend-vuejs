<template>
  <div class="products">
    
    <div class="card text-white bg-dark mb-3 mg-top">
      <div class="card-header">
        Cadastro de produtos
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <input v-model="productData.product_name" type="text" placeholder="Nome" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <input v-model="productData.product_description" type="text" placeholder="Descrição" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
          </div>
          <div class="form-group">
            <input v-model="productData.product_total_quantity" type="number" placeholder="Quant." class="form-control ml-sm-2 mr-sm-4 my-2 size_field"  required>
          </div>
          <div class="form-group">
            <input v-model="productData.product_price" v-money="money" placeholder="Preço" class="form-control ml-sm-2 mr-sm-4 my-2 size_field" required>
          </div>
          <div class="form-group">
            <select v-model="productData.product_description_category" class="form-control ml-sm-2 mr-sm-4 my-2">
              <option value="">Escolha a Categoria</option>
              <option v-for="category in categories" v-bind:value="category.id">
                {{ category.description }}
              </option>
            </select>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-success my-2">Adicionar</button>            
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5 text-white bg-list-tb">
      <div class="card-header">
        Lista de Produtos
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
                  Nome
                </th>
                <th>
                  Descrição
                </th>
                <th>
                  Categoria
                </th>
                <th>
                  Quantidade
                </th>
                <th>
                  Preço
                </th>
                <th>
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in prodsApi" v-bind:key="product.id">
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
  name: 'Products',
  data () {
    return {
      editId: '',
      productData: {
        'id' : '',
        'product_id': '',
        'product_name': '',
        'product_price': '',
        'product_description': '',
        'product_description_category': '',
        'product_total_quantity': ''

      },
      editProductData: {
        'id' : '',
        'product_id': '',
        'product_name': '',
        'product_price': '',
        'product_description': '',
        'product_description_category': '',
        'product_total_quantity': ''
      },
      products: [],
      prodsApi: [],
      categories: [],
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
    // busca os produtos ao carregar a pagina
    this.getAPIProducts();

    //busca as categorias e inputa no select field
    this.getAPICategories();
  },
  computed:{
    
  },
  methods: {
    // busca todos os produtos
    getAPIProducts(){
      apiService.getProducts().then((data) => {
        this.prodsApi = data.results;
    })},

    // busca todas as categorias
    getAPICategories(){
      apiService.getCategories().then((data) => {
        this.categories = data.results;
    })},

    // deleta o produto
    deleteAPIProduct(product_id){
      apiService.deleteProduct(product_id).then((data) => {
        this.$notify.success('Seu dado foi deletado com sucesso!')
        this.getAPIProducts();
      }).catch(e => this.$notify.error('Não foi possível deletar!'))  
    },

    // criacao de produto
    onSubmit(){      
      const data = {
        'name': this.productData.product_name,
        'description': this.productData.product_description,
        'price': this.productData.product_price.replace('R$',''),
        'total_quantity': this.productData.product_total_quantity,
        'category': this.productData.product_description_category
      }
      
      apiService.createProduct(data).then((data) => {
        this.$notify.success('Seus dados foram salvos com sucesso!')
        this.productData.product_description = ''
        this.productData.product_name = ''
        this.productData.product_price = ''
        this.productData.product_total_quantity = ''
        this.productData.product_description_category = ''
        this.getAPIProducts();
      }).catch(e => this.$notify.error('Não foi possível salvar!'))  
                  
    },
    onDelete(product_id){
      this.deleteAPIProduct(product_id);  
    },
    
    onEdit(product){
      this.editId = product.id
      this.editProductData.product_id = product.id
      this.editProductData.product_name = product.name
      this.editProductData.product_price = product.price
      this.editProductData.product_description = product.description
      this.editProductData.product_description_category = product.product_description_category
      this.editProductData.product_total_quantity = product.total_quantity
    },
    onCancel(){
      this.editId = ''
      this.editProductData.product_id = ''
      this.editProductData.product_name = ''
      this.editProductData.product_price = ''
      this.editProductData.product_description = ''
      this.editProductData.product_description_category = ''
      this.editProductData.product_total_quantity = ''

    },
    onEditSubmit (id){
    
        const data = {
        'name': this.editProductData.product_name,
        'description': this.editProductData.product_description,
        'price': this.editProductData.product_price,
        'total_quantity': this.editProductData.product_total_quantity,
        'category': this.editProductData.product_description_category
      }
      
      apiService.updateProduct(id, data).then((data) => {
        this.$notify.success('Seu dado foi atualizado com sucesso!')
        this.editId = ''      
        this.editProductData.product_description = ''
        this.editProductData.product_name = ''
        this.editProductData.product_price = ''
        this.editProductData.product_description_category = ''
        this.editProductData.product_total_quantity = ''
        this.getAPIProducts();
      }).catch(e => this.$notify.error('Não foi possível atualizar!'))      
    }
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
</style>
