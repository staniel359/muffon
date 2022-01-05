<template>
  <div class="ui large labels">
    <BaseLabel
      v-if="isLoading"
      isLoading
    />
    <template v-else-if="isAnySimilar">
      <BaseLabel
        :text="similarText"
      />
      <BaseTagsList
        v-if="similar.length"
        :tags="similar"
      />
    </template>
  </div>
</template>

<script>
import BaseLabel from '@/BaseLabel.vue'
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import getTag from '#/actions/api/tag/get'

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
      error: null,
      tagData: null
    }
  },
  computed: {
    isAnySimilar () {
      return this.similar?.length
    },
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
        scope: 'similar'
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getTag,
    fetchData () {
      this.getTag(
        this.tagArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
