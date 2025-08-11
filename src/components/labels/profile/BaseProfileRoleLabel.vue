<template>
  <BaseLabel
    v-if="isRender"
    :class="[
      'primary circular',
      {
        'small': isSmall,
        'main-right-mini-section': isRight
      }
    ]"
    :text="roleText"
    :is-invertable="false"
  />
</template>

<script>
import BaseLabel from '@/components/labels/BaseLabel.vue'

export default {
  name: 'BaseProfileRoleLabel',
  components: {
    BaseLabel
  },
  props: {
    profileData: {
      type: Object,
      required: true
    },
    isSmall: Boolean,
    isRight: Boolean
  },
  data () {
    return {
      roles: [
        'creator'
      ]
    }
  },
  computed: {
    isRender () {
      return this.roles.includes(
        this.role
      )
    },
    role () {
      return this.profileData.role
    },
    roleText () {
      return this.$t(
        `roles.${this.role}`
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
