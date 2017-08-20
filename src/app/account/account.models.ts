export class ChangePassword {
    oldPassword:string;
    newPassword:string;

    public clear(){
        this.newPassword ='';
        this.oldPassword= '';
    }
}

export class ApplicationUserVM {
     Email:string;
     FirstName:string;
     LastName:string;
     
     Roles:string[];
}