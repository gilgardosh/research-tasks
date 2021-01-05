
import { NgModule } from '@angular/core';
import { EnteringFormComponent } from './entering-form/entering-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [EnteringFormComponent],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EnteringFormComponent,
  ],
  providers: [],
})
export class SharedModule {}
