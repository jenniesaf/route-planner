import { LocationId } from './location'

export type Activity = {
  id: string
  name: string
  duration?: string
  availableAt: LocationId[] | LocationId
}
