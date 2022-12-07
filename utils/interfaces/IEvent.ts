interface IImgArray {
  [index: number]: {};
}

export default interface IEvent {
  name: string
  date: Date
  description: string
  rsvp: string
  // [img: number]: {},
  location: string
}