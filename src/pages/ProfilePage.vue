<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10 m-auto">
        <div v-if="profile" class="card">
          <img :src="profile.picture" class="card-img-top" alt="profile.name">
          <div class="card-body">
            <h2> {{ profile.name }}</h2>
            <h3 class="card-text"> {{ profile.bio }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="profile?.id == account?.id" class="col-10 m-auto btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#blogPostModal"><i class=" mdi
        mdi-plus-thick fs-1"></i></div>
    </div>
    <div v-for="blog in blogs" :key="blog.id" class="col-8 m-auto mb-3">
      <BlogPost :blogProp="blog" />
    </div>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="blogPostModal" tabindex="-1" aria-labelledby="blogPostModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="blogPostModalLabel">Create Blog Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createBlogPost()">
          <div class="modal-body">
            <div>
              <label for="" id="title"></label>
              <input v-model="editable.title" class="form-control" type="text" id="title" placeholder="Title">
            </div>
            <div>
              <label for="" id="body"></label>
              <textarea v-model="editable.body" class="form-control" name="body" id="body" cols="30" rows="10"
                placeholder="Body"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-warning">Post</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { profileService } from "../services/ProfileService.js";
import Pop from "../utils/Pop.js";
import { blogPostService } from "../services/BlogPostService.js";
import { AppState } from "../AppState.js";
import { Modal } from "bootstrap";

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    const profileId = route.params.profileId

    async function getProfileById() {
      try {
        await profileService.getProfileById(profileId)
      } catch (error) {
        Pop.error(error.message, '[GET PROFILE BY ID]')
      }
    }
    async function getBlogsByProfileId() {
      try {
        await blogPostService.getBlogsByProfileId(profileId)
      } catch (error) {
        Pop.error(error.message, '[GET PROFILE BY ID]')
      }
    }



    onMounted(() => {
      getBlogsByProfileId()
      getProfileById()
    })
    return {
      editable,
      profile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account),
      blogs: computed(() => AppState.blogs),
      async createBlogPost() {
        try {
          const formData = editable.value
          await blogPostService.createBlogPost(formData)
          Modal.getOrCreateInstance('#blogPostModal').hide()
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 60vh;
}
</style>