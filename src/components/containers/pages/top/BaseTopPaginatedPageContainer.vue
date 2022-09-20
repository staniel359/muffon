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
        :view-index="viewIndex"
      >
        <template
          v-if="isWithCountrySelect"
          #top
        >
          <CountrySelectBlock
            :country="country"
            @select="handleCountrySelect"
            @clear-button-click="handleCountryClearButtonClick"
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
import CountrySelectBlock
  from './BaseTopPaginatedPageContainer/CountrySelectBlock.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseTopPaginatedPageContainer',
  components: {
    BaseTopPageContainer,
    BasePaginatedPageContainer,
    CountrySelectBlock
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
    viewIndex: Number
  },
  data () {
    return {
      country: null
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
    handleCountryClearButtonClick () {
      this.country = null
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
