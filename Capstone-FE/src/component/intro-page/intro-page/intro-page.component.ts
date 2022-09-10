import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { SliderItem } from 'src/data-type/silder-item';
import { AuthService } from 'src/service/auth-service/auth.service';

@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})
export class IntroPageComponent implements OnInit, AfterViewInit, AfterContentInit {

  constructor() {
   }
  autoSlide:Object = {
    interval: 2,
    stopOnHover: true
  }
  imageSize:Object = {
    'height': '300px',
    'width': '500px',
    'space': 2
  }
  moviesCategoryList:SliderItem[] = [
    new SliderItem('https://cdn.flickeringmyth.com/wp-content/uploads/2021/11/action-21st-century.jpg', 'Action'),
    new SliderItem('https://media1.popsugar-assets.com/files/thumbor/PkKCDYWvSjTfu1jlarIBLKrbpxA/fit-in/550x550/filters:format_auto-!!-:strip_icc-!!-/2011/12/51/1/192/1922283/90984b3042e07cb0_DRAMA.jpg', 'Drama'),
    new SliderItem('https://support.musicgateway.com/wp-content/uploads/2021/04/Copy-of-800-x-500-Blog-Post-12-6.png', 'Crime'),
    new SliderItem('https://s.studiobinder.com/wp-content/uploads/2020/05/Best-Thriller-Movies-of-All-Time-Ranked-for-Filmmakers-Featured.jpg', 'Thriller'),
    new SliderItem('https://www.scrolldroll.com/wp-content/uploads/2022/03/Best-Adventure-Movies-featured.jpg', 'Adventure'),
    new SliderItem('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/murder-mystery-movies-1631583244.jpg', 'Mystery')
  ]
  ngOnInit(): void {
    console.log(this.moviesCategoryList[0])
    this.buttonEventInit()
    this.sliderAutoTransitions()
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }
  buttonEventInit() {
    document.querySelector('#slider')?.addEventListener('mouseover', () => {
      document.querySelector('.next-btn')?.classList.add('btn-show')
      document.querySelector('.prev-btn')?.classList.add('btn-show')
    })
    document.querySelector('#slider')?.addEventListener('mouseleave', () => {
      document.querySelector('.next-btn')?.classList.remove('btn-show')
      document.querySelector('.prev-btn')?.classList.remove('btn-show')
    })
  }
  sliderAutoTransitions() {
    let sliderList = document.getElementsByClassName('slider-item ng-star-inserted')
    let index = 0
  }

}
