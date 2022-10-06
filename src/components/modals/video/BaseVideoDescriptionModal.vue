<template>
  <BaseVideoModalContainer
    ref="modal"
    :video-id="videoId"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseDescriptionSection
        :description="slotProps[scope]"
        is-modal
      />
    </template>
  </BaseVideoModalContainer>
</template>

<script>
import BaseVideoModalContainer
  from '@/components/containers/modals/video/BaseVideoModalContainer.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'

export default {
  name: 'BaseVideoDescriptionModal',
  components: {
    BaseVideoModalContainer,
    BaseDescriptionSection
  },
  props: {
    videoId: String
  },
  data () {
    return {
      scope: 'description'
    }
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
