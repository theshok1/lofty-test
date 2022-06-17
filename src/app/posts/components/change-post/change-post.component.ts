import { Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-post',
  templateUrl: './change-post.component.html',
  styleUrls: ['./change-post.component.scss']
})
export class ChangePostComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder) { }

  form = this._fb.group({
    title: [, Validators.required],
    body: [, Validators.required]
  })

  get title() {
    return this.form.get('title')
  }

  get body() {
    return this.form.get('body')
  }

  ngOnInit(): void {
    this.title?.setValue(this.data.title)
    this.body?.setValue(this.data.body)
  }

}
