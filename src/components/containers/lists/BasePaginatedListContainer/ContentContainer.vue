<template>
  <div>
    <BaseErrorMessage
      v-if="error"
      :error="error"
      is-with-refresh-button
      @refresh="handleRefresh"
    />
    <template
      v-else-if="isClientPageCollection"
    >
      <slot
        v-if="isClientPageCollectionFiltered"
        :[scope]="clientPageCollectionFiltered"
      />
      <BaseNoCollectionMessage
        v-else
        :scope="scope"
      />
    </template>
  </div>
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import BaseNoCollectionMessage
  from '*/components/messages/BaseNoCollectionMessage.vue'

export default {
  name: 'ContentContainer',
  components: {
    BaseErrorMessage,
    BaseNoCollectionMessage
  },
  props: {
    clientPageCollection: {
      type: Array,
      default () {
        return []
      }
    },
    scope: String,
    error: Error
  },
  emits: [
    'refresh'
  ],
  computed: {
    isClientPageCollection () {
      return !!this.clientPageCollection?.length
    },
    isClientPageCollectionFiltered () {
      return !!this.clientPageCollectionFiltered?.length
    },
    clientPageCollectionFiltered () {
      return this.clientPageCollection?.filter(
        this.isItemPresent
      )
    }
  },
  methods: {
    handleRefresh () {
      this.$emit(
        'refresh'
      )
    },
    isItemPresent (
      item
    ) {
      return item
    }
  }
}
</script>

<style lang="sass" scoped></style>
