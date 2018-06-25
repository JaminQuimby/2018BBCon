import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MetricModel } from '../shared/metric-block-widget/metric-block-widget.model';
import { SkyModalInstance } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'demo-donate-form',
  templateUrl: './donate-form.component.html',
  styleUrls: ['./donate-form.component.scss']
})
export class DonateFormComponent implements OnInit {
  public donateForm: FormGroup;
  constructor(private context: MetricModel,
    private fb: FormBuilder,
    private instance: SkyModalInstance) { }
  public ngOnInit(): void {
    this.donateForm = this.fb.group({
      metric: ['', [Validators.required]],
      metricPrefix: ['', Validators.required],
      dimension: [''],
      message: [''],
      linkAddress: [''],
      linkName: ['']
    });
    this.donateForm.patchValue(this.context);
  }

  public save(newValues: FormGroup) {
    this.instance.save({ ...this.context, ...newValues.value });
  }

  public close() {
    this.instance.close();
  }
}
