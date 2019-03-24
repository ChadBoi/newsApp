import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { SavedArticle } from '../interfaces/saved-article';
import { Article } from '../interfaces/article';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-saved-articles',
  templateUrl: './saved-articles.component.html',
  styleUrls: ['./saved-articles.component.css']
})
export class SavedArticlesComponent implements OnInit {
  myArticles: Article[] = [];
  mostSavedArticles: SavedArticle[] = [];
  constructor(private auth: AuthService, private myFirestore: FirestoreService) { }

  async ngOnInit() {
    await this.myFirestore.getArticles();
    this.myArticles = this.myFirestore.myArticles;
    await this.myFirestore.getMostSaved();
    this.mostSavedArticles = this.myFirestore.mostSavedArticles;
  }

}
