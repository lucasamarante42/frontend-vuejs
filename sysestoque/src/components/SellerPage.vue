<template>
  <div class="seller">
  
    <div class="card  mb-3 mg-top">
      <div class="card-header text-white bg-dark">
        Cadastro de vendedores
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <input v-model="sellerData.seller_name" type="text" placeholder="Nome" class="form-control ml-sm-2 mr-sm-4 my-2 size-field-name" required>
          </div>
          
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-success my-2">Adicionar</button>
            
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header text-white bg-dark">
        Lista de vendedores
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" width="50">
                  ID
                </th>
                <th width="850">
                  Nome
                </th>
                <th>
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="seller in sellers" v-bind:key="seller.id">
                <template v-if="editId == seller.id">
                  <td><input v-model="editSellerData.seller_id" type="text"></td>
                  <td><input v-model="editSellerData.seller_name" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(seller.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{seller.id}}
                  </td>
                  <td>
                    {{seller.name}}
                  </td>
                  <td>
                    <a href="#" class="icon">
                      <i v-on:click="onDelete(seller.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(seller)" class="fa fa-pencil"></i>
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
  name: 'Sellers',
  data () {
    return {
      editId: '',
      sellerData: {
        'id' : '',
        'seller_id': '',
        'seller_name': ''
      },
      editSellerData: {
        'id' : '',
        'seller_id': '',
        'seller_name': ''
      },
      sellers: []
    }
  },
  mounted() {
    //busca os vendedores 
    this.getAPISellers();
  },
  created() {   
  },
  computed:{
  },
  methods: {
    // busca todos os vendedores
    getAPISellers(){
        apiService.getSellers().then((data) => {
        this.sellers = data.results;
        })
      },

    // deleta o vendedor
    deleteAPISeller(seller_id){
      apiService.deleteSeller(seller_id).then((data) => {
        this.$notify.success('Seu dado foi deletado com sucesso!');
        this.getAPISellers();
      }).catch(e => this.$notify.error('Não foi possível deletar!'))  
    },  
    
    onSubmit(){
      const data = {
        'name': this.sellerData.seller_name
      }
      
      apiService.createSeller(data).then((data) => {
        this.$notify.success('Seus dados foram salvos com sucesso!');
        this.sellerData.seller_name = ''
        
        this.getAPISellers();
      }).catch(e => this.$notify.error('Não foi possível salvar!'))  

    },
   
    onDelete(seller_id){
      this.deleteAPISeller(seller_id);  
    },
    onEdit(seller){
      this.editId = seller.id
      this.editSellerData.seller_id = seller.id
      this.editSellerData.seller_name = seller.name
    },
    onCancel(){
      this.editId = ''
      this.editSellerData.seller_id = ''
      this.editSellerData.seller_name = ''
    },
    onEditSubmit (id){
      const data = {
        'name': this.editSellerData.seller_name
      }
      
      apiService.updateSeller(id, data).then((data) => {
        this.$notify.success('Seu dado foi atualizado com sucesso!');
        this.editId = ''      
        this.editSellerData.seller_name = ''
        this.getAPISellers();
      }).catch(e => this.$notify.error('Não foi possível atualizar!'))        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.size-field-name{
    width: 450px;
}
</style>
