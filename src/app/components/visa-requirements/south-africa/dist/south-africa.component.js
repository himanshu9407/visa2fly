"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.SouthAfricaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/animations");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var SouthAfricaComponent = /** @class */ (function () {
    function SouthAfricaComponent(router, requireQuotation, userFlow, toastr, preloaderService, titleService, meta, activatedRoute, doc, platformId) {
        var _this = this;
        this.router = router;
        this.requireQuotation = requireQuotation;
        this.userFlow = userFlow;
        this.toastr = toastr;
        this.preloaderService = preloaderService;
        this.titleService = titleService;
        this.meta = meta;
        this.activatedRoute = activatedRoute;
        this.doc = doc;
        this.platformId = platformId;
        this.selectedRequirement = false;
        // selectedRequirement: boolean = false;
        this.selectedPurpose = new rxjs_1.Subject();
        this.selectedVisaType = "Tourist";
        this.MyQuotation = [];
        this.MyQuotation1 = [];
        this.imagefield1 = [];
        this.onlinestatus = false;
        // public selectedPurpose = 'Tourist';
        this.businessArr = [];
        this.touristArr = [];
        this.transitArr = [];
        this.selectedBusiness = 1;
        this.selectedTransit = 1;
        this.selectedTourist = 1;
        this.selectedMobileTourist = 1;
        this.selectedMobileBusiness = 1;
        this.selectedMobileTransit = 1;
        this.selectedCountrytype = "South Africa";
        this.imageCatogory = [];
        this.imageCatogoryBusinessTemp = [];
        this.imageCatogoryTouristTemp = [];
        this.imageCatogoryTransitTemp = [];
        this.imageCatogoryTemp = [];
        this.activeTouristArr = [];
        this.activatedRoute.params.subscribe(function (params) {
            if (params["purpose"]) {
                _this.router.navigate(["visa", "south-africa-visa-online"]);
            }
        });
        this.preloaderService.showPreloader(true);
        if (this.userFlow.getCookie("selectedVisaPurpose")) {
            this.selectedVisaType = this.userFlow.getCookie("selectedVisaPurpose");
        }
        else {
            this.selectedVisaType = "Tourist";
        }
        var tempPurpose = this.selectedVisaType;
        this.userFlow.setUserFlowDetails("country", this.selectedCountrytype);
        this.purposeChooseForm = new forms_1.FormGroup({
            purposeSelected: new forms_1.FormControl(tempPurpose)
        });
        this.requireQuotation
            .getRequireQuotation(this.selectedCountrytype)
            .subscribe(function (res) {
            if (res.code == 0) {
                _this.MyQuotation = res.data.quotations;
                _this.imageCatogory.push(res.data.imageUploadInfo);
                _this.imageCatogoryBusinessTemp = _this.imageCatogory[0]["BUSINESS"];
                _this.imageCatogoryTouristTemp = _this.imageCatogory[0]["TOURIST"];
                _this.imageCatogoryTransitTemp = _this.imageCatogory[0]["TRANSIT"];
                _this.onlinestatus = res.data.onlineCategory;
                _this.userFlow.setUserFlowDetails("onlineCountry", JSON.stringify(res.data.onlineCategory));
                _this.MyQuotation.forEach(function (element) {
                    if (element.purpose == "Business") {
                        _this.businessArr.push(element);
                    }
                    else if (element.purpose == "Tourist") {
                        _this.touristArr.push(element);
                    }
                    else if (element.purpose == "Transit") {
                        _this.transitArr.push(element);
                    }
                });
                var purposeMain = _this.selectedVisaType;
                var purposeUrl = purposeMain.charAt(0).toUpperCase() + purposeMain.slice(1);
                if (purposeUrl == "Business") {
                    _this.MyQuotation1 = _this.businessArr;
                    _this.imageCatogoryTemp = _this.imageCatogoryBusinessTemp;
                }
                else if (purposeUrl == "Tourist") {
                    _this.MyQuotation1 = _this.touristArr;
                    _this.imageCatogoryTemp = _this.imageCatogoryTouristTemp;
                }
                else if (purposeUrl == "Transit") {
                    _this.MyQuotation1 = _this.transitArr;
                    _this.imageCatogoryTemp = _this.imageCatogoryTransitTemp;
                }
                else {
                    _this.router.navigate(["visa/"]);
                }
                _this.userFlow.setUserFlowDetails("imageUploads", JSON.stringify(_this.imageCatogoryTemp));
                setTimeout(function () {
                    _this.preloaderService.showPreloader(false);
                }, 500);
            }
            else {
                setTimeout(function () {
                    _this.preloaderService.showPreloader(false);
                    _this.router.navigate(["/"]);
                }, 2000);
                _this.toastr.error("Country Not Found");
            }
        });
    }
    SouthAfricaComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("South Africa Visa | Apply For South Africa Visa Online for Indians- Visa2Fly");
        this.meta.updateTag({
            name: "keywords",
            content: "apply for South Africa e-visa, South Africa tourist visa application,South Africa Visa, south africa tourist visa for Indian, apply for south africa e visa, south africa e-visa for Indians"
        });
        this.meta.updateTag({
            name: "description",
            content: "Visa2fly offers South Africa visa for Indians. Indian passport holders can easily apply for a South Africa visa online at Visa2Fly. Visa2fly offers doorstep visa services making it convenient for Indian nationals. Indian nationals can fill their South africa visa online with Visa2Fly here."
        });
        // facebook and linkedin
        this.meta.updateTag({
            property: "og:title",
            content: "South Africa Visa | Apply For South Africa Visa Online for Indians- Visa2Fly"
        });
        this.meta.updateTag({ property: "type", content: "website" });
        this.meta.updateTag({
            property: "og:image",
            content: "https://static.visa2fly.com/country/South Africa.jpg"
        });
        this.meta.updateTag({
            property: "og:url",
            content: "https://visa2fly.com/visa/south-africa-visa-online"
        });
        this.meta.updateTag({
            property: "og:image:alt",
            content: "South Africa Visa - Visa2Fly"
        });
        this.meta.updateTag({
            property: "og:description",
            content: "Visa2fly offers South Africa visa for Indians. Indian passport holders can easily apply for a South Africa visa online at Visa2Fly. Visa2fly offers doorstep visa services making it convenient for Indian nationals. Indian nationals can fill their South africa visa online with Visa2Fly here."
        });
        // twitter
        this.meta.updateTag({
            property: "twitter:card",
            content: "summary"
        });
        this.meta.updateTag({
            property: "twitter:title",
            content: "South Africa Visa | Apply For South Africa Visa Online for Indians- Visa2Fly"
        });
        this.meta.updateTag({
            property: "twitter:image",
            content: "https://static.visa2fly.com/country/South Africa.jpg"
        });
        this.meta.updateTag({
            property: "twitter:image:alt",
            content: "South Africa Visa - Visa2Fly"
        });
        this.meta.updateTag({
            property: "twitter:description",
            content: "Visa2fly offers South Africa visa for Indians. Indian passport holders can easily apply for a South Africa visa online at Visa2Fly. Visa2fly offers doorstep visa services making it convenient for Indian nationals. Indian nationals can fill their South africa visa online with Visa2Fly here."
        });
        this.meta.updateTag({
            property: "twitter:site",
            content: "@visa2fly"
        });
        this.meta.updateTag({
            property: "twitter:creator",
            content: "@visa2fly"
        });
        var link = this.doc.createElement("link");
        link.setAttribute("rel", "canonical");
        this.doc.head.appendChild(link);
        link.setAttribute("href", "https://visa2fly.com/visa/south-africa-visa-online");
    };
    SouthAfricaComponent.prototype.purposeChanged = function () {
        var purpose = this.purposeChooseForm.get("purposeSelected").value;
        this.userFlow.setCookie("selectedVisaPurpose", purpose);
        if (purpose == "Tourist") {
            this.MyQuotation1 = this.touristArr;
            this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
            this.selectedPurpose.next(purpose);
        }
        else if (purpose == "Business") {
            this.MyQuotation1 = this.businessArr;
            this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
            this.selectedPurpose.next(purpose);
        }
        else {
            this.MyQuotation1 = this.transitArr;
            this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
            this.selectedPurpose.next(purpose);
        }
        this.userFlow.setUserFlowDetails("imageUploads", JSON.stringify(this.imageCatogoryTemp));
    };
    SouthAfricaComponent.prototype.navigateTo = function (purpose) {
        var purposeString = purpose.nextId;
        var purposeUrl = purposeString.charAt(0).toUpperCase() + purposeString.slice(1);
        this.purposeChooseForm.get("purposeSelected").setValue(purposeString);
        if (purposeString == "Tourist") {
            this.MyQuotation1 = this.touristArr;
            this.imageCatogoryTemp = this.imageCatogoryTouristTemp;
            this.selectedVisaType = "Tourist";
            this.selectedTourist = 1;
            this.selectedMobileTourist = 1;
        }
        else if (purposeString == "Business") {
            this.MyQuotation1 = this.businessArr;
            this.imageCatogoryTemp = this.imageCatogoryBusinessTemp;
            this.selectedVisaType = "Business";
            this.selectedBusiness = 1;
            this.selectedMobileBusiness = 1;
        }
        else {
            this.MyQuotation1 = this.transitArr;
            this.imageCatogoryTemp = this.imageCatogoryTransitTemp;
            this.selectedVisaType = "Transit";
            this.selectedTransit = 1;
            this.selectedMobileTransit = 1;
        }
        this.userFlow.setCookie("selectedVisaPurpose", purposeUrl);
        this.userFlow.setUserFlowDetails("imageUploads", JSON.stringify(this.imageCatogoryTemp));
    };
    SouthAfricaComponent = __decorate([
        core_1.Component({
            selector: "app-south-africa",
            templateUrl: "./south-africa.component.html",
            styleUrls: ["./south-africa.component.css"],
            animations: [
                // the fade-in/fade-out animation.
                animations_1.trigger("simpleFadeAnimation", [
                    // the "in" style determines the "resting" state of the element when it is visible.
                    animations_1.state("in", animations_1.style({ opacity: 1 })),
                    // fade in when created. this could also be written as transition('void => *')
                    animations_1.transition(":enter", [animations_1.style({ opacity: 0 }), animations_1.animate(800)]),
                    // fade out when destroyed. this could also be written as transition('void => *')
                    animations_1.transition(":leave", animations_1.animate(800, animations_1.style({ opacity: 0, background: "green" }))),
                ]),
            ]
        }),
        __param(8, core_1.Inject(common_1.DOCUMENT)),
        __param(9, core_1.Inject(core_1.PLATFORM_ID))
    ], SouthAfricaComponent);
    return SouthAfricaComponent;
}());
exports.SouthAfricaComponent = SouthAfricaComponent;
