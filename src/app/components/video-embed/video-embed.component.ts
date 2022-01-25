import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss'],
})
export class VideoEmbedComponent implements OnInit {
  @Input() site: string = 'YouTube';
  @Input() key: string = '';
  videoURL: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.site === 'YouTube') {
      this.videoURL = this.getSafeURL('https://www.youtube.com/embed/' + this.key + '?controls=0');
    } else {
      this.videoURL = this.getSafeURL(
        'https://player.vimeo.com/video/' + this.key + '?h=e12bcf5e59&color=ffffff&title=0&byline=0',
      );
    }
  }

  getSafeURL(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
