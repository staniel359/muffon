<template>
  <BaseErrorMessage
    v-if="error"
    :error="error"
    isWithRefreshButton
    @refresh="handleRefresh"
  />
  <template
    v-else-if="isResponsePageCollection"
  >
    <slot
      v-if="isClientPageCollectionFiltered"
      :[scope]="clientPageCollectionFiltered"
    />
    <NoCollectionMessage
      v-else
      :scope="scope"
    />
  </template>
</template>

<script>
import BaseErrorMessage from '*/components/messages/BaseErrorMessage.vue'
import NoCollectionMessage from './ContentContainer/NoCollectionMessage.vue'

export default {
  name: 'ContentContainer',
  components: {
    BaseErrorMessage,
    NoCollectionMessage
  },
  props: {
    responsePageCollection: {
      type: Array,
      default () {
        return []
      }
    },
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
    isResponsePageCollection () {
      return !!this.responsePageCollection?.length
    },
    isClientPageCollectionFiltered () {
      return !!this.clientPageCollectionFiltered?.length
    },
    clientPageCollectionFiltered () {
      return this.clientPageCollection?.filter(item => {
        return item
      })
    }
  },
  methods: {
    handleRefresh () {
      this.$emit(
        'refresh'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
