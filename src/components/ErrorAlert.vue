<template>
  <div v-if="message > 0" class="alert alert-danger" role="alert">
    {{message}}
  </div>
</template>
<script>
export default {
  name: 'ErrorAlert',
  props: {
    message: {}
  }
}
</script>