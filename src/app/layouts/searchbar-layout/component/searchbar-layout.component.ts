import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { exhaustMap, Observable, Subject, switchMap } from 'rxjs';
import { SearchInterface } from '../interfaces/search';
import { searchQuery } from '../states/search.actions';
import { SearchState } from '../states/search.reducer';
import { selectIsLoading, selectSearch } from '../states/search.selector';

@Component({
  selector: 'app-searchbar-layout',
  templateUrl: './searchbar-layout.component.html',
  styleUrls: ['./searchbar-layout.component.scss']
})
export class SearchbarLayoutComponent {
  result: string = '';
  showResults: boolean = false;
  results$: Observable<SearchInterface[]>;
  isLoading$: Observable<boolean>;
  private searchText$ = new Subject<string>();
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @Output() selected: EventEmitter<SearchInterface | null> = new EventEmitter<SearchInterface | null>();

  constructor(private store: Store<SearchState>, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.results$ = this.store.pipe(select(selectSearch));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
  }

  search(name: string): void {
    this.showResults = name.length >= 3;
    this.searchText$.next(name);
    this.store.dispatch(searchQuery({ query: name }));

    this.results$.subscribe(results => {
      console.log(results);
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  onSelect(result: SearchInterface): void {
    this.result = `${result.name}`;
    this.showResults = false;
    this.selected.emit(result);
  }

  onClear(): void {
    this.result = '';
    this.showResults = false;
    this.selected.emit(null);
  }

  getConnectedOverlayPanelClasses(): string[] {
    if (this.mobileQuery.matches) {
      return ['fixed', '!bottom-0', '!left-0', '!right-0'];
    }

    return [];
  }

  getOverlayWidth(): number | string {
    if (this.mobileQuery.matches) {
      return '100%';
    }

    return 360;
  }

  getOverlayOffset(): number {
    if (this.mobileQuery.matches) {
      return 0;
    }

    return 10;
  }
}
