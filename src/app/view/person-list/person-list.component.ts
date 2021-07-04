import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Person, PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  @Output() clickPerson = new EventEmitter<Person>();

  persons: Person[] = [];

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.personService.listPerson()
      .then(persons => this.persons = persons)
      .catch(_reason => alert("Personenliste könnten nicht geladen werden."));
  }

  onPersonClicked(person: Person) {
    this.clickPerson.emit(person);
  }

  deletePerson(id: number) {
    this.persons.splice(this.persons.findIndex(p => p.id == id), 1);
  }
}
