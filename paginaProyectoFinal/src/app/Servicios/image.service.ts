import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:8081/api/v1/images';

  constructor(private http: HttpClient) { }

  uploadImage(image: File, title: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    formData.append('title', title);

    return this.http.post(this.apiUrl, formData);
  }

  getImages(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
