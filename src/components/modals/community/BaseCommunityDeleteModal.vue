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
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'BaseCommunityDeleteModal',
  components: {
    BaseDeleteModal
  },
  mixins: [
    notificationMixin
  ],
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
    notificationSuccessMessage () {
      return this.$t(
        'notifications.deleted.community',
        {
          communityTitle:
            this.communityTitleStrong
        }
      )
    },
    communityTitleStrong () {
      return `
        <strong>
          ${this.communityTitle}
        </strong>
      `
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

        this.notifySuccess()
      }
    },
    redirect () {
      this.$router.push(
        this.communitiesLink
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

<style lang="sass" scoped></style>
