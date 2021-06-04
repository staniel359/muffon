<template>
  <div class="content">
    <BaseHeaderContainer
      v-if="header"
      tag="h5"
    >
      {{ header }}

      <span
        v-if="subheader"
        class="sub header main-extra-title"
      >
        {{ subheader }}
      </span>
    </BaseHeaderContainer>

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
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'

export default {
  name: 'InfoBlock',
  components: {
    BaseHeaderContainer
  },
  props: {
    header: String,
    subheader: String,
    content: String,
    extra: String
  }
}
</script>

<style lang="sass" scoped></style>
