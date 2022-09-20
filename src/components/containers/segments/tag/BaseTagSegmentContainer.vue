<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :tag-data="tagData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getTag from '@/helpers/actions/api/tag/get'

export default {
  name: 'BaseTagSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    tagName: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      tagData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getTag,
    getData (
      {
        page
      } = {}
    ) {
      this.getTag(
        {
          ...this.tagArgs,
          page
        }
      )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
