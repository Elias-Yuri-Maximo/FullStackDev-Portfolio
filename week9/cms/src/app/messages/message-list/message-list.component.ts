import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
    messages : Message[] =  []
    subscription : Subscription;

    constructor(private messageService: MessageService){
    }
    onAddMessage(message:Message){
      this.messages.push(message)
    }

    ngOnInit(): void {
      this.messages = this.messageService.getMessages()
      this.subscription = this.messageService.messageChangedEvent.subscribe((messages:Message[])=>{
        this.messages = messages
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
