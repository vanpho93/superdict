import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SignInComponent } from './components/sign-in/sign-in.component'
import { ProfileComponent } from './components/profile/profile.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { ContactComponent } from './components/contact/contact.component'
import { VocabularyScreenComponent } from './components/screens/vocabulary-screen/vocabulary-screen.component'
import { ReviewScreenComponent } from './components/screens/review-screen/review-screen.component'
import { MustBeUserGuard } from './guards/must-be-user.guard'
import { MustBeGuestGuard } from './guards/must-be-guest.guard'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [MustBeUserGuard] },
  { path: 'vocabulary', component: VocabularyScreenComponent, canActivate: [MustBeUserGuard] },
  { path: 'review', component: ReviewScreenComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'sign-in', component: SignInComponent, canActivate: [MustBeGuestGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [MustBeUserGuard] },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
