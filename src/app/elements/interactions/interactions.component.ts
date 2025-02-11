import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChatBubbleBottomCenterText, heroUserPlus } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-interactions',
  imports: [ CommonModule, NgIcon ],
  templateUrl: './interactions.component.html',
  styleUrl: './interactions.component.css',
  viewProviders: [ provideIcons( { heroUserPlus, heroChatBubbleBottomCenterText } ) ],
})
export class InteractionsComponent {
  username = "";

  constructor( readonly route: ActivatedRoute) {

  }

  ngOnInit() {
    let username = this.route.snapshot.paramMap.get( 'username' );
    this.username = username ?? "";
  }
}
