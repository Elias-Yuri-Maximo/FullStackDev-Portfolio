import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {


  currentSender:string = "3"
  @ViewChild('message') messageInput :ElementRef
  @ViewChild('subject') subjectInput :ElementRef

  //@Output() sendMessageEvent = new EventEmitter<Message>()
  onSendMessage(){
    let msg =  new Message("3", this.subjectInput.nativeElement.value, this.messageInput.nativeElement.value, this.currentSender)
    this.messageService.addMessage(msg)
    // console.log(msg)
    // this.sendMessageEvent.emit(msg)

    this.onClear()
  }
  onClear(){
    this.subjectInput.nativeElement.value =''
    this.messageInput.nativeElement.value =''

  }
  constructor(private messageService: MessageService){
    
  }
}
