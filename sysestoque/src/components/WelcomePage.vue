<template>

  <div class="welcome">
    <div class="btn-main">
      <router-link :to="{ name:'Products'}" >
        <button class="btn btn-primary btn-lg bt-icon"><i class="fa fa-cart-plus"></i> Produto</button>
      </router-link>

      <router-link :to="{ name:'CategoriesPage'}" >
        <button class="btn btn-primary btn-lg bt-icon"><i class="fa fa-tags"></i></i> Categoria</button>
      </router-link>
      
      <router-link :to="{ name:'SellerPage'}" >
        <button class="btn btn-primary btn-lg bt-icon"><i class="fa fa-user-circle"></i> Vendedor</button>
      </router-link>  

      <router-link :to="{ name:'ClientPage'}" >
        <button class="btn btn-primary btn-lg bt-icon"><i class="fa fa-user"></i> Cliente</button>
      </router-link>    

      <router-link :to="{ name:'OrderPage'}" >
        <button class="btn btn-primary btn-lg bt-icon"><i class="fa fa-files-o"></i> Pedido</button>
      </router-link>
    </div> 
  <MyFooter/>
  </div> 
  

</template>

<script>
import MyFooter from '@/components/MyFooter'
export default {
  components:{
    MyFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
