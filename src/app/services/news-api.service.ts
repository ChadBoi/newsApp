import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsAPIService {
  breakingNewsUrl: string = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=923b2596bd12489c9135fcf1c98df461';

  topNewsUrl: string = 'https://newsapi.org/v2/top-headlines?country=us&';
  allNewsUrl: string = 'https://newsapi.org/v2/everything?';
  APIKey: string = 'apiKey=923b2596bd12489c9135fcf1c98df461';
  constructor(private http: HttpClient) { }

  requestNews(): Observable<any> {
    return this.http.get(this.breakingNewsUrl);
  }

  updateNews(category): Observable<any> {
    let newNewsUrl = this.topNewsUrl + 'category=' + category + '&' + this.APIKey;
    return this.http.get(newNewsUrl);
  }

  searchNews(search): Observable<any> {
    let newNewsUrl = this.allNewsUrl + 'q=' + search + '&' + this.APIKey;
    return this.http.get(newNewsUrl);
  }

}
