import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SwapiService, StoreService } from '../../services';

@Component({
  selector: 'sw-person',
  templateUrl: './sw-person.html',
  styleUrls: ['./sw-person.css']
})
export class SwPerson implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private swapiService: SwapiService
  ) {}
  personId: number;
  person;

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.personId = +params['id'];
    });
    this.swapiService.getPerson(this.personId);
    this.storeService.getChanges(this.swapiService.ref)
      .subscribe(person => this.person = person['films'] ? person : null);
  }

  ngOnDestroy() {
    this.storeService.dropState(this.swapiService.ref);
  }

  goToList() {
    this.router.navigate(['/people']);
  }
}
