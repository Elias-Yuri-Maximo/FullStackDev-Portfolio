export class Book{
    public _id: string;
    public id: string;
    public title:string;
    public author:string;
    public yearPublished:string;
    public description: string;
    public imagePath:string;

    constructor(_id: string, id: string, title:string, author:string, yearPublished:string, description:string, imagePath:string ){
        this._id = _id;
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.yearPublished = yearPublished;
        this.imagePath = imagePath;
    }
}