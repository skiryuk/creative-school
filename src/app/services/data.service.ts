import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewModel} from '../models/review.model';
import {map} from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getReviews(): Observable<ReviewModel[]> {
    return this.http.post('http://localhost:8080/api/reviews', {})
      .pipe(map((res: any) => {
        return res.data as ReviewModel[];
      }));
  }
}
