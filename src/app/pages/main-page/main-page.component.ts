import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Utils} from '../../utils/utils';
import {Description, DescriptionStrategy, GalleryService, Image} from '@ks89/angular-modal-gallery';
import {EasingLogic} from 'ngx-page-scroll';
import {NgxMasonryOptions} from 'ngx-masonry';
import {DataService} from '../../services/data.service';
import {ReviewModel} from '../../models/review.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginModalComponent} from '../../components/modals/login/login.modal';
import {AuthService} from '../../services/auth.service';
import {AddPhotoModalComponent} from '../../components/modals/add-photo/add-photo.modal';
import {AddEventModalComponent} from '../../components/modals/add-event/add-event.modal';
import {EventInfoModel} from '../../models/event.model';
import {AddReviewModalComponent} from '../../components/modals/add-review/add-review.modal';
import {forkJoin} from 'rxjs';
import {NotifierService} from 'angular-notifier';
import {FeedbackModel} from '../../models/feedback.model';
import {JoinEventsModalComponent} from '../../components/modals/join-events/join-events.modal';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {

  isHeaderCollapse = false;
  isOpenedMobileMenu = false;
  eventCategory = 1;

  reviews: Array<ReviewModel> = [];
  events: Array<EventInfoModel> = [];

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

  images: Array<Image> = [];

  customDescription: Description = {
    strategy: DescriptionStrategy.HIDE_IF_EMPTY
  };

  isLoading = false;
  isSending = false;

  modelFeedback = new FeedbackModel();

  constructor(protected galleryService: GalleryService,
              protected authService: AuthService,
              protected dataService: DataService,
              protected modalService: NgbModal,
              protected notifierService: NotifierService) {
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
    forkJoin(
      this.dataService.getEvents(this.eventCategory),
      this.dataService.getImages(),
      this.dataService.getReviews()
    ).subscribe(res => {
      this.events = res[0];
      this.images = res[1].map(image =>
        new Image(image.id, { img: `/api/images/view/${image.id}`}));
      this.reviews = res[2];
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.notifierService.show({
        type: 'error',
        message: JSON.stringify(err)
      });
    });
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

  onExpandMobileMenu(evt: MouseEvent) {
    evt.stopPropagation();
    this.isOpenedMobileMenu = !this.isOpenedMobileMenu;
  }

  openLoginModal() {
    this.modalService.open(LoginModalComponent, { size: 'lg', backdrop: 'static' });
  }

  openAddPhotoModal() {
    const modalRef = this.modalService.open(AddPhotoModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((id: number) => {
      const newImage = new Image(id, { img: `/api/images/view/${id}`});
      this.images = [newImage, ...this.images];
    }, (reason) => {
    });
  }

  openAddEventModal() {
    const modalRef = this.modalService.open(AddEventModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.model.type = this.eventCategory;
    modalRef.result.then((event: EventInfoModel) => {
      if (event && this.eventCategory === event.type) {
        this.events = [event, ...this.events];
      }
    }, (reason) => {
    });
  }

  openAddReviewModal() {
    const modalRef = this.modalService.open(AddReviewModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((review: ReviewModel) => {
        this.reviews = [review, ...this.reviews];
    }, (reason) => {
    });
  }

  openJoinEventModal(event: EventInfoModel) {
    const modalRef = this.modalService.open(JoinEventsModalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.model.event = event;
  }

  isAuth() {
    return this.authService.isAuth();
  }

  logout() {
    this.authService.logout();
  }

  hasMoreImgs() {
    return this.dataService.currentImagesPage < this.dataService.totalImagesPages;
  }

  hasMoreEvents() {
    return this.dataService.currentEventsPage < this.dataService.totalEventsPage;
  }

  hasMoreReviews() {
    return this.dataService.currentReviewsPage < this.dataService.totalReviewsPage;
  }

  showMoreImgs() {
    this.dataService.getImages()
      .subscribe(images => {
        const newImages = images.map(image =>
          new Image(image.id, { img: `/api/images/view/${image.id}`}));
        this.images = [...this.images, ...newImages];
      });
  }

  showMoreEvents() {
    this.dataService.getEvents(this.eventCategory)
      .subscribe(events => {
        this.events = [...this.events, ...events];
      });
  }

  showMoreReviews() {
    this.dataService.getReviews()
      .subscribe(reviews => {
        this.reviews = [...this.reviews, ...reviews];
      });
  }

  onChangeEventCategory(eventCategory: number) {
    if (eventCategory !== this.eventCategory) {
      this.eventCategory = eventCategory;

      this.dataService.resetEventsPageState();
      this.dataService.getEvents(this.eventCategory)
        .subscribe(events => {
          this.events = events;
        });
    }
  }

  getEventPhotoUrl(id: number) {
    return `/api/events/view/${id}`;
  }

  onRemoveEvent(id: number) {
    this.dataService.removeEvent(id)
      .subscribe(res => {
        this.events = this.events.filter(event => event.id !== id);
        this.notifierService.show({
          type: 'success',
          message: 'Занятие успешно удалено'
        });
      }, err => {
        console.error(err);
        this.notifierService.show({
          type: 'error',
          message: JSON.stringify(err)
        });
      });
  }

  onRemovePhoto(id: number) {
    this.dataService.removeImage(id)
      .subscribe(res => {
        this.images = this.images.filter(image => image.id !== id);
        this.notifierService.show({
          type: 'success',
          message: 'Фото успешно удалено'
        });
  }, err => {
        console.error(err);
        this.notifierService.show({
          type: 'error',
          message: JSON.stringify(err)
        });
      });
  }

  onRemoveReview(id: number) {
    this.dataService.removeReview(id)
      .subscribe(res => {
        this.reviews = this.reviews.filter(review => review.id !== id);
        this.notifierService.show({
          type: 'success',
          message: 'Отзыв успешно удален'
        });
      }, err => {
        console.error(err);
        this.notifierService.show({
          type: 'error',
          message: JSON.stringify(err)
        });
      });
  }

  onSendFeedback() {
    this.isSending = true;
    this.dataService.sendFeedback(this.modelFeedback)
      .subscribe(() => {
        this.isSending = false;
        this.modelFeedback.email = null;
        this.modelFeedback.phone = null;
        this.modelFeedback.question = null;
        this.notifierService.show({
          type: 'success',
          message: 'Сообщение успешно отправлено'
        });
      }, err => {
        this.isSending = false;
        this.notifierService.show({
          type: 'error',
          message: JSON.stringify(err)
        });
      });
  }

  isDisabledSendFeedbackBtn() {
    return !((this.modelFeedback.email || this.modelFeedback.phone) && this.modelFeedback.question &&
      (this.modelFeedback.email ? Utils.isValidEmail(this.modelFeedback.email) : true));
  }
}
