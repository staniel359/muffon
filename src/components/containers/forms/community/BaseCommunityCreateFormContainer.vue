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
import createCommunity from '*/helpers/actions/api/community/create'
import {
  community as formatCommunityLink
} from '*/helpers/formatters/links/communities'

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
      return communityFormOptions({
        onSuccess: this.handleSuccess
      })
    },
    communityUrl () {
      return formatCommunityLink({
        communityId: this.communityId
      })
    }
  },
  watch: {
    communityId: 'handleCommunityIdChange'
  },
  methods: {
    handleInit (el) {
      this.form = el
    },
    handleSuccess (event, fields) {
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
    formatCreateArgs (fields) {
      const { title, description } = fields

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
