export class MovieDataType {
  id:number|string = ''
  title: string = '';
  releaseDate: string = '';
  constructor(id:number|string, title: string, releaseDate: string) {
      this.id = id
      this.title = title
      this.releaseDate = releaseDate
  }
}
