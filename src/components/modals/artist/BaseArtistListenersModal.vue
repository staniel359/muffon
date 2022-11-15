<template>
  <BaseArtistModalContainer
    ref="modal"
    :artist-name="artistName"
    :scope="scope"
    :text-scope="textScope"
    :limit="limit"
    is-paginated
  >
    <template
      #default="slotProps"
    >
      <BaseProfilesSimpleList
        :profiles="slotProps[scope]"
        @link-click="handleLinkClick"
      />
    </template>
  </BaseArtistModalContainer>
</template>

<script>
import BaseArtistModalContainer
  from '@/components/containers/modals/artist/BaseArtistModalContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseArtistListenersModal',
  components: {
    BaseArtistModalContainer,
    BaseProfilesSimpleList
  },
  mixins: [
    modalMixin
  ],
  props: {
    artistName: String
  },
  data () {
    return {
      scope: 'profiles',
      textScope: 'listeners',
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped></style>
