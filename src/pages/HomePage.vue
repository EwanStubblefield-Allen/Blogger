<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="blog in blogPosts" :key="blog.id" class="col-8 m-auto mb-3">
        <BlogPost :blogProp="blog" />
        <!-- <div class="card">
          <img :src="blog.creator.coverImg" class="card-img-top cover" alt="Blog">
          <div class="card-body">
            <router-link :to="{
              name: 'Blog', params: {
                blogId: blog.id
              }
            }">
              <p class="card-text fs-3">{{ blog.title }}</p>
            </router-link>
            <router-link :to="{ name: 'Profile', params: { profileId: blog.creatorId } }"
              class="d-flex align-items-center">
              <img :src="blog.creator.picture" alt="" class="avatar mx-2">
              <p>{{ blog.creator.name }}</p>
            </router-link>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue"
import Pop from "../utils/Pop.js"
import { blogPostService } from "../services/BlogPostService.js"
import { AppState } from '../AppState';


export default {
  setup() {
    async function getBlogPosts() {
      try {
        blogPostService.getBlogPosts()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getBlogPosts()
    })
    return {
      blogPosts: computed(() => AppState.blogs),
      // setActiveBlog(blog){
      //   blogPostService.setActiveBlog(blog)
      // }
    }
  }
}
</script>

<style scoped lang="scss">
.cover {
  height: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>
