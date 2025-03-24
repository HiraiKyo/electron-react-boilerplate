import { apiClient } from './config'

export type DemoState = {
  tick: number
  players: any[]
  // 他の必要な型定義
}

export const demosApi = {
  async upload(file: File) {
    const formData = new FormData()
    formData.append('demo', file)
    const { data } = await apiClient.post<{ demoId: string }>('/demos', formData)
    return data
  },

  async getState(demoId: string, tick: number) {
    const { data } = await apiClient.get<DemoState>(`/demos/${demoId}/state`, {
      params: { tick }
    })
    return data
  }
}
