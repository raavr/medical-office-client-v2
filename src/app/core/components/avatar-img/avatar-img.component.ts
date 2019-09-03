import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-img',
  template: `
    <img
      [src]="src"
      alt="{{alt}}"
      [ngStyle] = "{
        'width.px': size,
        'min-width.px': size,
        'height.px': size,
        'min-height.px': size,
        'border-radius.px': radius
      }"
    />
  `,
  styles: [`
    :host {
      display: block;
    }

    img {
      display: block;
    }
  `]
})
export class AvatarImgComponent {
  @Input() src: string;
  @Input() alt: string;
  @Input() size: number;
  @Input() radius: number = 0;
}
