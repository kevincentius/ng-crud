import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person, PersonService } from 'src/app/service/person.service';

import { PersonListComponent } from './person-list.component';

class MockPersonService {
  async listPerson(): Promise<Person[]> {
    return [
      { id: 1,  firstName: 'John',    lastName: 'Doe',    email: 'Johntor@email.de' },
      { id: 2,  firstName: 'Jin',     lastName: 'Jun',    email: 'Jinjun@email.de' },
    ]
  }
}

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonListComponent ],
      providers: [{ provide: PersonService, useClass: MockPersonService }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
  });

  // problem with this test case: service method is called on ngOnInit - before we had a chance to spyOn.
  it('should show persons returned by listPersons(...) service method when created', async () => {
    const mockService = fixture.debugElement.injector.get(PersonService);
    spyOn(mockService, 'listPerson').and.callThrough();

    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(mockService.listPerson).toHaveBeenCalledTimes(1);
      expect(fixture.nativeElement.querySelector('.list-item')).toBeTruthy();
    });
    fixture.detectChanges();
  });
  
  it('should emit (clickPerson) when a person item is clicked', async () => {
    spyOn(component.clickPerson, 'emit');

    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.nativeElement.querySelector('.list-item').click();

      expect(component.clickPerson.emit).toHaveBeenCalledTimes(1);
    });
    fixture.detectChanges();
  });
  
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should remove the respective person from the list when deletePerson(...) function is called', async () => {
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      component.deletePerson(2);
      fixture.detectChanges();
      const elements = fixture.nativeElement.querySelectorAll('.list-item');

      // initially 2 persons, after delete there is only 1 remaining test person
      expect(component.persons.length).toBe(1);
      expect(elements.length).toBe(1);
      expect(elements[0].textContent).toContain('John');
      expect(elements[0].textContent).toContain('Doe');
    });
  });
});
