<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      v-if="headerTextKey"
      :profileId="profileId"
      :tagId="tagId"
      :headerTextKey="headerTextKey"
      :formatHeaderLink="formatHeaderLink"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :libraryTagData="libraryTagData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import HeaderSegment
  from './BaseProfileLibraryTagSegmentContainer/HeaderSegment.vue'
import getLibraryTag from '*/helpers/actions/api/library/tag/get'
import { focusOnSegment } from '*/helpers/actions/layout'

export default {
  name: 'BaseProfileLibraryTagSegmentContainer',
  components: {
    HeaderSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    tagId: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    libraryTagArgs () {
      return {
        profileId: this.profileId,
        tagId: this.tagId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    },
    libraryTagData () {
      return this.profileData?.library?.tag
    }
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getLibraryTag,
    fetchData (page) {
      this.getLibraryTag({
        ...this.libraryTagArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        focusOnSegment(
          this.$refs.segment
        )
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="sass" scoped></style>
