import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages : Message[]=  [
    // {id:"34", subject: "help", msgText:"Hello I need help", sender:"John Travolta"},
    // {id:"35", subject: "name", msgText:"Hello My name is bond", sender:"James Bond"}
    ]

    constructor(private messageService: MessageService){
    }
    onAddMessage(message:Message){
        this.messages.push(message)
    }
  ngOnInit(): void {
    this.messages = this.messageService.getMessages()
    this.messageService.messageChangedEvent.subscribe((messages:Message[])=>{
      this.messages =messages
    })
  }

}
