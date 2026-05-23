import { Activity } from "./activities";

export type RouteStop = {
  id: string;
  name: string;
  type?: string;
  //options?: string[];
  options?: { id: string; name: string | Activity }[];
};

export type Location = {
  id: string
  name: string
  lat: number
  lng: number
  availableActivities: Activity['id'][]
  recommended?: boolean
  startingPoint?: string[] | string
  endingPoint?: string[] | string
  route?: RouteStop[]
}

export type LocationId = Location['id']
