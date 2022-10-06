<template>
  <BaseAlbumModalContainer
    ref="modal"
    :scope="scope"
    :request-album-data="requestAlbumData"
  >
    <template #default="slotProps">
      <BaseDescriptionSection
        :description="slotProps[scope]"
        is-modal
      />
    </template>
  </BaseAlbumModalContainer>
</template>

<script>
import BaseAlbumModalContainer
  from '@/components/containers/modals/album/BaseAlbumModalContainer.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'

export default {
  name: 'BaseAlbumDescriptionModal',
  components: {
    BaseAlbumModalContainer,
    BaseDescriptionSection
  },
  props: {
    requestAlbumData: Object
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
