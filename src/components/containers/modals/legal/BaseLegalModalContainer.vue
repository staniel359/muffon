<template>
  <BaseSegmentModalContainer
    ref="modal"
    :response-data="legalData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    @call="handleCall"
  >
    <template
      #default
    >
      <slot
        :[scope]="legalData[scopeFormatted]"
      />
    </template>
  </BaseSegmentModalContainer>
</template>

<script>
import {
  snakeCase
} from 'change-case'
import BaseSegmentModalContainer
  from '@/components/containers/modals/BaseSegmentModalContainer.vue'
import getLegal from '@/helpers/actions/api/legal/get'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'BaseLegalModalContainer',
  components: {
    BaseSegmentModalContainer
  },
  mixins: [
    modalMixin
  ],
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      legalData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    legalArgs () {
      return {
        scope: this.scope
      }
    },
    scopeFormatted () {
      return snakeCase(
        this.scope
      )
    }
  },
  methods: {
    getLegal,
    getData () {
      this.getLegal(
        this.legalArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
