import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class ProfileService {
  async getProfileById(profileId) {
    const res = await api.get(`api/profiles/${profileId}`)
    AppState.activeProfile = res.data
  }
}

export const profileService = new ProfileService()