<template>
<div class="header">
  <nav class="navbar navbar-light bg-light navbar-expand-lg">
    <div class="container">
			<router-link class="navbar-brand" :to="{name:'WelcomePage'}">SYSESTOQUE </router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>

			<div class="collapse navbar-collapse" id="navbarNav">
		    <ul class="navbar-nav">
		      <li class="nav-item active">
						<router-link :to="{ name:'Products'}" >
		        	<a class="nav-link" href="#">Produtos</a>
						</router-link>
		      </li>
					<li class="nav-item active">
						<router-link :to="{ name:'CategoriesPage'}" >
		        	<a class="nav-link" href="#">Categorias</a>
						</router-link>
		      </li>
		      <li class="nav-item">
						<router-link :to="{ name:'SellerPage'}" >
							<a class="nav-link" href="#">Vendedor</a>
						</router-link>
		      </li>
		      <li class="nav-item">
						<router-link :to="{ name:'ClientPage'}" >
		        	<a class="nav-link" href="#">Cliente</a>
						</router-link>
		      </li>
		    </ul>
		  </div>
	</div>
</nav>
</div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
