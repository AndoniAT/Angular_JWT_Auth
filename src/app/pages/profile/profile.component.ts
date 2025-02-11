import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { CreateAccountAttributesType, UserType } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroEye, heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective
} from '@coreui/angular';
import { InteractionsComponent } from "../../elements/interactions/interactions.component";
import { PostsComponent } from "../../elements/posts/posts.component";
import { UserProfileSkeletonComponent } from "../../elements/skeletons/user-profile-skeleton/user-profile-skeleton.component";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, NgIcon, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent, InteractionsComponent, PostsComponent, UserProfileSkeletonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  viewProviders: [ provideIcons( { heroPencilSquare, heroTrash, heroEye } ) ],
})
export class ProfileComponent {
  imAdmin = false;

  loading = true;

  userDefault : UserType | null = null;
  isAdmin = false;
  isMe = false;

  typePassword = true;
  typeConfirmPassword = true;

  modalVisible = false;
  
  showActionButtons = false;
  editMode = false;
  showSaveCancelButtons = false;
  countReconnect = 6;

  errMsg = {
      gral: "",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  
    profileForm = new FormGroup( {
        username: new FormControl( { value: '', disabled: true }, Validators.required),
        firstname: new FormControl( { value: '', disabled: true }, Validators.required ),
        lastname: new FormControl( { value: '', disabled: true }, Validators.required ),
        email: new FormControl( { value: '', disabled: true }, [ Validators.required, Validators.email] ),
        password: new FormControl( { value: '', disabled: true } ),
        confirmPassword: new FormControl( { value: '', disabled: true } ),
        admin: new FormControl( { value: false, disabled: true }, Validators.required )
    } );
  
    readonly attributes = [
      CreateAccountAttributesType.username,
      CreateAccountAttributesType.firstname,
      CreateAccountAttributesType.lastname,
      CreateAccountAttributesType.email,
      CreateAccountAttributesType.password,
      CreateAccountAttributesType.confirmPassword
    ] as CreateAccountAttributesType[];

  constructor(readonly userService: UsersService, 
    readonly route: ActivatedRoute,
    readonly authService: AuthService,
    readonly router: Router
   ) {
  }

  ngOnInit() {
    // Detect changes in params to reload user
    this.route.paramMap.subscribe( ( params:any ) => {
      const username = params.get('username');
      if ( username ) {
        this.loadUser(username);
      }
    });
  }

  loadUser( username: string ) {
    this.userService.getUser( username )
    .subscribe( {
      next: ( user:UserType ) => {
        delete user.password;
        this.userDefault = user;
        this.setValuesForm( this.userDefault );
        this.isAdmin = this.userService.isAdmin( this.userDefault.roles );
        this.imAdmin = this.authService.imAdmin();
        this.isMe = this.authService.isMe( user.username );

        this.updateActionButtons();

        setTimeout( () => {
          this.loading = false;
        }, 3000 );
      },
      error: console.error
    } )
  }

  deleteUser() {
    if( !this.userDefault ) return;

    this.userService.deleteUser( this.userDefault.username )
    .subscribe( {
      next: () => {
        if( this.isMe ) {
          return this.signOut();
        }

        if (window.history.length > 1) {
          window.history.back();
        } else {
          this.router.navigate( [ '/' ] );
        }

      },
      error: ( err:any ) => {
        this.detectHttpErrors( err?.error?.message );
      }
    } )
  }

  cancel() {
    if( this.userDefault ) {
      this.setValuesForm( this.userDefault );
    }
    this.changeEditMode();
  }

  save() {
    this.cleanErrors();
    let err = this.detectFormErrors();

    if( err ) return;

    const {
          username, firstname, lastname,
          email, password, confirmPassword, admin
        } = this.profileForm.value;
    
    const user = {
      username, firstname, lastname, email, password, confirmPassword,
      roles: admin ? [ AuthService.ROLES.admin, AuthService.ROLES.user ] : [ AuthService.ROLES.user ]
    } as UserType;

    if( !this.userDefault ) return;
    this.userService.updateUser( this.userDefault?.username, user )
    .subscribe( {
      next: () => {

        // 1. Verify critical changes
        const critical = this.detectCritialInformation( user );

        // 2. set default user
        this.userDefault = user;
        this.cleanErrors();
        this.setValuesForm( this.userDefault );
        this.changeEditMode();
        
        if( critical ) {
          this.reconnect();
        }
      },
      error: ( err:any ) => {
        this.detectHttpErrors( err?.error?.message );
      }
    } )
  }

  changeEditMode() {
    this.editMode = !this.editMode;

    for( let attr of this.attributes ) {
      const input = this.profileForm.controls[attr];
      if ( this.editMode )
        input.enable();
      else 
        input.disable()
    }

    if( this.editMode ) {
      this.profileForm.controls.admin.enable();
    } else {
      this.profileForm.controls.admin.disable();
    }

    this.updateActionButtons();
  }

  updateActionButtons() {
    let username = this.route.snapshot.paramMap.get( 'username' );
    if( !username ) return;

    this.showActionButtons = ( ( this.isMe || this.imAdmin ) && !this.editMode );
    this.showSaveCancelButtons = ( ( this.isMe || this.imAdmin ) && this.editMode );
  }

  changeTypePassword() {
    this.typePassword = !this.typePassword;
  }

  changeTypeConfirmPassword() {
    this.typeConfirmPassword = !this.typeConfirmPassword;
  }

  setValuesForm( user:UserType ) {
    this.profileForm.patchValue( {
      ...user,
      admin: this.userService.isAdmin( user.roles )
    });
  }

  cleanErrors() {
    this.errMsg.gral = "";

    for( let attr of this.attributes ) {
      this.errMsg[ attr ] = "";
    }
  }

  detectFormErrors() {
    let err = false;
    for( let attr of this.attributes ) {
      if( !this.profileForm.get( attr )?.errors ) continue;

      err = true;
      const val = this.profileForm.get( attr ) as { errors: any };
      const { errors } = val;
      
      if( errors.email ) {
        errors.email = "Email should be a valid email"
      }

      if( errors.required ) {
        errors.required = "A value is required"
      }

      this.errMsg[ attr ] = `Error ${attr} : ${Object.values( errors ).join('\n -')}`;
    }
    return err;
  }

  detectHttpErrors( error:any ) {
    let err = false;
    if( !error ) {
      err = true;
      this.errMsg.gral ="No server response";
      return err;
    }

    if( typeof error === 'string' && error.length > 0 ) {
      err = true;
      this.errMsg.gral = error;
      return err;
    }

    for( let attr of this.attributes ) {
      if( !error[ attr ] ) continue;
      const { message } = error[attr];
      err = true;
      this.errMsg[ attr ] = `Error ${attr} : ${message}`;
    }
    return err;
  }

  handleModalChange(event: any) {
    this.modalVisible = event;
  }

  reconnect() {
    this.modalVisible = true;

    setInterval( () => {
      this.countReconnect--;
        if( this.countReconnect <= 0 ) {
          this.signOut();
      }
    }, 1000 )
  }

  detectCritialInformation( user:UserType ) {
    if( !this.userDefault ) return;

    const isMe = this.authService.isMe( this.userDefault.username );
    if( !isMe ) return false;
    
    const emailHasChanged = ( user.email != this.userDefault?.email );
    const usernameHasChanged = ( user.username != this.userDefault?.username );
    const rightsChanged = !( this.userDefault?.roles.every( r => user.roles.includes( r ) ) && user.roles.every( r => this.userDefault?.roles.includes( r ) ) );

    const criticChange = ( usernameHasChanged || emailHasChanged || rightsChanged );
    if( !criticChange ) return;

    return true;
  }

  signOut() {
    this.authService.logout()
    .subscribe({
      next: ( data:any ) => {
        this.router.navigateByUrl('/login').then(() => {
          location.replace( location.href ); // Replace current url by the same to revalidate
        });
      },
      error: console.error
    })
  }

  resetValues() {
    this.imAdmin = false;
    this.loading = true;

    this.userDefault = null;
    this.isAdmin = false;
    this.isMe = false;

    this.typePassword = true;
    this.typeConfirmPassword = true;

    this.modalVisible = false;
  
    this.showActionButtons = false;
    this.editMode = false;
    this.showSaveCancelButtons = false;
    this.countReconnect = 6;

    this.cleanErrors();
  }
}
