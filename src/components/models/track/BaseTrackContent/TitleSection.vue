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

    <span
      v-if="trackExtraTitle"
      :class="[
        'sub header description',
        'main-extra-title'
      ]"
      v-text="trackExtraTitle"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '*/components/containers/BaseHeaderContainer.vue'
import BaseTrackLinkContainer
  from '*/components/containers/links/track/BaseTrackLinkContainer.vue'

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
    profileId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    trackTitle () {
      return this.trackData.title
    },
    trackExtraTitle () {
      return this.trackData.extra_title
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
