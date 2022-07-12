<template>
  <BaseProfileLibraryTabContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseTagsList
        :[scope]="slotProps[scope]"
        :profile-id="profileId"
        is-link-to-library
      />
    </template>
  </BaseProfileLibraryTabContainer>
</template>

<script>
import BaseProfileLibraryTabContainer
  from '*/components/containers/tabs/profile/library/BaseProfileLibraryTabContainer.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'

export default {
  name: 'TagsTab',
  components: {
    BaseProfileLibraryTabContainer,
    BaseTagsList
  },
  props: {
    profileId: String,
    isActive: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      scope: 'tags',
      limit: 10
    }
  },
  methods: {
    handleFocus () {
      this.$emit(
        'focus'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
