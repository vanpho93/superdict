import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppEffects } from './app.effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { reducers, metaReducers, UserEffects, VocabularyEffects, ReviewEffects, LessonEffects } from './models'

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzAffixModule } from 'ng-zorro-antd/affix'
import { NzPopoverModule } from 'ng-zorro-antd/popover'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { NzSliderModule } from 'ng-zorro-antd/slider'
import { NzResultModule } from 'ng-zorro-antd/result'
import { NzProgressModule } from 'ng-zorro-antd/progress'
import { NzSelectModule } from 'ng-zorro-antd/select'

import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { ProfileComponent } from './components/profile/profile.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ContactComponent } from './components/contact/contact.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { VocabularyScreenComponent } from './components/screens/vocabulary-screen/vocabulary-screen.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ReviewScreenComponent } from './components/screens/review-screen/review-screen.component'

registerLocaleData(en)

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ProfileComponent,
    DashboardComponent,
    ContactComponent,
    PageNotFoundComponent,
    NavBarComponent,
    VocabularyScreenComponent,
    ReviewScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      },
      initialState: environment.defaultState as any,
    }),
    EffectsModule.forRoot([
      AppEffects, UserEffects, VocabularyEffects, ReviewEffects, LessonEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMenuModule,
    NzListModule,
    NzButtonModule,
    NzRadioModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzPaginationModule,
    NzSwitchModule,
    NzSpinModule,
    NzFormModule,
    NzAffixModule,
    NzPopoverModule,
    NzBadgeModule,
    NzMessageModule,
    NzSliderModule,
    NzResultModule,
    NzProgressModule,
    NzSelectModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})

export class AppModule {}
