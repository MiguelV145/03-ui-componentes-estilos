import { Component, effect, inject, resource, signal } from '@angular/core';
import { SimpsonsService } from '../Simpsons/Service/SimpsonsService';
import { PaginationService } from '../Simpsons/Service/PaginationService';
import { rxResource} from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../share/componet/pagination/PaginationComponent/PaginationComponent';
import { HeroSimpsons } from "../Simpsons/component/hero-simpsons/hero-simpsons";
import { Breadcrumbs } from "../share/componet/breadcrumbs/breadcrumbs";

@Component({
  selector: 'app-simpsons-page',
  imports: [CommonModule, RouterModule, PaginationComponent, HeroSimpsons, Breadcrumbs],
  templateUrl: './simpsons-page.html',
  styleUrl: './simpsons-page.css',
})
export class SimpsonsPage {
  private simpsonsService = inject(SimpsonsService);
  paginationService = inject(PaginationService);

  charactersPerPage=signal<number>(10);
  // Signal que mantiene el número total de páginas
  totalPages = signal(0);

  constructor() {
    // Effect que actualiza el número de páginas cuando hay datos válidos
    effect(() => {
      if (this.simpsonsResource.hasValue()) {
        this.totalPages.set(this.simpsonsResource.value().pages);
      }
    });
  }

  // simpsonsResource = toSignal(
  //   this.simpsonsService.getCharacters(this.paginationService.currentPage()).pipe(
  //     map(res => res)
  //   ),
  //   { initialValue: null }
  // );

//   /// VERISION REACTIVA con recursos
//  simpsonsResource = resource({
//     params: () => ({
//       page: this.paginationService.currentPage() - 1,
//       limit: this.charactersPerPage(),
//     }),
//     loader: async ({ params }) => {
//       return this.simpsonsService.getCharactersOptions({
//         offset: params.page,
//         limit: params.limit,
//       });
//     },
//   });

  /// VERSIUON CON RXRESOURCE
  simpsonsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.charactersPerPage(),
    }),
    stream: ({params}) => {
      return this.simpsonsService.getCharactersOptions({
        offset: params.page,
        limit: params.limit,
      });
    },
  });
}

