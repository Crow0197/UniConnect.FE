import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navabar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.css']
})
export class NavabarComponent {
  isLoggedIn = false; // Imposta su true se l'utente è loggato
  username = 'NomeUtente'; // Imposta il nome utente
  @Input() sidenav: any;

  constructor() { }

  ngOnInit(): void { }

  logout() {
    // Implementa la logica di logout qui
  }
}
