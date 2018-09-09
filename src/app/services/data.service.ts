import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ReviewModel} from '../models/review.model';
import {map} from 'rxjs/operators';
import {ImageModel} from '../models/image.model';
import {EventInfoModel} from '../models/event.model';

@Injectable()
export class DataService {

  currentImagesPage = 0;
  totalImagesPages = 0;

  currentEventsPage = 0;
  totalEventsPage = 0;

  currentReviewsPage = 0;
  totalReviewsPage = 0;

  constructor(private http: HttpClient) { }

  getReviews(): Observable<ReviewModel[]> {
    return this.http.get(`/api/reviews/get/${++this.currentReviewsPage}`)
      .pipe(map((res: { data: ReviewModel[], count: number, pages: number}) => {
        this.totalReviewsPage = res.pages;
        return res.data as ReviewModel[];
      }));
  }

  getImages(): Observable<ImageModel[]> {
    return this.http.get(`/api/images/get/${++this.currentImagesPage}`)
      .pipe(map((res: { data: ImageModel[], count: number, pages: number}) => {
        this.totalImagesPages = res.pages;
        return res.data as ImageModel[];
      }));
  }

  uploadImage(image: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', image);

    const req = new HttpRequest('POST', '/api/images/upload', formdata, {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('token') }),
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  addEvent(eventInfo: EventInfoModel, image: File): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('file', image);
    formdata.append('info', JSON.stringify(eventInfo));

    const req = new HttpRequest('POST', '/api/events/add', formdata, {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('token') }),
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getEvents(categoryId: number): Observable<EventInfoModel[]> {
    return this.http.get(`/api/events/get/${categoryId}/${++this.currentEventsPage}`)
      .pipe(map((res: { data: EventInfoModel[], count: number, pages: number}) => {
        this.totalEventsPage = res.pages;
        res.data.forEach(d => {
          if (d.date) {
            d.date = new Date(d.date);
          }
        });
        return res.data as EventInfoModel[];
      }));
  }

  addReview(text: string): Observable<any> {
    return this.http.post(`/api/reviews/add`, { text: text }, {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem('token') })
      })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  resetEventsPageState() {
    this.currentEventsPage = 0;
    this.totalEventsPage = 0;
  }
}
