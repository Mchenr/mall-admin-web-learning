<template>
  <div class="app-container">
    <BrandDetails :is-edit="true"/>
  </div>
</template>

<script>
import BrandDetails from './components/BrandDetails'

export default {
  name: 'UpdateBrand',
  components: { BrandDetails }
}
</script>

<style scoped>

</style>
