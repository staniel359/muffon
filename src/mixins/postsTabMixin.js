import {
  posts as postsLimits
} from '@/helpers/data/limits'
import {
  generateKey
} from '@/helpers/utils'

export default {
  data () {
    return {
      key: null,
      formKey: null,
      limit:
        postsLimits.simple.small,
      scope: 'posts'
    }
  },
  methods: {
    handlePostCreateSuccess (
      value
    ) {
      this.addPostToPosts(
        value
      )

      this.refreshForm()
    },
    addPostToPosts (
      value
    ) {
      if (this.$refs.list) {
        this.$refs
          .list
          .addPostToPosts(
            value
          )
      } else {
        this.refreshTab()
      }
    },
    refreshTab () {
      this.key = generateKey()
    },
    refreshForm () {
      this.formKey = generateKey()
    }
  }
}
