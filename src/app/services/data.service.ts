import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ReviewModel} from '../models/review.model';
import {map} from 'rxjs/operators';
import {ImageModel} from '../models/image.model';

@Injectable()
export class DataService {

  currentImagesPage = 0;
  totalImagesPages = 0;

  constructor(private http: HttpClient) { }

  getReviews(): Observable<ReviewModel[]> {
    /*return this.http.post('http://localhost:8080/api/reviews', {})
      .pipe(map((res: any) => {
        return res.data as ReviewModel[];
      }));*/
    return of([]);
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

  createEvent(image: File): Observable<HttpEvent<{}>> {

    const fileInfo = {
      title: 'test',
      date: new Date(),
      description: 'test event create',
      abonement: true,
      price: 2000.34,
      type: 1,
      mimeType: 'image/png'
    };

    const formdata: FormData = new FormData();

    formdata.append('file', image);
    formdata.append('info', JSON.stringify(fileInfo));

    const req = new HttpRequest('POST', '/api/events/add', formdata, {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('token') }),
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
