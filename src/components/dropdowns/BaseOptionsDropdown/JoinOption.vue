<template>
  <BaseCommunityJoinButtonContainer
    :communityData="communityData"
  >
    <template #default="slotProps">
      <div
        class="item"
        :class="{
          disabled: slotProps.isLoading
        }"
        @click.prevent="slotProps.onClick"
      >
        <i
          v-if="slotProps.isLoading"
          class="icon"
        >
          <div
            class="ui mini active inline loader"
          ></div>
        </i>
        <i
          v-else
          class="icon"
          :class="slotProps.icon"
        ></i>

        {{ slotProps.text }}
      </div>
    </template>
  </BaseCommunityJoinButtonContainer>
</template>

<script>
import BaseCommunityJoinButtonContainer
  from '*/components/containers/community/BaseCommunityJoinButtonContainer.vue'

export default {
  name: 'JoinOption',
  components: {
    BaseCommunityJoinButtonContainer
  },
  props: {
    communityData: Object
  },
  emits: [
    'click'
  ]
}
</script>

<style lang="sass" scoped></style>
