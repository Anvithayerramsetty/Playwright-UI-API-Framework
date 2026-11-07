import { Page, Locator, expect } from "@playwright/test"

export class Practicepage {
    // Text Input
    name: Locator;
    Email: Locator
    Address: Locator
    Submitbtn: Locator
    // RadioButton
    radiobtn: Locator
    // Checkbox
    Checkbox1: Locator
    Checkbox2: Locator
    Checkbox7: Locator
    //Toggle Switch
    ToggleSwitchNotification: Locator
    ToggleEmailSwitchUncheck: Locator
    ToggleAutoSavecheck: Locator
    // Multi Selectsawait 
    Multiselectoption: Locator
    //Tooltip
    Tooltiphover: Locator
    //  Show Hide Elements
    showElement: Locator
    showhidetextbox: Locator
    Hidebutton: Locator
    //Hidden Elements & AJAX
    hideleemntandAjax: Locator
    // Replace this locator if Input Box 2 has a specific id/test-id
    inputbox: Locator
    //Hiddencheckbox2
    togglecheckbutton: Locator
    hiddencheckbox2: Locator
    // ---------- AJAX ----------
    LoadAjaxbutton: Locator
    //Static Dropdowns
    Country: Locator
    //Bootstrap Dropdown
    bdjobtitlebtn:Locator
    QAEngineerbtn:Locator
    //Auto Suggestive Dropdown
    Searchbox:Locator
     // Locate the suggestion that appears
     Suggestion:Locator
       // Searchable Custom Dropdown
       Searchinput:Locator
       Subjectname:Locator
       //File Handling
       Fileinput:Locator
       fileinputreset:Locator
       // multiple file upload
       Multifileinput:Locator
       Multifileinputbtnreset:Locator
       // Hidden Input Upload Challenge
       Resumeinputfile:Locator
       // browser
       Browserfile:Locator
       //file download
       Downloadlinkbtn:Locator
       // end to end workflow



    constructor(public readonly page: Page) {
        // text Input
        this.name = page.locator("#name")
        this.Email = page.getByRole("textbox", { name: "Email" })
        this.Address = page.getByPlaceholder("Enter your address")
        this.Submitbtn = page.getByRole("button", { name: "Submit" })
        // Radio Button
        this.radiobtn = page.locator('input[type="radio"]').nth(1)
        //Checkbox
        this.Checkbox1 = page.locator('input[type="checkbox"]').nth(1)
        this.Checkbox2 = page.locator('input[type="checkbox"]').nth(2)
        this.Checkbox7 = page.locator('input[type="checkbox"]').nth(7)
        // ToggleSwitch
        this.ToggleSwitchNotification = page.locator("#toggle-notifications")
        this.ToggleEmailSwitchUncheck = page
            .getByRole("checkbox", { name: "Email Alerts" })
        this.ToggleAutoSavecheck = page.locator("#toggle-autosave")
        // Multi Selectsawait 
        this.Multiselectoption = page.locator("#colors")
        //Tooltip
        this.Tooltiphover = page.locator("#tooltip-trigger")
        // Show or Hide ELement
        this.showElement = page.getByRole("button", { name: 'Show Element' })
        this.showhidetextbox = page.locator("#showhide-textbox")
        this.Hidebutton = page.locator("#btn-hide-element")
        //Hidden Elements & AJAX
        this.hideleemntandAjax = page.getByRole("button", { name: "Toggle Input Box 2" })
        // Replace this locator if Input Box 2 has a specific id/test-id
        this.inputbox = page.getByRole("textbox", { name: "Input Box 2" })
        //Hiddencheckbox2
        this.togglecheckbutton = page.getByRole("button", { name: "Toggle Checkbox 2" });
        this.hiddencheckbox2 = page.getByRole("checkbox", { name: "Checkbox 2" })
        // ---------- AJAX ----------
        this.LoadAjaxbutton = page.getByRole("button", { name: "Load AJAX Content" });
        //Static Dropdowns
        this.Country = page.getByLabel("Select Country");
        //Bootstrap Dropdown
        this.bdjobtitlebtn=page.locator("#bd-job-title")
        this.QAEngineerbtn=page.getByText("QA Engineer")
        //Auto Suggestive Dropdown
        this.Searchbox=page.getByPlaceholder("Search for Products");
         // Locate the suggestion that appears
         this.Suggestion=page.getByText("Laptop", { exact: true });
          // Searchable Custom Dropdown
          this.Searchinput=page.locator("#sd-input")
          this.Subjectname=page.locator("#sd-input").nth(0)
          //File Handling
          this.Fileinput=page.locator("#upload-single")
          this.fileinputreset=page.locator("#btn-reset-single")
          // multiple file upload
        this.Multifileinput=page.locator("#upload-multiple")
        this.Multifileinputbtnreset=page.locator("#btn-reset-multiple")
        // Hidden Input Upload Challenge
        this.Resumeinputfile=page.locator('input[type="file"][accept=".pdf"]');
        // browser
        this.Browserfile= page.locator("#btn-browse-files")
        //file download
        this.Downloadlinkbtn=page.getByTestId("btn-download-svg");
        // end to end workflow


    }
}