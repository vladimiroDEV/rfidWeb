export class ChangePassword {
    oldPassword:string;
    newPassword:string;

    public clear(){
        this.newPassword ='';
        this.oldPassword= '';
    }
}