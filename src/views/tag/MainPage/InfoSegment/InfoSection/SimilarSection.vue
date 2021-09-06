<template>
  <div class="ui large labels">
    <BaseLabel
      v-if="isLoading"
      isLoading
    />
    <template v-else-if="isAnySimilar">
      <BaseLabel
        :text="similarTextFormatted"
      />
      <BaseTagsList
        v-if="similar.length"
        :tags="similar"
        :isWithIcon="false"
      />
    </template>
  </div>
</template>

<script>
import BaseLabel from '@/BaseLabel.vue'
import BaseTagsList from '@/lists/tags/BaseTagsList.vue'
import fetchTagData from '#/actions/api/tag/fetchData'

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
    similarTextFormatted () {
      return this.$t(
        'layout.navigation.similar'
      ) + ':'
    },
    tagDataArgs () {
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
    fetchTagData,
    fetchData () {
      this.fetchTagData(
        this.tagDataArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
