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
        <strong>
          {{ subheader }}
        </strong>
      </span>
    </BaseHeaderContainer>

    <div
      v-if="content"
      class="main-small-container"
    >
      <small>
        {{ content }}
      </small>
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
  name: 'ContentBlock',
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
