import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import { PatientFilter } from '../../models/patient-filter';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil
} from 'rxjs/operators';

export enum InputType {
  NAME = 'name',
  EMAIL = 'email'
}

interface InputFilter {
  value: string;
  type: InputType;
}

@Component({
  selector: 'app-patients-filter',
  templateUrl: './patients-filter.component.html',
  styleUrls: [
    '../../../core/styles/shared.scss',
    '../../../core/styles/table-filter_shared.scss',
  ]
})
export class PatientsFilterComponent implements OnInit {
  @Input() filter: PatientFilter;
  @Output() onFilterChanged = new EventEmitter<PatientFilter>();

  @ViewChild('nameBox') nameBox: ElementRef;
  @ViewChild('emailBox') emailBox: ElementRef;

  private input$ = new Subject<InputFilter>();
  private unsub$ = new Subject<any>();

  typeText(input: InputFilter) {
    this.input$.next(input);
  }
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.input$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsub$),
        map((input: InputFilter) => {
          switch (input.type) {
            case InputType.NAME: {
              this.filter.name = input.value;
              break;
            }
            case InputType.EMAIL: {
              this.filter.email = input.value;
              break;
            }
          }
        })
      )
      .subscribe(() => this.onFilterChanged.emit(this.filter));
  }

  ngOnChanges() {
    this.renderer.setProperty(
      this.nameBox.nativeElement,
      'value',
      this.filter.name
    );
    this.renderer.setProperty(
      this.emailBox.nativeElement,
      'value',
      this.filter.email
    );
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
