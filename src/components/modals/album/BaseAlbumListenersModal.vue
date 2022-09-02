<template>
  <BaseAlbumModalContainer
    ref="modal"
    :request-album-data="requestAlbumData"
    :scope="scope"
    :limit="limit"
    is-paginated
  >
    <template #default="slotProps">
      <BaseProfilesSimpleList
        :profiles="slotProps[scope]"
        @link-click="handleLinkClick"
      />
    </template>
  </BaseAlbumModalContainer>
</template>

<script>
import BaseAlbumModalContainer
  from '*/components/containers/modals/album/BaseAlbumModalContainer.vue'
import BaseProfilesSimpleList
  from '*/components/lists/profiles/BaseProfilesSimpleList.vue'
import modalMixin from '*/mixins/modalMixin'

export default {
  name: 'BaseAlbumListenersModal',
  components: {
    BaseAlbumModalContainer,
    BaseProfilesSimpleList
  },
  mixins: [
    modalMixin
  ],
  props: {
    requestAlbumData: Object
  },
  data () {
    return {
      scope: 'profiles',
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped></style>
