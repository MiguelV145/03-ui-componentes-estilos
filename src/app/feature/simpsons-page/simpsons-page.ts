import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { SimpsonsService } from '../Simpsons/Service/SimpsonsService';
import { PaginationService } from '../Simpsons/Service/PaginationService';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-simpsons-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './simpsons-page.html',
  styleUrl: './simpsons-page.css',
})
export class SimpsonsPage {
 
}


export class SimpsonsPageComponent {
  private simpsonsService = inject(SimpsonsService);
  paginationService = inject(PaginationService);

  simpsonsResource = toSignal(
    this.simpsonsService.getCharacters(this.paginationService.currentPage()).pipe(
      map(res => res)
    ),
    { initialValue: null }
  );
}