<template>
  <strong
    class="main-link"
    @click.stop="handleClick"
    v-text="legalText"
  />

  <BaseLegalModal
    ref="modal"
    :scope="scope"
  />
</template>

<script>
import BaseLegalModal from '@/components/modals/legal/BaseLegalModal.vue'

export default {
  name: 'LegalTextSection',
  components: {
    BaseLegalModal
  },
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  computed: {
    legalText () {
      return this.$t(
        `forms.fields.legal.${this.scope}`
      )
    }
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
