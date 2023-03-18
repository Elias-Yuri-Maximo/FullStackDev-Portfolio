import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[]  = []
  maxMessageId: number
  messageChangedEvent:EventEmitter<Message[]>= new EventEmitter<Message[]>()

  constructor(private http: HttpClient) {
    this.fetchMessages();
  }
   
   getMaxId(): number {
    let maxId = 0;
    for (let contact of this.messages) {
      let currentId =+ contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(){
    return this.messages
  } 

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, data_message: Message }>(
      'http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new Message to Messages
          console.log(responseData)
          this.messages.push(responseData.data_message);
          this.sortAndSend();
        }
      );
  }

  sortAndSend(){
    this.messages.sort((a,b)=>{
      if (a.subject < b.subject) {
        return -1;
      }
      if (a.subject > b.subject) {
        return 1;
      }
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice())
  }

  getMessage(id: string){
    for (let message of this.messages){
      if (message.id === id){
      return message
      }
    }
    return null
  }

  fetchMessages(){
    this.http.get<any>('http://localhost:3000/messages').subscribe(
      (data: any) => {
        this.messages = data.message
        this.maxMessageId = this.getMaxId()
        this.messages.sort((a, b) => (a.id > b.id) ? 1 : -1)
        this.messageChangedEvent.emit(this.messages)
      },
      (error: any) => {
        console.log(error)
      }
    )
    this.messageChangedEvent.emit(this.messages)
  }

  storeMessages(){
    let messages = JSON.stringify(this.messages)
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    this.http.put('http://localhost:3000/messages', messages, {headers: headers}).subscribe(
      () => {
        this.messageChangedEvent.emit(this.messages)
      }
    )
  }
}
