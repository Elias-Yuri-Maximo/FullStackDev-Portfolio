import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownDirective } from '../shared/dropdown.directive';


@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //@Output()  selectedFeatureEvent=new EventEmitter<string>();

  // onSelected(selectedEvent: string){
  //   this.selectedFeatureEvent.emit(selectedEvent)
  // }

}
