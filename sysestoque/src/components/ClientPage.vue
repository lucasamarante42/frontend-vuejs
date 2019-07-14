<template>
  <div class="seller">
    <h3>Cliente</h3>
    <div class="card">
      <div class="card-header">
        Crie seu cliente aqui:
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">

          <div class="row">
            <div class="form-group">
              <input v-model="clientData.client_name" placeholder="Nome" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
            <div class="form-group">
              <input v-model="clientData.client_cpf" placeholder="CPF" type="text" v-mask="'###.###.###-##'" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
            <div class="form-group">
              <input v-model="clientData.client_birthdate" placeholder="Data de Nascimento" onfocus="(this.type='date')" onblur="(this.type='text')" id="date" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
            </div>
          </div>


          <div class="row">
            <div class="form-group">
              <input v-model="clientData.client_zip" placeholder="CEP" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
            <div class="form-group">
              <input v-model="clientData.client_street" placeholder="Rua" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
            <div class="form-group">
              <input v-model="clientData.client_number" placeholder="Número" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
            <div class="form-group">
              <input v-model="clientData.client_details" placeholder="Complemento" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  >
            </div>            
          </div>

          <div class="row">  
            <div class="form-group">
              <input v-model="clientData.client_neighborhood" placeholder="Bairro" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
            </div>
            <div class="form-group">
              <input v-model="clientData.client_city" placeholder="Cidade" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
            </div>
            <div class="form-group">
              <input v-model="clientData.client_state" placeholder="Estado" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
            </div>
            <div class="form-group">
              <input v-model="clientData.client_country" placeholder="País" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" >
            </div>
          </div>

          <div class="row">  
            <div class="form-group">
              <input v-model="clientData.client_telephone" placeholder="Telefone" type="text" v-mask="'(##)####-####'" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
            </div>
            <div class="form-group">
              <input v-model="clientData.client_cellphone" placeholder="Celular" type="text" v-mask="'(##)#####-####'" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
            </div>
            

            <div class="ml-auto text-right">
              <button type="submit" class="btn btn-primary my-2">Adicionar</button> 
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Lista de Clientes
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  Nome
                </th>
                <th>
                  CPF
                </th>
                <th>
                  Data de Nascimento
                </th>
                <th>
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clients" v-bind:key="client.id">
                <template v-if="editId == client.id">
                  <td><input v-model="editclientData.client_name" type="text"></td>
                  <td><input v-model="editclientData.client_cpf" type="text"></td>
                  <td><input v-model="editclientData.client_birthdate" type="date"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(client.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{client.name}}
                  </td>
                  <td>
                    {{client.cpf}}
                  </td>
                  <td>
                    {{client.birthdate}}
                  </td>
                  <td>

                    <a href="#" class="icon">
                      <i v-on:click="onDelete(client.id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(client)" class="fa fa-pencil"></i>
                    </a>
                    <router-link 
                    :to="{
                      name:'ClientAddressPage', 
                      params:{id: client.id}
                    }" 
                    class="icon"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
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
  name: 'Clients',
  data () {
    return {
      editId: '',
      clientData: {
        'id' : '',
        'client_birthdate': '',
        'client_name': '',
        'client_cpf': ''
      },
      editclientData: {
        'id' : '',
        'client_birthdate': '',
        'client_name': '',
        'client_cpf': ''
      },
      clients: []
    }
  },
  created() {

  },
  mounted() {
    // busca os clientes ao carregar a pagina
    this.getAPIClients();
  },
  computed:{
  },
  methods: {
    // busca todos os clientes
    getAPIClients(){
      apiService.getClients().then((data) => {
        this.clients = data.results;
    })},

    // deleta o cliente
    deleteAPIClient(client_id){
      apiService.deleteClient(client_id).then((data) => {
        this.$notify.success('Seu dado foi deletado com sucesso!');
        this.getAPIClients();
      }).catch(e => this.$notify.error('Não foi possível deletar!'))     
    },
  
    onSubmit(){
      
      const data = {
        'name': this.clientData.client_name,
        'cpf': this.clientData.client_cpf,
        'birthdate': this.clientData.client_birthdate
      }

      // criando cliente
      apiService.createClient(data).then((data) => {
        const client_id = data.id;

        const data_address = {
          'zip_address': this.clientData.client_zip, 
        	'cellphone': this.clientData.client_cellphone,
          'telephone': this.clientData.client_telephone,
          'street': this.clientData.client_street,
          'details': this.clientData.client_details,
          'number': this.clientData.client_number,
          'neighborhood': this.clientData.client_neighborhood,
          'city': this.clientData.client_city,
          'state': this.clientData.client_state,
          'country': this.clientData.client_country,
          'client': client_id,
        }
        
        //criando endereço do cliente
        apiService.createClientAddress(data_address).then((data) => {
          this.$notify.success('Seus dados foram salvos com sucesso!');
          this.clientData.client_birthdate = ''
          this.clientData.client_name = ''
          this.clientData.client_cpf = ''
          this.clientData.client_cellphone = ''
          this.clientData.client_telephone = ''
          this.clientData.client_zip = ''
          this.clientData.client_street = ''
          this.clientData.client_details = ''
          this.clientData.client_number = ''
          this.clientData.client_neighborhood = ''
          this.clientData.client_city = ''
          this.clientData.client_state = ''
          this.clientData.client_country = ''

          this.getAPIClients();
        }).catch(e => this.$notify.error('Não foi possível salvar!'))
      }).catch(e => this.$notify.error('Não foi possível salvar!'))
    },
    
    onDelete(client_id){
      this.deleteAPIClient(client_id);
    },
    onEdit(client){
      this.editId = client.id
      this.editclientData.client_birthdate = client.birthdate
      this.editclientData.client_name = client.name
      this.editclientData.client_cpf = client.cpf
    },
    onCancel(){
      this.editId = ''
      this.editclientData.client_birthdate = ''
      this.editclientData.client_name = ''
      this.editclientData.client_cpf = ''
    },
    onEditSubmit (id){
      const data = {
        'name': this.editclientData.client_name,
        'cpf': this.editclientData.client_cpf,
        'birthdate': this.editclientData.client_birthdate        
      }
      
      apiService.updateClient(id, data).then((data) =>{
        this.$notify.success('Seu dado foi atualizado com sucesso!');
        this.editId = ''     
        this.editclientData.client_name = ''
        this.editclientData.client_cpf = ''
        this.editclientData.client_birthdate = ''
        this.getAPIClients();
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
</style>
