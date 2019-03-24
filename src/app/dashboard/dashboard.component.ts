import { Component, OnInit } from '@angular/core';
import { NewsAPIService } from '../services/news-api.service';
import { Article } from '../interfaces/article';
import { FirestoreService } from '../services/firestore.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categoryArray: string[] = ['business',
    'general',
    'health',
    'entertainment',
    'science',
    'sports',
    'technology'];
  newsArticles: Article[] = [];
  selectedCategory = new FormControl();
  constructor(private newsAPI: NewsAPIService, private myFirestore: FirestoreService) { }

  ngOnInit() {
    this.newsAPI.requestNews().subscribe(data => {
      for (let i = 0; i < data.articles.length; i++){
        this.newsArticles[i] = data.articles[i];
      }
    });
  }

  newNews() {
    this.newsAPI.updateNews(this.selectedCategory).subscribe(data => {
      for (let i = 0; i < data.articles.length; i++){
        this.newsArticles[i] = data.articles[i];
      }
    });
  }

  printCategory() {
    console.log(this.selectedCategory);
  }

}
