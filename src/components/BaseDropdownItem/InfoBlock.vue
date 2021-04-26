<template>
  <div class="content">
    <BaseHeader
      v-if="header"
      tag="h5"
      :text="header"
    />

    <div v-if="content">
      {{ content }}
    </div>
  </div>

  <div
    v-if="extra"
    class="description extra"
  >
    {{ extra }}
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'

export default {
  name: 'InfoBlock',
  components: {
    BaseHeader
  },
  props: {
    header: String,
    content: String,
    extra: String
  }
}
</script>

<style lang="sass" scoped></style>
