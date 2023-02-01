import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages : Message[]=  [
    {id:"34", subject: "help", msgText:"Hello I need help", sender:"John Travolta"},
    {id:"35", subject: "name", msgText:"Hello My name is bond", sender:"James Bond"}
    ]

    onAddMessage(message:Message){
        this.messages.push(message)
    }
  

}
