import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('client');
  protected members = signal<any>([]);

  // constructor(private http: HttpClient){}
 async ngOnInit() {
    // this.http.get("http://localhost:5268/api/members").subscribe({
    //   next: response => {
    //     this.members.set(response);
    //     console.log(response);
    //   },
    //   error: error => console.log(error),
    //   complete: ()=> console.log("completed the http request")
    // });
    this.members.set(await this.getMembers());
  }

  async getMembers(){
    try {
     return lastValueFrom(this.http.get("http://localhost:5268/api/members"));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
