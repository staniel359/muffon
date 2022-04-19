<template>
  <div class="extra-section">
    <BaseProfileImageField
      class="image-field"
      :value="imageData?.medium"
      @change="handleImageChange"
    />

    <div class="extra-fields">
      <BaseProfileGenderField
        :value="gender"
      />

      <BaseProfileBirthdateField
        :key="key"
        :value="birthdate"
      />

      <BaseProfileCountryField
        :value="country"
      />

      <BaseProfileCityField
        :value="city"
      />

      <div />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseProfileImageField
  from '*/components/fields/profile/BaseProfileImageField.vue'
import BaseProfileGenderField
  from '*/components/fields/profile/BaseProfileGenderField.vue'
import BaseProfileBirthdateField
  from '*/components/fields/profile/BaseProfileBirthdateField.vue'
import BaseProfileCountryField
  from '*/components/fields/profile/BaseProfileCountryField.vue'
import BaseProfileCityField
  from '*/components/fields/profile/BaseProfileCityField.vue'
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'ExtraSection',
  components: {
    BaseProfileImageField,
    BaseProfileGenderField,
    BaseProfileBirthdateField,
    BaseProfileCountryField,
    BaseProfileCityField
  },
  props: {
    isActive: Boolean
  },
  emits: [
    'imageChange'
  ],
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    imageData () {
      return this.profileInfo.image
    },
    gender () {
      return this.profileInfo.gender
    },
    birthdate () {
      return this.profileInfo.birthdate
    },
    country () {
      return this.profileInfo.country
    },
    city () {
      return this.profileInfo.city
    }
  },
  watch: {
    isActive: 'handleIsActiveChange'
  },
  methods: {
    handleImageChange (
      value
    ) {
      this.$emit(
        'imageChange',
        value
      )
    },
    handleIsActiveChange (
      value
    ) {
      if (value) {
        this.key = generateKey()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.extra-section
  @extend .d-flex

.image-field
  width: 120px
  margin-right: 1em !important

.extra-fields
  @extend .flex-full
</style>
