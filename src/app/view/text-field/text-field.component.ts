import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {

  @Input() editMode!: boolean;
  @Input() caption!: string;

  @Output() valueChange:EventEmitter<any> = new EventEmitter();
  @Input() value: any;

  constructor() { }

  ngOnInit(): void {
  }

}
