<template>
  <BaseHeaderContainer
    tag="h4"
  >
    <BaseTrackLinkContainer
      class="main-link"
      :track-data="trackData"
      :is-link-to-library="isLinkToLibrary"
      :profile-id="profileId"
      @click="handleLinkClick"
    >
      {{ trackTitle }}
    </BaseTrackLinkContainer>
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseTrackLinkContainer
  from '@/components/containers/links/track/BaseTrackLinkContainer.vue'

export default {
  name: 'TitleSection',
  components: {
    BaseHeaderContainer,
    BaseTrackLinkContainer
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    isLinkToLibrary: Boolean,
    profileId: Number
  },
  emits: [
    'linkClick'
  ],
  computed: {
    trackTitle () {
      return this.trackData.title
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
