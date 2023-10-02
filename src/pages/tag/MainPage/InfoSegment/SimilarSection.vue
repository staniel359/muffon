<template>
  <div class="ui labels">
    <BaseLabel
      v-if="isLoading"
      class="basic circular large"
      is-loading
    />
    <template
      v-else-if="similar?.length"
    >
      <BaseLabel
        class="basic circular large"
        :text="similarTextFormatted"
      />

      <BaseTagsSimpleList
        class="d-inline"
        :tags="similar"
      />
    </template>
  </div>
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'
import BaseTagsSimpleList from '@/components/lists/tags/BaseTagsSimpleList.vue'
import getTag from '@/helpers/actions/api/tag/get'

export default {
  name: 'SimilarSection',
  components: {
    BaseLabel,
    BaseTagsSimpleList
  },
  props: {
    tagName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      tagData: null,
      scope: 'similar'
    }
  },
  computed: {
    similar () {
      return this.tagData?.similar
    },
    similarTextFormatted () {
      return `${this.similarText}:`
    },
    similarText () {
      return this.$t(
        'navigation.similar'
      )
    },
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getTag,
    getData () {
      this.getTag(
        this.tagArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
