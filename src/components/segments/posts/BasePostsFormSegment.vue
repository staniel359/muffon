<template>
  <BaseSegmentContainer
    v-if="currentProfileId"
    ref="segment"
    :is-change-transparency="false"
  >
    <BaseAddButton
      model="post"
      :is-active="isShowForm"
      @click="handleAddButtonClick"
    />

    <FormSection
      v-if="isShowForm"
      class="form-section"
      :post-type="postType"
      :profile-id="profileId"
      :community-id="communityId"
      :is-with-as-community-option="isWithAsCommunityOption"
      @success="handleSuccess"
    />
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseAddButton from '@/components/buttons/BaseAddButton.vue'
import FormSection from './BasePostsFormSegment/FormSection.vue'

export default {
  name: 'BasePostsFormSegment',
  components: {
    BaseSegmentContainer,
    BaseAddButton,
    FormSection
  },
  props: {
    postType: String,
    profileId: String,
    communityId: String,
    isWithAsCommunityOption: Boolean
  },
  emits: [
    'success'
  ],
  data () {
    return {
      isShowForm: false
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        currentProfileId: 'id'
      }
    )
  },
  watch: {
    isShowForm: 'handleIsShowFormChange'
  },
  methods: {
    handleAddButtonClick () {
      this.isShowForm = !this.isShowForm
    },
    handleIsShowFormChange (
      value
    ) {
      if (value) {
        this.focus()
      }
    },
    handleSuccess () {
      this.$emit(
        'success'
      )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.form-section
  margin-top: 1em
</style>
