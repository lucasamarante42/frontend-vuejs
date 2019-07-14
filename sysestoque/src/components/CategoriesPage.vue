<template>
  <div class="seller">
    <h3>Categorias</h3>
    <div class="card">
      <div class="card-header">
        Crie sua categoria aqui:
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <input v-model="categoryData.category_description" type="text" placeholder="Nome" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Adicionar</button>
            
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Listinha de categorias
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
                  Descrição
                </th>
                <th>
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" v-bind:key="category.id">
                <template v-if="editId == category.id">
                  <td><input v-model="editCategoryData.category_id" type="text"></td>
                  <td><input v-model="editCategoryData.category_description" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(category.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{category.id}}
                  </td>
                  <td>
                    {{category.description}}
                  </td>
                  
                  <td>
                    <a href="#" class="icon">
                      <i v-on:click="onDelete(category.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(category)" class="fa fa-pencil"></i>
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
  name: 'Products',
  data () {
    return {
      editId: '',
      categoryData: {
        'id' : '',
        'category_id': '',
        'category_description': ''
      },
      editCategoryData: {
        'id' : '',
        'category_id': '',
        'category_description': ''
      },
      categories: []
    }
  },
  mounted() {

    //busca as categorias 
    this.getAPICategories();
  },
  created() {   
  },
  computed:{
  },
  methods: {
    // busca todas as categorias
    getAPICategories(){
      try {
        apiService.getCategories().then((data) => {
        this.categories = data.results;
        })

      } catch(error){
          console.log(error)
        }  
      },

    // deleta a categoria
    deleteAPICategory(category_id){
      apiService.deleteCategory(category_id).then((data) => {
        this.getAPICategories();
      })
    },  
    
    onSubmit(){
      const data = {
        'description': this.categoryData.category_description
      }
      
      apiService.createCategory(data).then((data) => {
        this.categoryData.category_description = ''
        
        this.getAPICategories();
      })

    },
   
    onDelete(category_id){
      this.deleteAPICategory(category_id);  
    },
    onEdit(category){
      this.editId = category.id
      this.editCategoryData.category_id = category.id
      this.editCategoryData.category_description = category.description
    },
    onCancel(){
      this.editId = ''
      this.editCategoryData.category_id = ''
      this.editCategoryData.category_description = ''
    },
    onEditSubmit (id){
      const data = {
        'description': this.editCategoryData.category_description
      }
      
      apiService.updateCategory(id, data).then((data) => {
        this.editId = ''      
        this.editCategoryData.category_description = ''
        this.getAPICategories();
      })     
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
</style>
