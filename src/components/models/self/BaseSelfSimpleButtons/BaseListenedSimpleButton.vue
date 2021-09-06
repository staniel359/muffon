<template>
  <div
    v-if="listenedId"
    ref="button"
    :data-content="popupTextFormatted"
  >
    <BaseLinkContainer :link="{}">
      <BaseButton
        class="basic circular compact tiny listened-simple-button"
        icon="check primary"
        :class="{
          loading: isLoading,
          disabled: isLoading
        }"
        @click="handleClick"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseButton from '@/BaseButton.vue'
import deleteListenedData
  from '#/actions/api/profile/listened/model/deleteData'
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'

export default {
  name: 'BaseListenedSimpleButton',
  components: {
    BaseLinkContainer,
    BaseButton
  },
  props: {
    model: {
      type: String,
      required: true
    },
    modelId: String
  },
  data () {
    return {
      listenedId: null,
      isLoading: false
    }
  },
  computed: {
    popupTextFormatted () {
      return this.$t(
        'shared.listened.delete'
      )
    }
  },
  mounted () {
    this.listenedId = this.modelId

    this.$nextTick(() => {
      setPopup(
        this.$refs.button,
        popupOptions()
      )
    })
  },
  methods: {
    handleClick () {
      return this.deleteListenedData({
        model: this.model,
        listenedId: this.listenedId
      })
    },
    deleteListenedData
  }
}
</script>

<style lang="sass" scoped>
.listened-simple-button
  @extend .no-margin
</style>
