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
import { VisitFilter } from '../../models/visit-filter';
import { VisitStatusView, VisitStatus, VisitType } from '../../models/visit';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil
} from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';

type InputType = 'date' | 'time' | 'userName';

interface InputFilter {
  value: string;
  type: InputType;
}

@Component({
  selector: 'app-visits-filter',
  templateUrl: './visits-filter.component.html',
  styleUrls: [
    '../../../core/styles/shared.scss',
    '../../../core/styles/table-filter_shared.scss'
  ]
})
export class VisitsFilterComponent implements OnInit {
  @Input() anyRowHasValue: boolean;
  @Input() allRowsHaveValue: boolean;
  @Input() filter: VisitFilter;
  @Input() isDoctor: boolean;
  @Output() onSelectBtnClicked = new EventEmitter<any>();
  @Output() onFilterChanged = new EventEmitter<VisitFilter>();

  @ViewChild('dateBox') dateBox: ElementRef;
  @ViewChild('timeBox') timeBox: ElementRef;
  @ViewChild('userBox') userBox: ElementRef;

  visitStatuses: VisitStatusView[] = [
    { value: VisitStatus.ALL, viewValue: 'Wszystkie' },
    { value: VisitStatus.ACCEPTED, viewValue: 'Zaakceptowane' },
    { value: VisitStatus.RESERVED, viewValue: 'Zarezerwowane' },
    { value: VisitStatus.CANCELED, viewValue: 'Odrzucone' }
  ];
  private input$ = new Subject<InputFilter>();
  private unsub$ = new Subject<any>();

  get isCurrentTab(): boolean {
    return this.filter.type === VisitType.CURRENT;
  }

  checkboxLabel() {
    return `${this.allRowsHaveValue ? 'select' : 'deselect'} all`;
  }

  selectAll() {
    this.onSelectBtnClicked.emit();
  }

  typeText(input: InputFilter) {
    this.input$.next(input);
  }

  selectionChange(selectChange: MatSelectChange) {
    this.filter.status = selectChange.value;
    this.onFilterChanged.emit(this.filter);
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
            case 'date': {
              this.filter.date = input.value;
              break;
            }
            case 'time': {
              this.filter.time = input.value;
              break;
            }
            case 'userName': {
              this.filter.userName = input.value;
              break;
            }
          }
        })
      )
      .subscribe(() => this.onFilterChanged.emit(this.filter));
  }

  ngOnChanges() {
    this.renderer.setProperty(
      this.dateBox.nativeElement,
      'value',
      this.filter.date
    );
    this.renderer.setProperty(
      this.timeBox.nativeElement,
      'value',
      this.filter.time
    );
    this.renderer.setProperty(
      this.userBox.nativeElement,
      'value',
      this.filter.userName
    );
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
