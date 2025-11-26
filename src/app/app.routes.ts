import { Routes } from '@angular/router';

import { DaisyPage } from './feature/daisy-page/daisy-page';
import { SimpsonsPage } from './feature/simpsons-page/simpsons-page';
import { SimpsonDetailPage } from './feature/simpson-detail-page/simpson-detail-page';
import { EstilosPage } from './feature/estilos-page/estilos-page';

export const routes: Routes = [
    {
        path: '',
        component: DaisyPage
    },

    {
        path:'estilos',
        component: EstilosPage
    },
    {
        path: 'simpsons',
        component: SimpsonsPage
    },
    {
        path: 'simpsons/:id',
        component: SimpsonDetailPage
    }
];
