import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Utils} from '../../utils/utils';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {

  public isHeaderCollapse = false;

  constructor() { }

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
}

