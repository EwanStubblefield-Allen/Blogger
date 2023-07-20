import { useRouter } from "vue-router"
import { AppState } from "../AppState.js"
import { BlogPost } from "../models/BlogPost.js"
import { router } from "../router.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class BlogPostService {
  async getBlogPosts() {
    const res = await api.get('api/blogs')
    logger.log('[Api response]', res.data)
    AppState.blogs = res.data.map(blogPojo => new BlogPost(blogPojo))
  }

  async setActiveBlogById(blogId) {
    const res = await api.get(`api/blogs/${blogId}`)
    logger.log(res.data)
    AppState.activeBlog = new BlogPost(res.data)
  }

  async getBlogsByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/blogs`)
    AppState.blogs = res.data.map(b => new BlogPost(b))
  }

  async createBlogPost(formData) {
    const res = await api.post('api/blogs', formData)
    logger.log(res.data)
    AppState.blogs.unshift(new BlogPost(res.data))
  }

  async removeActivePost() {
    const res = await api.delete(`api/blogs/${AppState.activeBlog.id}`)
    window.location.href = ''
    const removeId = AppState.blogs.findIndex(b => b.id == AppState.activeBlog.id)
    AppState.blogs.splice(removeId, 1)
  }

}
export const blogPostService = new BlogPostService()