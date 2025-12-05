import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
const firebaseConfig = {
  apiKey: "AIzaSyDeBqpy-f2fHyRi8S5LeWOmWWZrvOa6ZzM",
  authDomain: "angular-icc-ppw-ea288.firebaseapp.com",
  projectId: "angular-icc-ppw-ea288",
  storageBucket: "angular-icc-ppw-ea288.firebasestorage.app",
  messagingSenderId: "5834665476",
  appId: "1:5834665476:web:78f470709961c868b80f51",
  measurementId: "G-EGN90Y78PJ"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // habilita HttpClient usando la API Fetch
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  
};

