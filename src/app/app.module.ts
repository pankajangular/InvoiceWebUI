
//Angular Internal Parts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//All Pages (Components)
import {
  DashboardComponent,
  VendorManagementComponent,
  ExpensesComponent,
  LinkedUserComponent,
  CurrencyComponent,
  EditProfileComponent,
  ChangePasswordComponent,
  LogsComponent,
  CustomerInvoiceComponent,
  TaxComponent,
  ItemsComponent,
  StatementComponent,
  SignatureComponent,
  MembershipComponent,
  InvitePeopleComponent,
  ContactUsComponent,
  CreateInvoiceComponent,
  QuotationsComponent,
  TimeRecordingComponent,
  InvoiceComponent,
  CreateCustomerComponent,
  AddNewItemComponent
} from './content/pages/components';


//Auth Components
import { LoginComponent, ForgotPasswordComponent, RegisterComponent, OtpComponent, PageNotFoundComponent, ResetPasswordComponent } from './content/pages/auth';

//Layout Components
import { FooterComponent, HeaderComponent, AsideComponent } from './content/layout';



//Core Folder Content
import { OnlyNumber } from './core/directives/onlyNumber.directive';
import { JwtInterceptor } from './core/helpers';

//External NPM Packages
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AsideComponent,
    ForgotPasswordComponent,
    VendorManagementComponent,
    ExpensesComponent,
    RegisterComponent,
    OtpComponent,
    OnlyNumber,
    PageNotFoundComponent,
    ResetPasswordComponent,
    LinkedUserComponent,
    CurrencyComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    LogsComponent,
    CustomerInvoiceComponent,
    TaxComponent,
    ItemsComponent,
    StatementComponent,
    SignatureComponent,
    MembershipComponent,
    InvitePeopleComponent,
    ContactUsComponent,
    CreateInvoiceComponent,
    QuotationsComponent,
    TimeRecordingComponent,
    InvoiceComponent,
    CreateCustomerComponent,
    AddNewItemComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',

    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    // provider used to create fake backend
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
