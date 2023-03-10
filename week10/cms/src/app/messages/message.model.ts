export class Message{
    public id:string
    public subject:string
    public msgText:string
    public sender:string
    

    constructor(id:string, subject:string, msgText:string, sender:string){
        this.id = id;
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
    }
}