import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrecogComponent } from './precog/precog.component';
import { MachineLearningPageComponent } from './machine-learning-page/machine-learning-page.component';
import { BacktestService } from '../shared';
import { MatSnackBarModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatProgressSpinnerModule, MatInputModule, MatExpansionModule } from '@angular/material';
import { ChartModule } from 'angular-highcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TimelineViewComponent } from './timeline-view/timeline-view.component';
import { AskModelComponent } from './ask-model/ask-model.component';
import { ButtonModule } from 'primeng/button';

const routes: Routes =
  [
    {
      path: 'machine-learning', component: MachineLearningPageComponent
    }
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSnackBarModule,
    ChartModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    ButtonModule
  ],
  declarations: [
    TimelineViewComponent,
    PrecogComponent,
    MachineLearningPageComponent,
    AskModelComponent
  ],
  exports: [
    MachineLearningPageComponent
  ],
  providers: [
    BacktestService
  ],
})
export class MachineLearningModule { }
