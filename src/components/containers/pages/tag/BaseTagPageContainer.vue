<template>
  <BasePageContainer
    :isShowLoader="!tagData"
    :isLoading="isLoading"
    :isError="!tagData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="tagData"
      :isLoading="isLoading"
      :error="error"
      :tagData="tagData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :profileId="profileId"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState } from 'vuex'
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatTagPageNavigation from '*/helpers/formatters/navigation/tag'
import formatTagPageTab from '*/helpers/formatters/tabs/tag'
import getTag from '*/helpers/actions/api/tag/get'

export default {
  name: 'BaseTagPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    tagName: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number
  },
  data () {
    return {
      isLoading: false,
      error: null,
      tagData: null
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
    navigationSections () {
      return formatTagPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        tagName: this.tagNameFetched,
        scope: this.scope
      }
    },
    tabData () {
      return formatTagPageTab(
        this.navigationData
      )
    },
    tagNameFetched () {
      return this.tagData?.name
    },
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    tagData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getTag,
    fetchData (page) {
      this.getTag({
        ...this.tagArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
