<template>
  <div v-if="message.length > 0" class="alert alertBackground" role="alert">
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