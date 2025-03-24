import useSWR from 'swr'
import { demosApi, DemoState } from '../api/demos'

export const useDemoState = (demoId: string | null, tick: number) => {
  return useSWR<DemoState>(
    demoId ? [`demo-state`, demoId, tick] : null,
    () => demoId && demosApi.getState(demoId, tick)
  )
}
