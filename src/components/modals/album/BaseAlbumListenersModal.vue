<template>
  <BaseAlbumModalContainer
    ref="modal"
    :request-album-data="requestAlbumData"
    :scope="scope"
    :text-scope="textScope"
    :limit="limit"
    is-paginated
    is-multiple
  >
    <template
      #default="slotProps"
    >
      <BaseProfilesSimpleList
        :profiles="slotProps[scope]"
        @link-click="handleLinkClick"
      />
    </template>
  </BaseAlbumModalContainer>
</template>

<script>
import BaseAlbumModalContainer
  from '@/components/containers/modals/album/BaseAlbumModalContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import modalMixin from '@/mixins/modalMixin'
import {
  profiles as profilesLimits
} from '@/helpers/data/limits'

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
      textScope: 'listeners',
      limit:
        profilesLimits.simple.large
    }
  }
}
</script>

<style lang="sass" scoped></style>
