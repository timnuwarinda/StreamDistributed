import { Injectable } from "@angular/core";
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, CanDeactivate} from "@angular/router"; 
import { Observable } from "rxjs"; 
import { componentFactoryName } from '@angular/compiler';
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable()
export class DeactivateGuard implements CanDeactivate <CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true; 
    }
    //

}