import { Component} from '@angular/core';
import { UserModel } from '../user/user.model';
import { Profile } from './profile.service';

@Component({
  selector: 'demo-profile',
  templateUrl: './profile-form.component.html',
  styleUrls: ['profile-form.component.scss']
})

export class ProfileFormComponent {
  @Profile()
  public model: UserModel;

}
