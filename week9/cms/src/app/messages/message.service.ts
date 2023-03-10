import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[]  = []
  maxMessageId: number
  //messageChangedEvent:EventEmitter<Message[]>= new EventEmitter<Message[]>()
  messageChangedEvent = new Subject<Message[]>();

  constructor(private httpClient: HttpClient) {
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

  addMessage(message:Message){
    this.messages.push(message)
    message.id = this.maxMessageId.toString();
    //this.messageChangedEvent.emit(this.messages)
    this.storeMessages();
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
    this.httpClient.get<Message[]>('https://fullstackproject-87550-default-rtdb.firebaseio.com//messages.json')
    .subscribe({
      next: (messages: Message[]) => {
        this.messages = messages
        console.log(this.messages)
        this.maxMessageId = this.getMaxId()
        this.messages.sort((a, b) => (a.id > b.id) ? 1 : -1)
        this.messageChangedEvent.next(this.messages.slice())
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
        console.log("completed")
      }

    }
    )
    //this.messageChangedEvent.emit(this.messages)
  }

  storeMessages(){
    let messages = JSON.stringify(this.messages)
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    this.httpClient.put('https://fullstackproject-87550-default-rtdb.firebaseio.com/messages.json', messages, {headers: headers}).subscribe(
      () => {
        this.messageChangedEvent.next(this.messages)
      }
    )
  }
}
