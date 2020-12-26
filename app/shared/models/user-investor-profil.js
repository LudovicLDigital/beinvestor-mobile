

export default class UserInvestorProfil {
    constructor(id, professionnalSalary, nbEstate, annualRent, fiscalPart, actualCreditMensualities) {
        this._id = id;
        this._professionnalSalary = professionnalSalary;
        this._nbEstate = nbEstate;
        this._annualRent = annualRent;
        this._fiscalPart = fiscalPart;
        this._actualCreditMensualities = actualCreditMensualities;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get professionnalSalary() {
        return this._professionnalSalary;
    }

    set professionnalSalary(value) {
        this._professionnalSalary = value;
    }

    get nbEstate() {
        return this._nbEstate;
    }

    set nbEstate(value) {
        this._nbEstate = value;
    }

    get annualRent() {
        return this._annualRent;
    }

    set annualRent(value) {
        this._annualRent = value;
    }

    get fiscalPart() {
        return this._fiscalPart;
    }

    set fiscalPart(value) {
        this._fiscalPart = value;
    }

    get actualCreditMensualities() {
        return this._actualCreditMensualities;
    }

    set actualCreditMensualities(value) {
        this._actualCreditMensualities = value;
    }
}