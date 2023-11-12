<template>
  <BasePaginatedSegmentModalContainer
    ref="modal"
    :response-data="releasesData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    @call="handleCall"
  >
    <template
      #default="slotProps"
    >
      <ReleaseItem
        v-for="(releaseData, index) in slotProps[scope]"
        :key="releaseData.version"
        :release-data="releaseData"
        :index="index"
        :total-count="slotProps[scope].length"
      />
    </template>
  </BasePaginatedSegmentModalContainer>
</template>

<script>
import BasePaginatedSegmentModalContainer
  from '@/components/containers/modals/BasePaginatedSegmentModalContainer.vue'
import ReleaseItem from './BaseAppReleasesModal/ReleaseItem.vue'
import getAppReleases from '@/helpers/actions/api/appReleases/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseAppReleasesModal',
  components: {
    BasePaginatedSegmentModalContainer,
    ReleaseItem
  },
  mixins: [
    modalMixin
  ],
  data () {
    return {
      releasesData: null,
      error: null,
      isLoading: false,
      scope: 'releases',
      limit: 5
    }
  },
  computed: {
    releasesArgs () {
      return {
        limit: this.limit
      }
    }
  },
  methods: {
    getAppReleases,
    getData (
      {
        page
      } = {}
    ) {
      this.getAppReleases(
        {
          ...this.releasesArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
