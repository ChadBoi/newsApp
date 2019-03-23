import { Component, OnInit } from '@angular/core';
import { NewsAPIService } from '../services/news-api.service';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newsArticles: Article[] = [];

  constructor(private newsAPI: NewsAPIService) { }

  ngOnInit() {
    this.newsAPI.requestNews().subscribe(data => {
      for (let i = 0; i < data.articles.length; i++){
        this.newsArticles[i] = data.articles[i];
      }
    });
  }
  logArticles() {
    console.log(this.newsArticles);
  }



}
