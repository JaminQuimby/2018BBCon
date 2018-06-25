import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/core';
import { ProfileFormContext } from './profile-form.context';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'demo-profile-form',
  templateUrl: './profile-form.component.html'
})
export class ProfileFormComponent implements OnInit {
  public profileForm: FormGroup;
  constructor(
    private context: ProfileFormContext,
    private fb: FormBuilder,
    private instance: SkyModalInstance
  ) { }

  public ngOnInit(): void {
    this.profileForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(5)]],
      organization: ['', Validators.required],
      phoneNumber: [''],
      email: ['']
    });
    this.profileForm.patchValue(this.context);
  }

  public save(newValues: FormGroup) {
    this.instance.save({ ...this.context, ...newValues.value });
  }

  public close() {
    this.instance.close();
  }
}
