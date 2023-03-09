<template>
  <div
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <BasePaginatedListContainer
      :response-data="libraryData"
      :scope="scope"
      :limit="limit"
      :is-loading="isLoading"
      :error="error"
      @focus="handleFocus"
    >
      <template
        #default="slotProps"
      >
        <div>
          <slot
            :[scope]="slotProps[scope]"
          />
        </div>

        <MoreSection
          :scope="scope"
          :profile-id="profileId"
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
import MoreSection from './BaseProfileLibraryTabContainer/MoreSection.vue'
import getProfileLibrary from '@/helpers/actions/api/profile/library/get'

export default {
  name: 'BaseProfileLibraryTabContainer',
  components: {
    BasePaginatedListContainer,
    MoreSection
  },
  provide () {
    return {
      getData: this.getData
    }
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    isActive: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false,
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
    libraryArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    },
    libraryData () {
      return this.profileData?.library
    }
  },
  watch: {
    isActive: {
      immediate: true,
      handler: 'handleIsActive'
    },
    isActivated: {
      immediate: true,
      handler: 'handleIsActivated'
    }
  },
  methods: {
    getProfileLibrary,
    handleIsActive (
      value
    ) {
      if (value) {
        this.isActivated = true
      }
    },
    handleIsActivated (
      value
    ) {
      if (value) {
        this.getData()
      }
    },
    handleFocus () {
      this.$emit(
        'focus'
      )
    },
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibrary(
        {
          ...this.libraryArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
