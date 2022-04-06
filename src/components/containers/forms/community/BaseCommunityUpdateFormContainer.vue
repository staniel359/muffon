<template>
  <BaseFormContainer
    :options="options"
    :isLoading="isLoading"
    :error="error"
    @init="handleInit"
  >
    <slot></slot>
  </BaseFormContainer>
</template>

<script>
import BaseFormContainer
  from '*/components/containers/forms/BaseFormContainer.vue'
import { communityFormOptions } from '*/helpers/data/plugins/semantic'
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
      isLoading: false
    }
  },
  computed: {
    options () {
      return communityFormOptions({
        onSuccess: this.handleSuccess
      })
    }
  },
  methods: {
    handleInit (el) {
      this.form = el
    },
    handleSuccess (event, fields) {
      event.preventDefault()

      const updateArgs =
        this.formatUpdateArgs(
          fields
        )

      this.updateCommunity(
        updateArgs
      )
    },
    updateCommunity,
    formatUpdateArgs (fields) {
      const { title, description } = fields

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
