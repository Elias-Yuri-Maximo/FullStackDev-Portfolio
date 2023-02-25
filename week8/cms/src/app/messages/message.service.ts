import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] 
  messageChangedEvent:EventEmitter<Message[]>= new EventEmitter<Message[]>()

  constructor() {
    this.messages = MOCKMESSAGES
   }

  getMessages(){
    return this.messages
  } 

  addMessage(message:Message){
    this.messages.push(message)
    this.messageChangedEvent.emit(this.messages)
  }

  getMessage(id: string){
    for (let message of this.messages){
      if (message.id === id){
      return message
      }
    }
    return null
  }
}
