import { Component } from '@angular/core';

@Component({
  selector: 'not-found',
  template: `
    <div class="not-found">
      <h1>Oops.. We don't have this page..</h1>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      align-items: center;
      height: calc(100% - 60px);
      justify-content: center;
    }
    .not-found h1 {
      text-align: center;
      font-size: 4rem;
    }
  `]
})
export class NotFound {}
