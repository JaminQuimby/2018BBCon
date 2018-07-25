import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MetricModel } from '../shared/metric-block-widget/metric-block-widget.model';
import { SkyModalInstance } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'demo-social-good-form',
  templateUrl: './social-good-form.component.html',
  styleUrls: ['./social-good-form.component.scss']
})
export class SocialGoodFormComponent implements OnInit {
  public socialGoodForm: FormGroup;
  constructor(private context: MetricModel,
    private fb: FormBuilder,
    private instance: SkyModalInstance) { }
  public ngOnInit(): void {
    this.socialGoodForm = this.fb.group({
      metric: ['', [Validators.required]],
      metricPrefix: ['', Validators.required],
      dimension: [''],
      message: [''],
      linkAddress: [''],
      linkName: ['']
    });
    this.socialGoodForm.patchValue(this.context);
  }

  public save(newValues: FormGroup) {
    this.instance.save({ ...this.context, ...newValues.value });
  }

  public close() {
    this.instance.close();
  }
}
