<template>
  <div class="action-button-container">
    <BaseButton
      class="basic circular"
      icon="listSimple"
      :text="whatsNewText"
      @click="handleClick"
    />

    <BaseAppReleasesModal
      ref="modal"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseAppReleasesModal
  from '@/components/modals/appReleases/BaseAppReleasesModal.vue'

export default {
  name: 'WhatsNewButtonSection',
  components: {
    BaseButton,
    BaseAppReleasesModal
  },
  computed: {
    whatsNewText () {
      return this.$t(
        'navigation.whatsNew'
      )
    }
  },
  methods: {
    handleClick () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
