/*
============================================
; Title: matching-password.validator
; Author: Troy Martin
; Date: 01/24/2020
; Modified By: Troy Martin
; Description: Matching password validator
;
; Reference
; Douglas McConnachie https://gist.github.com/dougal83/27bbeffd6129d9cb620d0e996fd8156b
;===========================================
*/
import { ValidatorFn, FormGroup } from '@angular/forms';

/*
; Params: passwordKey: string, confirmationKey: string
; Response: {passwordsDoNotMatch: true} || null
; Description: Validate that the values of the controls match
*/
export function matchingPassword(passwordKey: string, confirmationKey: string): ValidatorFn {
  return (group: FormGroup): {[key: string]: any} => {
    const passwordControl = group.controls[passwordKey];
    const confirmControl = group.controls[confirmationKey];
    if (passwordControl && passwordControl.value && confirmControl && confirmControl.value) {
      if (passwordControl.value !== confirmControl.value) {
        return { passwordsDoNotMatch: true };
      }
      return null;
    }
  };
}
