<template>
  <BaseTopPageContainer
    ref="page"
    :scope="scope"
    :country="country"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.topData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :is-with-top-segment="isWithTopSegment"
        :is-with-view-change="isWithViewChange"
        :view-id="viewId"
      >
        <template
          v-if="isWithCountrySelect"
          #top
        >
          <BaseCountrySelectSection
            :country="country"
            @select="handleCountrySelect"
          />
        </template>

        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseTopPageContainer>
</template>

<script>
import BaseTopPageContainer from './BaseTopPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import BaseCountrySelectSection
  from '@/components/sections/BaseCountrySelectSection.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseTopPaginatedPageContainer',
  components: {
    BaseTopPageContainer,
    BasePaginatedPageContainer,
    BaseCountrySelectSection
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    scope: String,
    limit: Number,
    isWithTopSegment: Boolean,
    isWithCountrySelect: Boolean,
    isWithViewChange: Boolean,
    viewId: String
  },
  data () {
    return {
      country: this.$route.query?.country
    }
  },
  watch: {
    country: 'handleCountryChange'
  },
  methods: {
    handleCountrySelect (
      value
    ) {
      this.country = value
    },
    handleCountryChange () {
      this.$refs
        .pagination
        .refresh()
    }
  }
}
</script>

<style lang="sass" scoped></style>
