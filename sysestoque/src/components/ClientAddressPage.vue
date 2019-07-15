<template>
  <div class="address-client">
  	<div>
	   	<div class="card mb-3 mg-top">
	      <div class="card-header text-white bg-dark">
	        Detalhes
	      </div>
	      <div class="card-body">
	        <p >CEP: {{clientZIP}}</p>
	        <p >Rua: {{clientStreet}}, {{clientNumber}}  Complemento: {{clientDetails}} {{clientNeighborhood}}</p>
					<p >{{clientCity}}/ {{clientState}} - {{clientCountry}}</p>
				
					<p >Telefone: {{clientTelephone}}</p>
					<p >Celular: {{clientCellphone}}</p>

	        <router-link :to="'/client'" class="btn btn-primary"> Voltar </router-link>
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
  name: 'ClientAddressPage',
  data () {
    return {
    	clientId:'',
    	clientZIP: '',
			clientStreet: '',
			clientNumber: '',
			clientDetails: '',
			clientNeighborhood: '',
			clientCity: '',
			clientState: '',
			clientCountry: '',
			clientTelephone: '',
			clientCellphone: ''  	    	
    }
  },
	mounted() {
    // busca os clientes ao carregar a pagina
    this.getAPIClientsAddress();
  },
  methods: {
		getAPIClientsAddress() {
			apiService.getClientAddressByID(this.$route.params.id).then((result) => {
				
        this.clientId = this.$route.params.id
				this.clientZIP = result.data.zip_address
				this.clientStreet = result.data.street
				this.clientNumber= result.data.number,
				this.clientDetails= result.data.details || '-',
				this.clientNeighborhood= result.data.neighborhood,
				this.clientCity= result.data.city,
				this.clientState= result.data.state,
				this.clientCountry= result.data.country,
				this.clientTelephone= result.data.telephone,
				this.clientCellphone= result.data.cellphone  	
				
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

</style>
