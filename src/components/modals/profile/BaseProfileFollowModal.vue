<template>
  <BaseModalContentContainer
    ref="modal"
    :response-data="profileData"
    :is-loading="isLoading"
    :error="error"
    @call="handleCall"
    @refresh="handleRefresh"
  >
    <template #default>
      <BasePaginatedListContainer
        :response-data="profileData"
        :scope="scope"
        :limit="limit"
        :is-loading="isLoading"
        :error="error"
        @fetch-data="fetchData"
        @refresh="handleRefresh"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <BaseProfilesSimpleList
            :profiles="slotProps[scope]"
            @link-click="handleLinkClick"
          />
        </template>
      </BasePaginatedListContainer>
    </template>
  </BaseModalContentContainer>
</template>

<script>
import BaseModalContentContainer
  from '*/components/containers/modals/BaseModalContentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseProfilesSimpleList
  from '*/components/lists/profiles/BaseProfilesSimpleList.vue'
import getProfileFollow from '*/helpers/actions/api/profile/get'

export default {
  name: 'BaseProfileFollowModal',
  components: {
    BaseModalContentContainer,
    BasePaginatedListContainer,
    BaseProfilesSimpleList
  },
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
    followArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  methods: {
    getProfileFollow,
    handleCall () {
      this.fetchData()
    },
    handleRefresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    handleFocus () {
      this.scrollToTop()
    },
    handleLinkClick () {
      this.hide()
    },
    fetchData (
      page
    ) {
      this.getProfileFollow(
        {
          ...this.followArgs,
          page
        }
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    scrollToTop () {
      this.$refs
        .modal
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
