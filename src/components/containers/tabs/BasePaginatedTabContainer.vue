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

    <Component
      :is="listComponent"
      ref="pagination"
      :key="refreshKey"
      :response-data="responseDataComputed"
      :scope="scope"
      :limit="limit"
      :response-page-limit="responsePageLimit"
      :is-loading="isLoading"
      :error="error"
      :is-pagination-simple="isPaginationSimple"
      @focus="handleFocus"
    >
      <template
        #default="slotProps"
      >
        <div class="full-column">
          <slot
            :[scope]="slotProps[scope]"
          />
        </div>

        <BaseMoreLinkButton
          :link="moreLink"
        />
      </template>
    </Component>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BasePaginatedSimpleListContainer
  from '@/components/containers/lists/paginated/BasePaginatedSimpleListContainer.vue'
import BasePaginatedListContainer
  from '@/components/containers/lists/paginated/BasePaginatedListContainer.vue'
import BaseMoreLinkButton
  from '@/components/buttons/BaseMoreLinkButton.vue'
import refreshableMixin from '@/mixins/refreshableMixin'

export default {
  name: 'BasePaginatedTabContainer',
  components: {
    BasePaginatedSimpleListContainer,
    BasePaginatedListContainer,
    BaseMoreLinkButton
  },
  mixins: [
    refreshableMixin
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    responseData: Object,
    limit: Number,
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
    ),
    listComponent () {
      if (this.isPaginationSimple) {
        return 'BasePaginatedSimpleListContainer'
      } else {
        return 'BasePaginatedListContainer'
      }
    }
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
