import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./styles/hero.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
