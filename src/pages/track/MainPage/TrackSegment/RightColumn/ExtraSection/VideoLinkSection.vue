<template>
  <div>
    <BaseLinkContainer
      :link="link"
    >
      <BaseButton
        class="basic circular"
        left-icon="video"
        :text="buttonText"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  main as formatVideoLink
} from '@/helpers/formatters/links/video'

export default {
  name: 'VideoLinkSection',
  components: {
    BaseLinkContainer,
    BaseButton
  },
  props: {
    sourceData: {
      type: Object,
      required: true
    }
  },
  computed: {
    link () {
      return formatVideoLink(
        {
          videoId: this.videoId
        }
      )
    },
    videoId () {
      return this.sourceData.id
    },
    buttonText () {
      return this.$t(
        'actions.show.videoPage'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
