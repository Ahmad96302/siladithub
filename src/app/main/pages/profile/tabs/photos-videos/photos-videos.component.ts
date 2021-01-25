import { Component, OnDestroy, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from 'app/main/pages/profile/profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector     : 'profile-photos-videos',
    templateUrl  : './photos-videos.component.html',
    styleUrls    : ['./photos-videos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfilePhotosVideosComponent implements OnInit, OnDestroy
{
    photosVideos: any;
    public progress: number;
    public message: string;
    @Output() public onUploadFinished = new EventEmitter();

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._profileService.photosVideosOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(photosVideos => {
                this.photosVideos = photosVideos;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    public uploadFile = (files) => {
        if (files.length === 0) {
          return;
        }
    
        let fileToUpload = <File>files[0];
        const formData = new FormData();
        let token = sessionStorage.getItem('key');
        formData.append('file', fileToUpload, fileToUpload.name);
        // this.http.post(this.Service.gethosturl()+'/Currencies/upload',formData,{reportProgress: true,headers:{'Authorization' :'Bearer '+token}, observe: 'events' })
        //   .subscribe(event => {
        //     if (event.type === HttpEventType.UploadProgress)
        //       this.progress = Math.round(100 * event.loaded / event.total);
        //     else if (event.type === HttpEventType.Response) {
        //       this.message = 'Upload success.';
        //       this.onUploadFinished.emit(event.body);
        //     }
        //   });
      }
}
