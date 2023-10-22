<template>
  <div
    v-if="currentProfileId"
    ref="section"
  >
    <BaseCreateButton
      model="post"
      :is-active="isShowForm"
      @click="handleCreateButtonClick"
    />

    <FormSection
      v-show="isShowForm"
      :post-type="postType"
      :profile-id="profileId"
      :community-id="communityId"
      :is-with-as-community-option="isCommunityCreator"
      :is-show="isShowForm"
      @success="handleSuccess"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseCreateButton from '@/components/buttons/BaseCreateButton.vue'
import FormSection from './BasePostsFormSection/FormSection.vue'
import {
  focusOnPageElement
} from '@/helpers/actions/layout'

export default {
  name: 'BasePostsFormSection',
  components: {
    BaseCreateButton,
    FormSection
  },
  props: {
    postType: String,
    profileId: String,
    communityId: String,
    isCommunityCreator: Boolean
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
    handleCreateButtonClick () {
      this.isShowForm =
        !this.isShowForm
    },
    handleIsShowFormChange (
      value
    ) {
      if (value) {
        this.focus()
      }
    },
    handleSuccess (
      value
    ) {
      this.$emit(
        'success',
        value
      )
    },
    focus () {
      focusOnPageElement(
        this.$refs.section
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
