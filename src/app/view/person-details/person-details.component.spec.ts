import { DebugElement, Directive, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person, PersonService } from 'src/app/service/person.service';
import { TextFieldComponent } from '../text-field/text-field.component';

import { PersonDetailsComponent } from './person-details.component';

const testPerson: Person = {
  id: 5,
  firstName: 'Foo',
  lastName: 'Bar',
  email: 'foo@bar.de',
};

@Directive({
  selector: 'app-text-field'
})
class MockTextField {
  @Input() editMode!: boolean;
  @Input() caption!: string;

  @Output() valueChange:EventEmitter<any> = new EventEmitter();
  @Input() value: any;
}

class MockPersonService {
  async updatePerson(person: Person): Promise<void> {
    return Promise.resolve();
  }

  async deletePerson(id: number): Promise<void> {
    return Promise.resolve();
  }
}

describe('PersonDetailsComponent', () => {
  let component: PersonDetailsComponent;
  let fixture: ComponentFixture<PersonDetailsComponent>;
  // let mockTextFields: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDetailsComponent, MockTextField ],
      providers: [{ provide: PersonService, useClass: MockPersonService }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailsComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    // mockTextFields[0].injector.get(MockTextField) as MockTextField;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with view mode', () => {
    // TODO: what elements are there anyways?

    const mockTextFields = fixture.debugElement.queryAll(By.directive(MockTextField));
    expect(mockTextFields.length).toBe(0);

    expect(fixture.nativeElement.querySelector('.btn-edit')).toBeNull();
    expect(fixture.nativeElement.querySelector('.btn-delete')).toBeNull();
    
    expect(component.editForm).toBeFalsy();
  });

  it('should display person details when showPerson(...) is called', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.directive(TextFieldComponent))).toBeTruthy();
    
    const mockTextFields = fixture.debugElement.queryAll(By.directive(MockTextField));
    const textFieldValues = mockTextFields.map(tf => tf.injector.get(MockTextField).value)
    expect(textFieldValues).toContain(5);
    expect(textFieldValues).toContain('Foo');
    expect(textFieldValues).toContain('Bar');
    expect(textFieldValues).toContain('foo@bar.de');
  })

  it('should show edit / delete buttons when showPerson(...) is called', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.directive(TextFieldComponent))).toBeTruthy();
    
    expect(fixture.nativeElement.querySelector('.btn-edit')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.btn-delete')).toBeTruthy();
  });

  it('should initialize form object when edit button is clicked', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    
    fixture.nativeElement.querySelector('.btn-edit').click();
    fixture.detectChanges();
    
    expect(component.editForm).toBeTruthy();
  });

  it('should show submit & delete buttons in edit mode', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    
    fixture.nativeElement.querySelector('.btn-edit').click();
    fixture.detectChanges();
    
    expect(fixture.nativeElement.querySelector('.btn-edit')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.btn-delete')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.btn-submit')).toBeTruthy();
  });

  it('should set some text fields into edit mode', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    
    fixture.nativeElement.querySelector('.btn-edit').click();
    fixture.detectChanges();
    
    const mockTextFields = fixture.debugElement.queryAll(By.directive(MockTextField));
    mockTextFields.forEach(tf => expect(tf.injector.get(MockTextField).editMode).toBeTrue());
  });

  it('should call updatePerson(...) service method when submit button is clicked', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    
    fixture.nativeElement.querySelector('.btn-edit').click();
    fixture.detectChanges();

    const mockService = fixture.debugElement.injector.get(PersonService);
    spyOn(mockService, 'updatePerson');
    expect(mockService.updatePerson).toHaveBeenCalledTimes(0);

    fixture.nativeElement.querySelector('.btn-submit').click();
    fixture.detectChanges();

    expect(mockService.updatePerson).toHaveBeenCalledTimes(1);
  });

  it('should turn off edit mode in all text fields when submit button is clicked', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    
    fixture.nativeElement.querySelector('.btn-edit').click();
    fixture.detectChanges();
    
    fixture.nativeElement.querySelector('.btn-submit').click();
    fixture.detectChanges();

    const mockTextFields = fixture.debugElement.queryAll(By.directive(MockTextField));
    mockTextFields.forEach(tf => expect(tf.injector.get(MockTextField).editMode).toBeFalse());
  });

  it('should show edit & delete buttons when submit button is clicked', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    
    fixture.nativeElement.querySelector('.btn-edit').click();
    fixture.detectChanges();
    
    fixture.nativeElement.querySelector('.btn-submit').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.btn-edit')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.btn-delete')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.btn-submit')).toBeFalsy();
  });
  
  it('should call deletePerson(...) service method when delete button is clicked', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    
    const mockService = fixture.debugElement.injector.get(PersonService);
    spyOn(mockService, 'deletePerson');

    fixture.nativeElement.querySelector('.btn-delete').click();

    expect(mockService.deletePerson).toHaveBeenCalledWith(5);
  });

  it('should emit deletePerson event when delete button is clicked', () => {
    component.showPerson(testPerson);
    fixture.detectChanges();
    
    spyOn(component.deletePerson, 'emit');

    fixture.nativeElement.querySelector('.btn-delete').click();

    expect(component.deletePerson.emit).toHaveBeenCalledWith(5);
  });

});
