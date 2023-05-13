import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./styles/footer.master.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    @Input()
    public paymentIcons!: string[];
}
