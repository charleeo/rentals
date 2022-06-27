import { Injectable } from "@angular/core";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { exit } from "process";
// import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  modalOptions: NgbModalOptions;
  closeResult: string;
  modalRef: any;
  apiUrl: string;

  constructor(private modalService: NgbModal, private httpClient: HttpClient) {
    this.modalOptions = {
      backdrop: true,
      centered: true,
      backdropClass: "customBackdrop",
      size: "lg",
    };
  }


  roundUpToTwoDecimalPlaces(value:number) {
    let test = Math.round((value + Number.EPSILON) * 100) / 100;
    return test;
  }



  showModal(modal:any) {
    this.modalService.open(modal, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  closeAllModals() {
    this.modalService.dismissAll();
  }

  openModal(modal:any) {
    this.modalRef = this.modalService.open(modal, this.modalOptions);
    this.manageModal(this.modalRef);
    return this.modalRef;
  }

  private manageModal(modalReference:any) {
    modalReference.result.then(
      (result:any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason:any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  prependZero(value: string): string {
    let newValue = value;
    if (value) {
      if (newValue.length < 11) newValue = "0" + newValue;
    }

    return newValue;
  }

  validFileExtension(
    files: Array<any>,
    extensions: Array<string> = ["png", "jpg", "jpeg"]
  ): boolean {
    let validExtension = true;
    for (let i = 0; i < files.length; i++) {
      const name = files[i].name;
      const ext = name.slice(((name.lastIndexOf(".") - 1) >>> 0) + 2);
      console.log(ext);
      if (!extensions.includes(ext)) {
        validExtension = false;
        exit;
      }
    }
    return validExtension;
  }

  numRound(num:any, round:number = 2): number {
    return Number(Number(num).toFixed(round));
  }
}
