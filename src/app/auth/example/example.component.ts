import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  // Example local observables
  private counterSubject = new BehaviorSubject<number>(0);
  public counter$: Observable<number> = this.counterSubject.asObservable();

  private nameSubject = new BehaviorSubject<string>('Rivan');
  public name$: Observable<string> = this.nameSubject.asObservable();

  constructor() {
    this.counter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => console.log(`Counter: ${count}`));

    this.name$
      .pipe(takeUntil(this.destroy$))
      .subscribe(name => console.log(`Name: ${name}`));

    // Simulating changes
    setInterval(() => {
      this.counterSubject.next(this.counterSubject.value + 1);
    }, 1000);

    setTimeout(() => {
      this.nameSubject.next('Riyan');
    }, 5000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
