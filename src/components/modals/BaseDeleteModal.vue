<template>
  <BaseModalContainer
    ref="modal"
    class="main-delete-modal"
    is-multiple
  >
    <div
      class="header"
      v-text="headerText"
    />

    <div class="scrolling content">
      <div
        v-if="error"
        class="main-top-section"
      >
        <BaseErrorMessage
          :error="error"
        />
      </div>

      <TextSection
        :model-type="modelType"
        :model="model"
        :model-name="modelName"
        :parent-model-name="parentModelName"
        :is-with-also-text="isWithAlsoText"
      />
    </div>

    <div class="actions main-buttons-container">
      <BaseButton
        class="basic cancel circular"
        :text="cancelText"
      />

      <BaseButton
        class="red circular"
        left-icon="delete"
        :text="deleteText"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        :is-invertable="false"
        @click="handleDeleteButtonClick"
      />
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import TextSection from './BaseDeleteModal/TextSection.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'BaseDeleteModal',
  components: {
    BaseModalContainer,
    BaseErrorMessage,
    TextSection,
    BaseButton
  },
  props: {
    modelType: {
      type: String,
      required: true
    },
    model: String,
    modelName: String,
    parentModelName: String,
    isLoading: Boolean,
    error: Error,
    isWithAlsoText: Boolean
  },
  emits: [
    'deleteButtonClick'
  ],
  computed: {
    headerText () {
      return this.$t(
        [
          'modals.delete.header',
          this.modelType,
          this.model
        ].filter(
          e => e
        ).join(
          '.'
        )
      )
    },
    cancelText () {
      return this.$t(
        'actions.cancel'
      )
    },
    deleteText () {
      return this.$t(
        'actions.delete'
      )
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.$emit(
        'deleteButtonClick'
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
