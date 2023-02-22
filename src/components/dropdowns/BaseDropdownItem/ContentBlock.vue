<template>
  <div class="content">
    <BaseHeader
      v-if="header"
      tag="h5"
      :text="header"
    />

    <div
      v-if="content"
      class="main-small-container"
    >
      <small
        v-text="content"
      />
    </div>
  </div>

  <div
    v-if="extra"
    class="description extra"
    v-text="extra"
  />
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'

export default {
  name: 'ContentBlock',
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
