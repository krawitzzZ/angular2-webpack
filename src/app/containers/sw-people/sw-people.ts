import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService, StoreService } from '../../services';

import { SwPerson } from '../../models';

@Component({
  selector: 'sw-people',
  templateUrl: './sw-people.html',
  styleUrls: ['./sw-people.css']
})
export class SwPeople implements OnInit {
  constructor(
    private router: Router,
    private storeService: StoreService,
    private swapiService: SwapiService
  ) {}
  people: SwPerson[];
  next: string;
  previous: string;

  ngOnInit() {
    if (this.storeService.isEmpty(this.swapiService.ref)) {
      this.swapiService.getPeople();
    }
    this.storeService.getChanges(this.swapiService.ref)
      .subscribe(state => {
        this.people = state['results'] || [];
        this.next = state['next'] || '';
        this.previous = state['previous'] || '';
      });
  }

  goToPerson(person) {
    this.router.navigate(['/people', this.getPersonId(person.url)]);
  }

  goToNextPage() {
    this.swapiService.getCall(this.next);
  }

  goToPreviousPage() {
    this.swapiService.getCall(this.previous);
  }

  private getPersonId(fullUrl: string): number {
    const splittedArr = fullUrl.split('/');
    return +splittedArr[splittedArr.length - 2];
  }
}
