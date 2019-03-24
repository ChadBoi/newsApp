import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Article } from '../interfaces/article';
import { SavedArticle } from '../interfaces/saved-article';
import { AuthService } from './auth.service';

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
  repeatArticle: SavedArticle = {
    title: '',
    url: '',
    urlToImage: '',
    savedCount: 0
  }

  articleRepeat: boolean = false;
  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  async saveArticle(article) {
    this.myArticle = article;
    await this.afs.collection(this.auth.userName).doc(article.title).set(article);
    await this.afs.collection('globalArticles').get().subscribe(documents => {
      documents.forEach(doc => {
        console.log(doc.data());
        console.log(doc.data().title);
        if (this.myArticle.title === doc.data().title) {
          this.articleRepeat = true;
          this.repeatArticle = doc.data() as SavedArticle;
        }
      });
    });
    if (this.articleRepeat) {
      this.repeatArticle.savedCount++;
      this.afs.collection('globalArticles').doc(article.title).set(this.repeatArticle);
    } else {
      this.repeatArticle.title = article.title;
      this.repeatArticle.url = article.url;
      this.repeatArticle.urlToImage = article.urlToImage;
      this.afs.collection('globalArticles').doc(article.title).set(this.repeatArticle);
    }
  }
}
