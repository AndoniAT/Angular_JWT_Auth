import { Component } from '@angular/core';
import { PostsSkeletonsComponent } from "../skeletons/posts-skeletons/posts-skeletons.component";

@Component({
  selector: 'app-posts',
  imports: [PostsSkeletonsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {

}
