import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * Animates a numeric counter from 0 -> target when the host enters the viewport.
 *
 * Usage: <span appCountUp [countTo]="24892" [countSuffix]="' AWBs'" [countDuration]="1400"></span>
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input() countTo = 0;
  @Input() countDuration = 1600;
  @Input() countPrefix = '';
  @Input() countSuffix = '';
  @Input() countDecimals = 0;

  private observer?: IntersectionObserver;
  private frame?: number;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.el.nativeElement.textContent = this.format(0);

    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.textContent = this.format(this.countTo);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.animate();
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const progress = Math.min((now - start) / this.countDuration, 1);
      const value = this.countTo * ease(progress);
      this.el.nativeElement.textContent = this.format(value);
      if (progress < 1) {
        this.frame = requestAnimationFrame(step);
      } else {
        this.el.nativeElement.textContent = this.format(this.countTo);
      }
    };

    this.frame = requestAnimationFrame(step);
  }

  private format(value: number): string {
    const fixed = value.toFixed(this.countDecimals);
    const [intPart, decPart] = fixed.split('.');
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${this.countPrefix}${withCommas}${decPart ? '.' + decPart : ''}${this.countSuffix}`;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame) cancelAnimationFrame(this.frame);
  }
}
