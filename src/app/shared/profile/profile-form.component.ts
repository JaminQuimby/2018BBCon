import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/core';
import { ProfileFormContext } from './profile-form.context';
import { Profile } from './profile.service';
import { ProfileModel } from './profile-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'demo-profile-form',
  templateUrl: './profile-form.component.html'
})
export class ProfileFormComponent implements OnInit {
  // @Profile()
  private profile: ProfileModel;
  public profileForm: FormGroup;
  constructor(
    private context: ProfileFormContext,
    public fb: FormBuilder,
    public instance: SkyModalInstance
  ) { }

  public ngOnInit(): void {
    this.profileForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(5)]],
      organization: ['', Validators.required],
      phone: [''],
      email: ['']
    });
    this.profileForm.patchValue({ ...this.context, ... this.profile });
    console.log('set profile', this.profile);
  }

  public get profileContext() {
    return this.context;
  }

  public save() {
    this.instance.save(this.context);
  }
  public close() {
    this.instance.close();
  }
}
