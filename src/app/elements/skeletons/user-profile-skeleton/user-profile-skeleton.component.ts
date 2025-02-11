import { Component } from '@angular/core';
import { InputDescriptionSkeletonComponent } from "../input-description-skeleton/input-description-skeleton.component";

@Component({
  selector: 'app-user-profile-skeleton',
  imports: [InputDescriptionSkeletonComponent],
  templateUrl: './user-profile-skeleton.component.html',
  styleUrls: ['./user-profile-skeleton.component.css' ]
  //styleUrls: ['./user-profile-skeleton.component.css', '../../../pages/profile/profile.component.css' ]
})
export class UserProfileSkeletonComponent {

}
