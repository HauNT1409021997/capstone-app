export class SliderItem {
  public image!: string;
  public thumbImage!: string;
  public alt!: string;
  public title!: string;
  constructor(image:string, title:string, alt:string = '', thumbImage:string = '') {
    this.image = image
    this.thumbImage = image || thumbImage
    this.title = title
    this.alt = alt
  }
}
