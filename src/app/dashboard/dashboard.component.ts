import { Component } from '@angular/core';
import { SkyTileDashboardConfig } from '@blackbaud/skyux/dist/core';
import { SkyAppAssetsService } from '@blackbaud/skyux-builder/runtime/assets.service';

@Component({
  selector: 'uapi-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  public dashboardConfig: SkyTileDashboardConfig;

  constructor(
    private readonly assetsService: SkyAppAssetsService) {
  }
}
