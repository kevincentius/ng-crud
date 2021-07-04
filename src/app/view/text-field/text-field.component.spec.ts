import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextFieldComponent],
      imports: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    component.editMode = false;
    component.caption = 'First name';
    component.value = 'Max'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display caption', () => {
    expect(fixture.nativeElement.querySelector('.caption').textContent).toBe('First name');
  });

  it('should show value when editMode is false', () => {
    expect(fixture.nativeElement.querySelector('.value-input')).toBeNull();
    expect(fixture.nativeElement.querySelector('.value').textContent).toContain('Max');
  });

  it('should show input element when editMode is true', () => {
    component.editMode = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      /* 
       * TODO: the following expect fail because the value is always empty?
       * expect(fixture.nativeElement.querySelector('.value-input').value).toContain('Joko');
       */

      expect(fixture.nativeElement.querySelector('.value-input')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.value')).toBeNull();
    })
  });
});
