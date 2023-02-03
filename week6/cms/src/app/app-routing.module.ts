import { Route } from "@angular/router"
import { DocumentsComponent } from "./documents/documents.component"
import { MessageListComponent } from "./messages/message-list/message-list.component"
import { ContactsComponent } from "./contacts/contacts.component"

export const appRoutes: Route[] = [
    {
        path:"",
        redirectTo:"/documents"
    },
    {
        path:"documents",
        component: DocumentsComponent
    },
    {
        path:"messages",
        component:MessageListComponent
    },
    {
        path:"contacts",
        component:ContactsComponent
    }
]

