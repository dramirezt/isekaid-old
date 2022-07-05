<template>
  <div class="flex container">
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  computed: {
    ...mapState(['characters'])
  }
}
</script>
