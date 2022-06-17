import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  form = this._fb.group({
    title: [, Validators.required],
    body: [, Validators.required]
  })

  ngOnInit(): void {
  }

}
