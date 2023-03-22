<template>
  <BaseArtistModalContainer
    ref="modal"
    :artist-name="artistName"
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
  </BaseArtistModalContainer>
</template>

<script>
import BaseArtistModalContainer
  from '@/components/containers/modals/artist/BaseArtistModalContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import modalMixin from '@/mixins/modalMixin'
import {
  profiles as profilesLimits
} from '@/helpers/data/limits'

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
      limit:
        profilesLimits.simple.large
    }
  }
}
</script>

<style lang="sass" scoped></style>
