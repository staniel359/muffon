<template>
  <BaseSegmentModalContainer
    ref="modal"
    :is-get-data="false"
  >
    <template
      #default
    >
      <BaseDescriptionSection
        :description="description"
      />
    </template>
  </BaseSegmentModalContainer>
</template>

<script>
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'

export default {
  name: 'BasePlaylistDescriptionModal',
  components: {
    BaseSegmentModalContainer,
    BaseDescriptionSection
  },
  props: {
    description: String
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
