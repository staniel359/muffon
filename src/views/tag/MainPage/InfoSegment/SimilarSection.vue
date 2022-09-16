<template>
  <div class="ui large labels">
    <BaseLabel
      class="basic circular"
      :is-loading="isLoading"
      :text="similarText"
    />

    <BaseTagsList
      v-if="similar?.length"
      :tags="similar"
    />
  </div>
</template>

<script>
import BaseLabel from '*/components/BaseLabel.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'
import getTag from '*/helpers/actions/api/tag/get'

export default {
  name: 'SimilarSection',
  components: {
    BaseLabel,
    BaseTagsList
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
