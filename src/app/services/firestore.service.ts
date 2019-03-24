import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Article } from '../interfaces/article';
import { SavedArticle } from '../interfaces/saved-article';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class FirestoreService {

  myArticle: Article = {
    author: '',
    content: '',
    description: '',
    publishedAt: '',
    source: '',
    title: '',
    url: '',
    urlToImage: '',
  };

  myArticles: Article[] = [];
  mostSavedArticles: SavedArticle[] = [];

  repeatArticle: SavedArticle = {
    title: '',
    url: '',
    urlToImage: '',
    savedCount: 1
  }

  articleRepeat: boolean = false;
  constructor(private afs: AngularFirestore, private auth: AuthService, private router: Router) { }

  async saveArticle(article) {
    this.myArticle = article;
    await this.afs.collection(this.auth.userName).doc(article.title).set(article);
    await this.afs.collection('globalArticles').get().subscribe(documents => {
      documents.forEach(doc => {
        if (this.myArticle.title === doc.data().title) {
          this.repeatArticle = doc.data() as SavedArticle;
          this.articleRepeat = true;
        }
      });
    });
    if (this.articleRepeat) {
      this.repeatArticle.savedCount++;
      await this.afs.collection('globalArticles').doc(this.repeatArticle.title).set(this.repeatArticle);
    } else {
      this.repeatArticle.title = article.title;
      this.repeatArticle.url = article.url;
      this.repeatArticle.urlToImage = article.urlToImage;
      await this.afs.collection('globalArticles').doc(article.title).set(this.repeatArticle);
    }
    this.articleRepeat = false;
  }

  removeArticle(article) {
    this.afs.collection(this.auth.userName).doc(article.title).delete();
    this.router.navigate(['dashboard']);
  }

  async getArticles() {
    this.myArticles = [];
    await this.afs.collection(this.auth.userName).get().subscribe(documents => {
      documents.forEach(doc => {
        this.myArticles.push(doc.data() as Article);
        });
    });
  }

  async getMostSaved() {
    this.mostSavedArticles = [];
    await this.afs.collection('globalArticles').get().subscribe(documents => {
      documents.forEach(doc => {
        this.mostSavedArticles.push(doc.data() as SavedArticle);
      });
    });
  }

}
