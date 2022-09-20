<template>
  <BaseHeaderContainer
    tag="h3"
  >
    {{ trackTitle }}

    <span
      v-if="trackExtraTitle"
      class="sub header main-extra-title"
    >
      <strong
        v-text="trackExtraTitle"
      />
    </span>
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'

export default {
  name: 'TitleSection',
  components: {
    BaseHeaderContainer
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    trackTitle () {
      return this.trackData.title
    },
    trackExtraTitle () {
      return this.trackData.extra_title
    }
  }
}
</script>

<style lang="sass" scoped></style>
