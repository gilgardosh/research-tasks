import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnteringFormComponent } from './entering-form/entering-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [EnteringFormComponent],
  exports: [
    CommonModule,
    MaterialModule,
    EnteringFormComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class SharedModule {}
