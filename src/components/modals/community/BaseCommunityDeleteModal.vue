<template>
  <BaseDeleteModal
    ref="modal"
    modelType="community"
    :modelName="communityTitle"
    :isLoading="isLoading"
    :error="error"
    isWithAlsoText
    @deleteButtonClick="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '*/components/modals/BaseDeleteModal.vue'
import deleteCommunity from '*/helpers/actions/api/community/delete'
import {
  communities as formatCommunitiesLink
} from '*/helpers/formatters/links'
import { setToast } from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseCommunityDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    communityData: {
      type: Object,
      required: true
    },
    isDeleteWithRedirect: Boolean
  },
  emits: [
    'deleted'
  ],
  data () {
    return {
      error: null,
      isLoading: false
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
  methods: {
    handleDeleteButtonClick () {
      this.deleteCommunity(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$refs.modal.hide()

      if (this.isDeleteWithRedirect) {
        this.redirect()
        this.notify()
      } else {
        this.$emit('deleted')
      }
    },
    deleteCommunity,
    redirect () {
      this.$router.push(
        this.communitiesLink
      )
    },
    notify () {
      setToast({
        message: this.deletedMessage,
        icon: 'green check'
      })
    },
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  @extend .no-margin
  margin-top: 1em !important
</style>
