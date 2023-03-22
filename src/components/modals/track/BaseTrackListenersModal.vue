<template>
  <BaseTrackModalContainer
    ref="modal"
    :request-track-data="requestTrackData"
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
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '@/components/containers/modals/track/BaseTrackModalContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import modalMixin from '@/mixins/modalMixin'
import {
  profiles as profilesLimits
} from '@/helpers/data/limits'

export default {
  name: 'BaseTrackListenersModal',
  components: {
    BaseTrackModalContainer,
    BaseProfilesSimpleList
  },
  mixins: [
    modalMixin
  ],
  props: {
    requestTrackData: Object
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
