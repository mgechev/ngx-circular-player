import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';

const RADIUS = 50;

@Component({
  // tslint:disable component-selector
  selector: 'ngx-circular-player',
  templateUrl: './ngx-circular-player.component.html',
  styleUrls: ['./ngx-circular-player.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxCircularPlayerComponent implements AfterViewInit {
  @Input() radius = 120;
  @Input() stroke = 20;
  @Input() innerStroke = 2;
  @Input() source: string;
  @Input() strokeColor = '#fff';
  @Input() progressStrokeColor = '#858585';
  @Input() innerStrokeColor = '#eee';

  @ViewChild('audio') audio: ElementRef;
  @ViewChild('progress') progress: ElementRef;

  playing = false;

  toggle() {
    this.playing = !this.playing;
    if (this.playing) {
      this.audio.nativeElement.play();
    } else {
      this.audio.nativeElement.pause();
    }
  }

  get arrowStyle() {
    const topWidth = this.radius / 8;
    const bottomWidth = this.radius / 8;
    const leftWidth = this.radius / 5;
    return {
      'border-top-width': `${topWidth}px`,
      'border-bottom-width': `${bottomWidth}px`,
      'border-left-width': `${leftWidth}px`
    };
  }

  ngAfterViewInit() {
    const progress = this.progress.nativeElement;
    const totalLength = progress.getTotalLength();
    const audio = this.audio.nativeElement as HTMLAudioElement;
    progress.setAttribute('stroke-dasharray', totalLength);
    progress.setAttribute('stroke-dashoffset', totalLength);
    audio.addEventListener('pause', () => (this.playing = false));
    audio.addEventListener('play', () => (this.playing = true));
    audio.addEventListener('timeupdate', () => {
      const currentTime = audio.currentTime;
      const maxduration = audio.duration;
      const calc = totalLength - (currentTime / maxduration) * totalLength;

      progress.setAttribute('stroke-dashoffset', calc);
    });
  }

  seek(evnt: MouseEvent) {
    const ratio = this._calculateAngle(evnt) / 360;
    const audio = this.audio.nativeElement as HTMLAudioElement;
    const seekTo = ratio * audio.duration;
    audio.currentTime = seekTo;
  }

  get drawn() {
    return ``;
  }

  get centerX() {
    return 50;
  }

  get centerY() {
    return 50;
  }

  get circleRadius() {
    return 32;
  }

  get pauseLeftBarSize() {
    return {
      width: `${this.radius / 10}px`,
      height: `${this.radius / 3.5}px`,
      left: `calc(50% - ${this.radius / 12}px)`
    };
  }

  get pauseRightBarSize() {
    return {
      width: `${this.radius / 10}px`,
      height: `${this.radius / 3.5}px`,
      left: `calc(50% + ${this.radius / 12}px)`
    };
  }

  get playButtonRadius() {
    return this.radius - this.radius / 3 + 'px';
  }

  private _calculateAngle(evnt: MouseEvent) {
    const x = (RADIUS * 2) / (this.radius / evnt.offsetX);
    const y = (RADIUS * 2) / (this.radius / evnt.offsetY);
    const slope = (RADIUS - y) / (RADIUS - x);
    const angle = 180 * (Math.abs(Math.atan(slope)) / Math.PI);

    if (x <= RADIUS && y >= RADIUS) {
      return angle;
    }
    if (x > RADIUS && y >= RADIUS) {
      return 180 - angle;
    }
    if (x > RADIUS && y <= RADIUS) {
      return 180 + angle;
    }
    return 180 + (180 - angle);
  }
}
