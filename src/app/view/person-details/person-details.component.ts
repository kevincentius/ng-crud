import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person, PersonService } from 'src/app/service/person.service';

interface EditPersonForm {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  person: Person | null = null;
  @Output() deletePerson = new EventEmitter<number>();

  editMode = false;
  editForm!: EditPersonForm | null;

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit(): void {
  }

  showPerson(person: Person | null) {
    this.person = person;
    
    this.editForm = this.person == null ? null : {
      firstName: this.person.firstName,
      lastName: this.person.lastName,
      email: this.person.email,
    };
  }

  onEdit() {
    this.editMode = true;
  }

  onSubmit() {
    if (this.person != null && this.editForm != null) {
      this.person.firstName = this.editForm.firstName;
      this.person.lastName = this.editForm.lastName;
      this.person.email = this.editForm.email;

      this.personService.updatePerson(this.person);
      this.editMode = false;
    } else {
      throw new Error('Invalid state');
    }
  }

  onDelete() {
    if (this.person != null) {
      this.personService.deletePerson(this.person.id);
      this.deletePerson.emit(this.person.id);
      this.person = null;
    } else {
      throw new Error('Invalid state');
    }
  }
}
