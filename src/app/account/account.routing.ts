import { ModuleWithProviders } from "@angular/core/core";
import { RouterModule } from "@angular/router/router";
import { ChangePasswordComponent } from "app/account/change-password/change-password.component";

export const routing: ModuleWithProviders = RouterModule.forChild([
    {path:'change-password', component: ChangePasswordComponent}
    
]);