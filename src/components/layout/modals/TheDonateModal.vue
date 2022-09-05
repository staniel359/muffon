<template>
  <BaseModalContainer
    ref="modal"
  >
    <div
      class="header"
      v-text="headerText"
    />

    <ContentSection />

    <div class="actions">
      <DeclineButton />

      <AcceptButton />
    </div>
  </BaseModalContainer>
</template>

<script>
import electronStore from '*/plugins/electronStore'
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import ContentSection from './TheDonateModal/ContentSection.vue'
import DeclineButton from './TheDonateModal/DeclineButton.vue'
import AcceptButton from './TheDonateModal/AcceptButton.vue'

export default {
  name: 'TheDonateModal',
  components: {
    BaseModalContainer,
    ContentSection,
    DeclineButton,
    AcceptButton
  },
  provide () {
    return {
      setModalHidden: this.setModalHidden
    }
  },
  computed: {
    isShow () {
      return electronStore.get(
        'layout.isShowDonateModal'
      )
    },
    headerText () {
      return this.$t(
        'donate.header'
      )
    }
  },
  mounted () {
    if (this.isShow) {
      this.show()
    }
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    },
    setModalHidden () {
      electronStore.set(
        {
          'layout.isShowDonateModal': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
