import { Component, OnInit } from '@angular/core';
import { NewsAPIService } from '../services/news-api.service';
import { Article } from '../interfaces/article';
import { FirestoreService } from '../services/firestore.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.css']
})
export class SearchArticlesComponent implements OnInit {

  constructor(private newsAPI: NewsAPIService, private myFirestore: FirestoreService) { }
  newsArticles: Article[] = [];
  search = new FormControl();
  selectedCategory = new FormControl();

  ngOnInit() {
    this.newsAPI.requestNews().subscribe(data => {
      for (let i = 0; i < data.articles.length; i++){
        this.newsArticles[i] = data.articles[i];
      }
    });
  }

  searchNews() {
    this.newsAPI.searchNews(this.search).subscribe(data => {
      for (let i = 0; i < data.articles.length; i++){
        this.newsArticles[i] = data.articles[i];
      }
    });
  }

}
