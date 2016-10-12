import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { StoreService } from '../services';

@Injectable()
export class SwapiService {
  constructor(
    private http: Http,
    private storeService: StoreService
  ) {}

  private baseUrl = 'https://swapi.co/api/';
  ref: string = 'swapi';

  // "people": "https://swapi.co/api/people/",
  // "planets": "https://swapi.co/api/planets/",
  // "films": "https://swapi.co/api/films/",
  // "species": "https://swapi.co/api/species/",
  // "vehicles": "https://swapi.co/api/vehicles/",
  // "starships": "https://swapi.co/api/starships/"

  getRoot(wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl;
    if (wookiee) {completeUrl += '?format=wookiee'}
    return this.getCall(completeUrl);
  }

  getPeople(page: number = null, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'people/';
    if (page || wookiee){ completeUrl += '?' }
    if(page){completeUrl += 'page=' + page}
    if (page && wookiee){ completeUrl += '&' }
    if (wookiee) {completeUrl += 'format=wookiee'}
    this.getCall(completeUrl);
  }

  getPlanets(page: number = null, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'planets/';
    if (page || wookiee){ completeUrl += '?' }
    if(page){completeUrl += 'page=' + page}
    if (page && wookiee){ completeUrl += '&' }
    if (wookiee) {completeUrl += 'format=wookiee'}
    return this.getCall(completeUrl);
  }

  getFilms(page: number = null, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'films/';
    if (page || wookiee){ completeUrl += '?' }
    if(page){completeUrl += 'page=' + page}
    if (page && wookiee){ completeUrl += '&' }
    if (wookiee) {completeUrl += 'format=wookiee'}
    return this.getCall(completeUrl);
  }

  getSpecies(page: number = null, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'species/';
    if (page || wookiee){ completeUrl += '?' }
    if(page){completeUrl += 'page=' + page}
    if (page && wookiee){ completeUrl += '&' }
    if (wookiee) {completeUrl += 'format=wookiee'}
    return this.getCall(completeUrl);
  }

  getVehicles(page: number = null, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'vehicles/';
    if (page || wookiee){ completeUrl += '?' }
    if(page){completeUrl += 'page=' + page}
    if (page && wookiee){ completeUrl += '&' }
    if (wookiee) {completeUrl += 'format=wookiee'}
    return this.getCall(completeUrl);
  }

  getStarships(page: number = null, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'starships/';
    if (page || wookiee){ completeUrl += '?' }
    if(page){completeUrl += 'page=' + page}
    if (page && wookiee){ completeUrl += '&' }
    if (wookiee) {completeUrl += 'format=wookiee'}
    return this.getCall(completeUrl);
  }

  getPerson(id: number, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'people/' + id + '/';
    if (wookiee) {completeUrl += '?format=wookiee'}
    return this.getCall(completeUrl);
  }

  getPlanet(id: number, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'planets/' + id + '/';
    if (wookiee) {completeUrl += '?format=wookiee'}
    return this.getCall(completeUrl);
  }

  getFilm(id: number, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'films/' + id + '/';
    if (wookiee) {completeUrl += '?format=wookiee'}
    return this.getCall(completeUrl);
  }

  getSpecie(id: number, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'species/' + id + '/';
    if (wookiee) {completeUrl += '?format=wookiee'}
    return this.getCall(completeUrl);
  }

  getVehicle(id: number, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'vehicles/' + id + '/';
    if (wookiee) {completeUrl += '?format=wookiee'}
    return this.getCall(completeUrl);
  }

  getStarship(id: number, wookiee: boolean = false) {
    let completeUrl: string = this.baseUrl + 'starships/' + id + '/';
    if (wookiee) {completeUrl += '?format=wookiee'}
    return this.getCall(completeUrl);
  }

  getCall(url: string) {
    this.http.get(url)
      .subscribe(
        this.extractData.bind(this),
        this.handleError
      );
  }

  private extractData(res: Response) {
    let body = res.json() || {};
    return this.storeService.setState(this.ref, body);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `Server responsed with status ${error.status}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
