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
import createCommunity from '*/helpers/actions/api/community/create'
import {
  main as formatCommunityMainLink
} from '*/helpers/formatters/links/community'

export default {
  name: 'BaseCommunityCreateFormContainer',
  components: {
    BaseFormContainer
  },
  props: {
    image: Object
  },
  emits: [
    'success'
  ],
  data () {
    return {
      form: null,
      error: null,
      communityId: null,
      isLoading: false
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
    communityUrl () {
      return formatCommunityMainLink(
        {
          communityId: this.communityId
        }
      )
    }
  },
  watch: {
    communityId: 'handleCommunityIdChange'
  },
  methods: {
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

      const createArgs =
        this.formatCreateArgs(
          fields
        )

      this.createCommunity(
        createArgs
      )
    },
    handleCommunityIdChange () {
      this.redirect()

      this.$emit(
        'success'
      )
    },
    createCommunity,
    redirect () {
      this.$router.push(
        this.communityUrl
      )
    },
    formatCreateArgs (
      fields
    ) {
      const {
        title,
        description
      } = fields

      const image = this.image.data

      return {
        title,
        description,
        image
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
