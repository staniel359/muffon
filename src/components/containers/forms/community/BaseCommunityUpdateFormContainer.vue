<template>
  <BaseFormContainer
    :options="options"
    :is-loading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <slot />
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import {
  communityFormOptions
} from '*/helpers/data/plugins/semantic'
import updateCommunity from '*/helpers/actions/api/community/update'

export default {
  name: 'BaseCommunityUpdateFormContainer',
  components: {
    BaseFormContainer
  },
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
      form: null,
      error: null,
      communityData: null,
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
    }
  },
  watch: {
    communityData: 'handleCommunityDataChange'
  },
  methods: {
    updateCommunity,
    handleInit (
      element
    ) {
      this.form = element
    },
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
