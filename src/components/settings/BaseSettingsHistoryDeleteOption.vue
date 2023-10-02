<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <div class="option-header">
        <BaseButton
          class="red circular option-button"
          left-icon="delete"
          :class="{
            loading: isLoading,
            disabled: isLoading
          }"
          :text="deleteText"
          :is-invertable="false"
          @click="handleClick"
        />

        <BaseDeleteModal
          ref="modal"
          :model-type="modelType"
          :is-loading="isLoading"
          :error="error"
          @delete-button-click="handleDeleteButtonClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import notificationMixin from '@/mixins/notificationMixin'
import deleteHistory from '@/helpers/actions/api/history/delete'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'BaseSettingsHistoryDeleteOption',
  components: {
    BaseButton,
    BaseDeleteModal
  },
  mixins: [
    notificationMixin
  ],
  props: {
    scope: {
      type: String,
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
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    deleteText () {
      return this.$t(
        `settings.options.app.${this.modelType}.delete`
      )
    },
    modelType () {
      return `history.${this.scope}`
    },
    notificationSuccessMessage () {
      return this.$t(
        `notifications.deleted.${this.modelType}`
      )
    },
    historyArgs () {
      return {
        scope: this.scope
      }
    },
    historyKey () {
      return `history.${this.scope}`
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteHistory,
    handleClick () {
      this.showModal()
    },
    handleDeleteButtonClick () {
      if (this.profileId) {
        this.deleteProfileHistory()
      } else {
        this.deleteAnonymousHistory()
      }
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.hideModal()

        this.notifySuccess()
      }
    },
    deleteProfileHistory () {
      this.deleteHistory(
        this.historyArgs
      )
    },
    async deleteAnonymousHistory () {
      this.isSuccess = false
      this.isLoading = true

      await updateGlobalStore(
        {
          [this.historyKey]: []
        }
      )

      this.isLoading = false
      this.isSuccess = true
    },
    showModal () {
      this.$refs
        .modal
        .show()
    },
    hideModal () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
