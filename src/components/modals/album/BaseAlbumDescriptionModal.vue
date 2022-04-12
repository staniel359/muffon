<template>
  <BaseAlbumModalContainer
    ref="modal"
    :scope="scope"
    :requestAlbumData="requestAlbumData"
  >
    <template #default="slotProps">
      <BaseDescription
        :description="slotProps[scope]"
        isModal
      />
    </template>
  </BaseAlbumModalContainer>
</template>

<script>
import BaseAlbumModalContainer
  from '*/components/containers/modals/album/BaseAlbumModalContainer.vue'
import BaseDescription from '*/components/BaseDescription.vue'

export default {
  name: 'BaseAlbumDescriptionModal',
  components: {
    BaseAlbumModalContainer,
    BaseDescription
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
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
