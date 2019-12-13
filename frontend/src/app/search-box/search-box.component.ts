import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @Output() listUsuarios = new EventEmitter<Observable<Object>>();

  usuarios$: Observable<Object>;
  private searchTerms = new Subject<string>();

  constructor(private UsuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarios$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.UsuarioService.searchUsuarios(term))
    );
  }

  // Push a search term into the observable stream.
  search(term: string){
    this.searchTerms.next(term);
    this.upUsuarios();
  }

  upUsuarios() {
    this.listUsuarios.emit(this.usuarios$);
  }

}
