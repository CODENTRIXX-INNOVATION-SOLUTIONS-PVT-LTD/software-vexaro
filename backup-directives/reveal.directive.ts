import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * Adds `is-visible` to the host element once it scrolls into view.
 * Pair with the `[data-reveal]` base styles in global_styles.css.
 *
 * Usage: <div appReveal [revealDelay]="2">...</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: {
    '[attr.data-reveal]': "''",
    '[attr.data-reveal-delay]': 'revealDelay ?? null'
  }
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay?: number;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
