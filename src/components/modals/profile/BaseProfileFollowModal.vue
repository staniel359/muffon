<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    :response-data="profileData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
  >
    <template #default="slotProps">
      <BaseProfilesSimpleList
        :profiles="slotProps[scope]"
        @link-click="handleLinkClick"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '*/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import BaseProfilesSimpleList
  from '*/components/lists/profiles/BaseProfilesSimpleList.vue'
import getProfileFollow from '*/helpers/actions/api/profile/get'
import modalMixin from '*/mixins/modalMixin'

export default {
  name: 'BaseProfileFollowModal',
  components: {
    BasePaginatedSegmentModalContainer,
    BaseProfilesSimpleList
  },
  mixins: [
    modalMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false,
      limit: 50
    }
  },
  computed: {
    profileFollowArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  methods: {
    getProfileFollow,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileFollow(
        {
          ...this.profileFollowArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
