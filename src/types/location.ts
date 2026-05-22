import { ActivityId } from "./activities";

export type RouteStop = {
  id: string;
  name: string;
  type?: string;
  options?: { id: string; name: string | ActivityId }[];
};

export type Location = {
  id: string
  name: string
  lat: number
  lng: number
  availableActivities: ActivityId[] | ActivityId
  recommended?: boolean
  startingPoint?: string[] | string
  endingPoint?: string[] | string
  route?: RouteStop[]
}

export type LocationId = Location['id']
