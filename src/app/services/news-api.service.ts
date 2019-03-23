import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsAPIService {
  breakingNewsUrl: string = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=923b2596bd12489c9135fcf1c98df461';

  constructor(private http: HttpClient) { }

  requestNews(): Observable<any> {
    return this.http.get(this.breakingNewsUrl);
  }
}
