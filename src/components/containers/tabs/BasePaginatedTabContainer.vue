<template>
  <div
    :class="{
      loading: (
        isActive && isLoading
      ),
      inverted: isDarkMode,
      'with-top-segment': isWithTopSegment
    }"
  >
    <slot
      name="top"
    />

    <BasePaginatedListContainer
      ref="pagination"
      :response-data="responseData"
      :scope="scope"
      :limit="limit"
      :client-page-limit="clientPageLimit"
      :response-page-limit="responsePageLimit"
      :is-loading="isLoading"
      :error="error"
      :is-pagination-simple="isPaginationSimple"
      @focus="handleFocus"
    >
      <template
        #default="slotProps"
      >
        <div class="page-list-container">
          <slot
            :[scope]="slotProps[scope]"
          />
        </div>

        <BaseMoreLinkButton
          :link="moreLink"
        />
      </template>
    </BasePaginatedListContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BasePaginatedListContainer
  from '@/components/containers/lists/BasePaginatedListContainer.vue'
import BaseMoreLinkButton
  from '@/components/buttons/BaseMoreLinkButton.vue'

export default {
  name: 'BasePaginatedTabContainer',
  components: {
    BasePaginatedListContainer,
    BaseMoreLinkButton
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    responseData: Object,
    limit: Number,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isActive: Boolean,
    isLoading: Boolean,
    error: Error,
    moreLink: Object,
    isPaginationSimple: Boolean,
    isWithTopSegment: Boolean
  },
  emits: [
    'activate',
    'focus'
  ],
  data () {
    return {
      isActivated: false
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  watch: {
    isActive: 'handleIsActiveChange',
    isActivated: 'handleIsActivatedChange'
  },
  mounted () {
    if (this.isActive) {
      this.isActivated = true
    }
  },
  methods: {
    handleIsActiveChange (
      value
    ) {
      if (value) {
        this.isActivated = true

        this.setFocusable()
      }
    },
    handleIsActivatedChange (
      value
    ) {
      if (value) {
        this.$emit(
          'activate'
        )
      }
    },
    handleFocus () {
      this.$emit(
        'focus'
      )
    },
    setFocusable () {
      this.$refs
        .pagination
        .setFocusable()
    }
  }
}
</script>

<style lang="sass" scoped>
.page-list-container
  @extend .d-flex, .flex-column, .flex-full
</style>
