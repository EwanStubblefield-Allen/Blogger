<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <div class="col-10">
        <div v-if="activeBlog" class="card">
          <img :src="activeBlog.creator.coverImg" class="card-img-top" alt="alt">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <img :src="activeBlog.creator.picture" alt="" class="rounded-circle px-3">
              <div>
                <p class="fs-1">{{ activeBlog.title }}</p>
                <p class="fs-5">By: {{ activeBlog.creator.name }}</p>
              </div>
            </div>
            <p class="card-text">{{ activeBlog.body }}</p>
          </div>
          <button @click="removeActivePost()" v-if="activeBlog.creatorId == account.id"
            class="mdi mdi-delete bg-danger"></button>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue"
import { blogPostService } from "../services/BlogPostService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";

export default {
  // props: {
  //   blogProp: {type: BlogPost, required: true}
  // },


  setup() {
    async function setActiveBlogById() {
      try {
        const blogId = route.params.blogId
        await blogPostService.setActiveBlogById(blogId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    const route = useRoute()
    onMounted(() => {
      setActiveBlogById()
    })

    return {
      async removeActivePost() {
        try {
          const toRemove = await Pop.confirm('delete? yo')
          if (!toRemove) {
            return
          }
          await blogPostService.removeActivePost()
        } catch (error) {
          Pop.error(error.message)
        }
      },
      activeBlog: computed(() => AppState.activeBlog),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped></style>