<template>
  <div class="main-more-container">
    <BaseLinkContainer
      :link="link"
    >
      <BaseButton
        class="primary compact circular"
        :text="moreText"
        :is-invertable="false"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseMoreLinkButton',
  components: {
    BaseLinkContainer,
    BaseButton
  },
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  computed: {
    moreText () {
      return this.$t(
        'more'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
