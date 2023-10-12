<template>
  <BaseTopSegmentContainer
    :scope="scope"
    :country="topCountry"
    :limit="limit"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedSegmentContainer
        ref="segment"
        :response-data="pageSlotProps.topData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template
          #default="slotProps"
        >
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseTopSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import topStore from '@/stores/top'
import BaseTopSegmentContainer from './BaseTopSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseTopPaginatedSegmentContainer',
  components: {
    BaseTopSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number
  },
  computed: {
    ...mapState(
      topStore,
      {
        topCountry: 'country'
      }
    )
  },
  watch: {
    topCountry: 'handleTopCountryChange'
  },
  methods: {
    async handleTopCountryChange () {
      await this.$nextTick()

      this.refresh()
    }
  }
}
</script>

<style lang="sass" scoped></style>
