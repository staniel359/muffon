<template>
  <BaseTrackModalContainer
    ref="modal"
    :request-track-data="requestTrackData"
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
  </BaseTrackModalContainer>
</template>

<script>
import BaseTrackModalContainer
  from '@/components/containers/modals/track/BaseTrackModalContainer.vue'
import BaseProfilesSimpleList
  from '@/components/lists/profiles/BaseProfilesSimpleList.vue'
import modalMixin from '@/mixins/modalMixin'

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
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped></style>
