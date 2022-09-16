<template>
  <div class="ui large labels">
    <BaseLabel
      class="basic circular"
      :is-loading="isLoading"
      :text="similarText"
    />

    <BaseTagsSimpleList
      v-if="similar?.length"
      :tags="similar"
    />
  </div>
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'
import BaseTagsSimpleList from '*/components/lists/tags/BaseTagsSimpleList.vue'
import getTag from '*/helpers/actions/api/tag/get'

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
    similarText () {
      return this.$t(
        'navigation.similar'
      ) + ':'
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
