<template>
  <div class="card">
    <img :src="blogProp.creator.coverImg" class="card-img-top cover" alt="blogProp">
    <div class="card-body">
      <router-link :to="{
        name: 'Blog', params: {
          blogId: blogProp.id
        }
      }">
        <p class="card-text fs-3">{{ blogProp.title }}</p>
      </router-link>
      <router-link :to="{ name: 'Profile', params: { profileId: blogProp.creatorId } }" class="d-flex align-items-center">
        <img :src="blogProp.creator.picture" alt="" class="avatar mx-2">
        <p>{{ blogProp.creator.name }}</p>
      </router-link>
    </div>
  </div>
</template>


<script>
import { BlogPost } from "../models/BlogPost.js";

export default {
  props: {
    blogProp: { type: BlogPost, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>