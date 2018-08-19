import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Utils} from '../../utils/utils';
import {Description, DescriptionStrategy, GalleryService, Image} from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {

  public isHeaderCollapse = false;

  images: Image[] = [
    new Image(0, {
      img: 'http://localhost:4200/assets/img/gallery/1.png'
    }),
    new Image(1, {
      img: 'http://localhost:4200/assets/img/gallery/2.png'
    }),
    new Image(2, {
      img: 'http://localhost:4200/assets/img/gallery/3.png'
    }),
    new Image(3, {
      img: 'http://localhost:4200/assets/img/gallery/4.png'
    }),
    new Image(4, {
      img: 'http://localhost:4200/assets/img/gallery/5.png'
    }),
    new Image(5, {
      img: 'http://localhost:4200/assets/img/gallery/6.png'
    }),
    new Image(6, {
      img: 'http://localhost:4200/assets/img/gallery/7.png'
    }),
    new Image(7, {
      img: 'http://localhost:4200/assets/img/gallery/8.png'
    }),
    new Image(8, {
      img: 'http://localhost:4200/assets/img/gallery/9.png'
    }),
    new Image(9, {
      img: 'http://localhost:4200/assets/img/gallery/10.png'
    }),
    new Image(10, {
      img: 'http://localhost:4200/assets/img/gallery/11.png'
    }),
    new Image(11, {
      img: 'http://localhost:4200/assets/img/gallery/12.png'
    }),
    new Image(12, {
      img: 'http://localhost:4200/assets/img/gallery/13.png'
    }),
    new Image(13, {
      img: 'http://localhost:4200/assets/img/gallery/14.png'
    }),
    new Image(14, {
      img: 'http://localhost:4200/assets/img/gallery/15.png'
    }),
    new Image(15, {
      img: 'http://localhost:4200/assets/img/gallery/16.png'
    }),
    new Image(16, {
      img: 'http://localhost:4200/assets/img/gallery/17.png'
    })
  ];

  customDescription: Description = {
    strategy: DescriptionStrategy.HIDE_IF_EMPTY
  };

  constructor(protected galleryService: GalleryService) {
  }

  @HostListener('document:scroll', ['$event'])
  onScroll($event: Event): void {
    this.isHeaderCollapse = $event.srcElement.firstElementChild.scrollTop > 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
   this.initMap();
  }

  getLessons() {
    return [{
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
    this.galleryService.openGallery(9, id);
  }
}

