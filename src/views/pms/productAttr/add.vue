<template>
  <div class="app-container">
    <BrandDetails :is-edit="false"/>
  </div>
</template>

<script>
import BrandDetails from './components/BrandDetails'

export default {
  name: 'AddBrand',
  components: { BrandDetails }
}
</script>

<style scoped>

</style>
