<template>
    <div class="app-footer">
        {{ G.copyrightdate }} © {{ G.companyAlias }} | {{ G.companyName }} | {{ G.copyright }}
    </div>
</template>

<style scoped>

</style>

<script>
export default {
  name: 'app-footer',
  props: ['data']
}
</script>

<style scoped>
.app-footer {
  background-color: #e8edf0;
  color: #333;
  text-align: center;
  line-height: 36px;
  font-size: 8px;
}
</style>
