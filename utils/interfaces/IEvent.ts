import IImgArray from "./IImgArray"

export default interface IEvent {
  name: string
  date: Date
  description: string
  participants: string
  recapImg?: IImgArray
  location: string
}