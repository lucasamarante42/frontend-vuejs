<template>
  <div class="order-itens">
  	<div>
	   	<div class="card mb-3 mg-top">
	      <div class="card-header text-white bg-dark">
	        Detalhes
	      </div>
	      <div class="card-body">
            <div class="row" v-for="item in orderItens" v-bind:key="item.id">
          
                <p>Produto: {{item.product_name}} - Quantidade: {{item.quantity}}</p>
                <p></p> 
            </div>

	        <router-link :to="'/order'" class="btn btn-primary"> Voltar </router-link>
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
  name: 'OrderItenPage',
  data () {
    return {
        orderItens:[]
    }
  },
	mounted() {
    // busca os clientes ao carregar a pagina
    this.getAPIOrderItenByOrder();
  },
  methods: {
		getAPIOrderItenByOrder() {
			apiService.getAPIOrderItenByOrderID(this.$route.params.id).then((data) => {
                this.orderItens = data.results;						
            })
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
