<template>
  <div
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <BasePaginatedListContainer
      :response-data="favoritesData"
      :scope="scope"
      :limit="limit"
      :is-loading="isLoading"
      :error="error"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </BasePaginatedListContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import getProfileFavorites from '*/helpers/actions/api/profile/favorites/get'

export default {
  name: 'BaseProfileFavoriteTabContainer',
  components: {
    BasePaginatedListContainer
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
      'layout',
      [
        'isDarkMode'
      ]
    ),
    favoritesArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    },
    favoritesData () {
      return this.profileData?.favorites
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
    getProfileFavorites,
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
      this.getProfileFavorites(
        {
          ...this.favoritesArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
