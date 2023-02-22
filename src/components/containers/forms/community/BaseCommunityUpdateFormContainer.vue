<template>
  <BaseFormContainer
    ref="form"
    :options="options"
    :is-loading="isLoading"
    :error="error"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '@/components/containers/forms/BaseFormContainer.vue'
import {
  communityFormOptions
} from '@/helpers/formatters/semantic'
import updateCommunity from '@/helpers/actions/api/community/update'
import notificationMixin from '@/mixins/notificationMixin'

export default {
  name: 'BaseCommunityUpdateFormContainer',
  components: {
    BaseFormContainer
  },
  mixins: [
    notificationMixin
  ],
  inject: [
    'setCommunityData'
  ],
  props: {
    communityId: {
      type: String,
      required: true
    },
    image: Object
  },
  emits: [
    'success'
  ],
  data () {
    return {
      communityData: null,
      error: null,
      isLoading: false,
      fields: [
        'title',
        'description'
      ]
    }
  },
  computed: {
    options () {
      return communityFormOptions(
        {
          onSuccess: this.handleSuccess
        }
      )
    },
    notificationSuccessMessage () {
      return this.$t(
        'notifications.updated.community',
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
    }
  },
  watch: {
    communityData: 'handleCommunityDataChange'
  },
  methods: {
    updateCommunity,
    handleSuccess (
      event,
      fields
    ) {
      event.preventDefault()

      const updateArgs =
        this.formatUpdateArgs(
          fields
        )

      this.updateCommunity(
        updateArgs
      )
    },
    handleCommunityDataChange (
      value
    ) {
      if (value) {
        this.setCommunityData(
          value
        )

        this.$emit(
          'success'
        )

        this.notifySuccess()
      }
    },
    formatUpdateArgs (
      fields
    ) {
      const {
        title,
        description
      } = fields

      const image = this.image.data

      return {
        communityId: this.communityId,
        title,
        description,
        image
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
