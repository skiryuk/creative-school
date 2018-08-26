import {AfterViewInit, ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {Utils} from '../../utils/utils';
import {Description, DescriptionStrategy, GalleryService, Image} from '@ks89/angular-modal-gallery';
import {EasingLogic} from 'ngx-page-scroll';
import {NgxMasonryOptions} from 'ngx-masonry';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {

  public isHeaderCollapse = false;
  public isOpenedMobileMenu = false;

  easing: EasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
      // easeInOutExpo easing
      if (t === 0) { return b; }
      if (t === d) { return b + c; }
      if ((t /= d / 2) < 1) { return c / 2 * Math.pow(2, 10 * (t - 1)) + b; }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  };

  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 0,
    resize: true,
    initLayout: true,
    fitWidth: true,
    columnWidth: 250
  };

  images: Image[] = [
    new Image(0, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/1.png'
    }),
    new Image(1, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/2.png'
    }),
    new Image(2, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/3.png'
    }),
    new Image(3, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/4.png'
    }),
    new Image(4, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/5.png'
    }),
    new Image(5, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/6.png'
    }),
    new Image(6, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/7.png'
    }),
    new Image(7, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/8.png'
    }),
    new Image(8, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/9.png'
    }),
    new Image(9, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/10.png'
    }),
    new Image(10, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/11.png'
    }),
    new Image(11, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/12.png'
    }),
    new Image(12, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/13.png'
    }),
    new Image(13, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/14.png'
    }),
    new Image(14, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/15.png'
    }),
    new Image(15, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/16.png'
    })
  ];

  lessons = [{
    id: 1,
    name: 'правополушарное рисование для начинающих',
    img: '../../../assets/img/lesson-photo.png',
    description: 'Занятие предназначено для тех, кто никогда не брал кисточку в руки. На занятии вы получите навыки рисования, используя правополушарный метод',
    price: 2000,
    date: '2018-02-10T11:30:00',
    abonement: false
  }, {
    id: 2,
    name: 'правополушарное рисование для начинающих',
    img: '../../../assets/img/lesson-photo2.jpg',
    description: 'Занятие предназначено для тех, кто никогда не брал кисточку в руки. На занятии вы получите навыки рисования, используя правополушарный метод',
    price: 0,
    date: '2018-02-10T11:30:00',
    abonement: true
  }, {
    id: 3,
    name: 'правополушарное рисование для начинающих',
    img: '../../../assets/img/lesson-photo3.jpg',
    description: 'Занятие предназначено для тех, кто никогда не брал кисточку в руки. На занятии вы получите навыки рисования, используя правополушарный метод',
    price: 2000,
    date: '2018-02-10T11:30:00',
    abonement: false
  }, {
    id: 4,
    name: 'правополушарное рисование для начинающих',
    img: '../../../assets/img/lesson-photo4.jpg',
    description: 'Занятие предназначено для тех, кто никогда не брал кисточку в руки. На занятии вы получите навыки рисования, используя правополушарный метод',
    price: 0,
    date: '2018-02-10T11:30:00',
    abonement: true
  }, {
    id: 5,
    name: 'правополушарное рисование для начинающих',
    img: '../../../assets/img/lesson-photo.png',
    description: 'Занятие предназначено для тех, кто никогда не брал кисточку в руки. На занятии вы получите навыки рисования, используя правополушарный метод',
    price: 2000,
    date: '2018-02-10T11:30:00',
    abonement: false
  }, {
    id: 6,
    name: 'правополушарное рисование для начинающих',
    img: '../../../assets/img/lesson-photo.png',
    description: 'Занятие предназначено для тех, кто никогда не брал кисточку в руки. На занятии вы получите навыки рисования, используя правополушарный метод',
    price: 0,
    date: '2018-02-10T11:30:00',
    abonement: true
  }, {
    id: 7,
    name: 'правополушарное рисование для начинающих',
    img: '../../../assets/img/lesson-photo.png',
    description: 'Занятие предназначено для тех, кто никогда не брал кисточку в руки. На занятии вы получите навыки рисования, используя правополушарный метод',
    price: 2000,
    date: '2018-02-10T11:30:00',
    abonement: false
  }];

  customDescription: Description = {
    strategy: DescriptionStrategy.HIDE_IF_EMPTY
  };

  constructor(protected galleryService: GalleryService) {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: Event): void {
    const scrollTop = (<any>$event.target).scrollingElement.scrollTop || (<any>$event.target).documentElement.scrollTop;
    this.isHeaderCollapse = scrollTop > 100;
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  onOutsideClick(event) {
    if (event.target.id !== 'mobile-nav-toggle' && event.target.id !== 'mobile-nav-toggle-icon') {
      setTimeout(() => {
        this.isOpenedMobileMenu = false;
      }, 200);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isOpenedMobileMenu = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
   this.initMap();
  }

  getFormattedDate(strDate: string): string {
    const date = new Date(strDate);
    return `${date.getDate()} ${Utils.getMonthName(date.getMonth())}, ${Utils.getDayWeekName(date.getDay())} в ${date.getHours()}:${date.getMinutes()}`;
  }

  async initMap() {
      const ymaps = await Utils.initYMap() as any;
      ymaps.ready(init);

      function init() {
        const mapObject = new ymaps.Map('contacts-map-container', {
          center: [56.221646, 57.99807],
          controls: [],
          zoom: 13,
          autoFitToViewport: 'always'
        });
        const markersCollection = new ymaps.GeoObjectCollection();
        const defaultMarker = new ymaps.Placemark([56.231932, 58.007608], {}, {
          preset: 'islands#redIcon'
        });
        markersCollection.add(defaultMarker);
        mapObject.geoObjects.add(markersCollection);
        mapObject.setBounds(markersCollection.getBounds());
        mapObject.setZoom(17);
      }
  }

  onClickPhoto(id: number) {
    this.galleryService.openGallery(1, id);
  }

  showMoreImgs() {
    const newIng = new Image(16, {
      img: 'https://creative-school.herokuapp.com/assets/img/gallery/17.png',
      title: ' ',
      alt: ' '
    }, {
      img: '',
      title: ' '
    });
    this.images = [...this.images, newIng];
  }

  onExpandMobileMenu(evt: MouseEvent) {
    evt.stopPropagation();
    this.isOpenedMobileMenu = !this.isOpenedMobileMenu;
  }
}

