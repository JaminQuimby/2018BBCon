import { ProfileModel } from './profile-model';

export class ProfileFormContext extends ProfileModel {
  public organization?: string;
  public phoneNumber?: string;
}
