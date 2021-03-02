import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DownloadImageService } from 'src/app/shared/DownloadImage.service';

@Component({
  selector: 'app-insurance-booking-status',
  templateUrl: './insurance-booking-status.component.html',
  styleUrls: ['./insurance-booking-status.component.css']
})
export class InsuranceBookingStatusComponent implements OnInit {

  proposalNum: string;
  status: string;
  message: string;
  bookingId: string;
  feedbackForm: any;
  transactionRefNum: any;
  policyNum: any;
  amount: any;
  date: string;
  constructor(
    private route: ActivatedRoute, 
    private downloadImageService: DownloadImageService,
    private titleService: Title, 
    private toastr: ToastrService,
    private router: Router) {

    // console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['bookingId'];
      this.transactionRefNum = params['transactionRefNum']
      this.proposalNum = params['proposalNum'];
      this.status = params['status'];
      this.message = params['message'];
      this.policyNum = params['policyNum'];
      this.amount = params['amount'];
      // console.log(params)
    });
  }

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      "f1-rating": new FormControl(null, Validators.required),
      "f2-rating": new FormControl(null, Validators.required),
      "f3-rating": new FormControl(null, Validators.required),
      "feedbackcomment": new FormControl(null, Validators.required),
    });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.date = mm + '/' + dd + '/' + yyyy;

    this.titleService.setTitle("Visa2fly | Booking " + this.status);
  }

  navigateToBooking() {
    this.router.navigate(['/myBookings'])
  }

  downloadInvoiceOnSuccess(policyNum: string, bookingId: string) {
    this.downloadImageService
      .getPolicy(policyNum)
      .subscribe((res: any) => {
        // console.log(res);
        if (res.code == "0") {
          this.downloadImageService.downloadPolicy(bookingId).subscribe((response: any) => {
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            let url = window.URL.createObjectURL(
              new Blob(binaryData, { type: dataType })
            );
            a.href = url;
            a.download = "Invoice" + policyNum;
            a.click();
            window.URL.revokeObjectURL(url);
          });
        } else {
          this.toastr.error(res.message);
        }
      });
  }

}
