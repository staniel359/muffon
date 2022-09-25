<template>
  <BaseDeleteModal
    ref="modal"
    model-type="community"
    :model-name="communityTitle"
    :is-loading="isLoading"
    :error="error"
    is-with-also-text
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deleteCommunity from '@/helpers/actions/api/community/delete'
import {
  communities as formatCommunitiesLink
} from '@/helpers/formatters/links'
import {
  setToast
} from '@/helpers/actions/plugins/semantic'

export default {
  name: 'BaseCommunityDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      error: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    deletedMessage () {
      return this.$t(
        'notifications.deleted.community',
        {
          communityTitle:
            this.communityTitleStrong
        }
      )
    },
    communityTitleStrong () {
      return `<strong>${this.communityTitle}</strong>`
    },
    communityTitle () {
      return this.communityData.title
    },
    communitiesLink () {
      return formatCommunitiesLink()
    },
    deleteArgs () {
      return {
        communityId: this.communityId
      }
    },
    communityId () {
      return this.communityData.id
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteCommunity,
    handleDeleteButtonClick () {
      this.deleteCommunity(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.hide()

        this.redirect()

        this.notify()
      }
    },
    redirect () {
      this.$router.push(
        this.communitiesLink
      )
    },
    notify () {
      setToast(
        {
          message: this.deletedMessage,
          icon: 'green check'
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
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>
