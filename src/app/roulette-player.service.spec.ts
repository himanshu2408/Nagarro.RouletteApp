import { TestBed, inject } from '@angular/core/testing';

import { RoulettePlayerService } from './roulette-player.service';

describe('RoulettePlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoulettePlayerService]
    });
  });

  it('should be created', inject([RoulettePlayerService], (service: RoulettePlayerService) => {
    expect(service).toBeTruthy();
  }));
});
