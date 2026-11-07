import { test, expect, Page } from "@playwright/test";

test.describe("Practice page flow", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.playwrightautomation.com/practice.html");

        await expect(page).toHaveURL(
            "https://www.playwrightautomation.com/practice.html"
        );
    });

    test("Verify text inputs", async ({ page }) => {

        // Text Input
        await page.locator("#name").fill("Anvitha");
        await page.getByRole("textbox", { name: "Email" })
            .fill("anvithayerramsetty@gmail.com");
        await page.getByPlaceholder("Enter your address").fill("Miyapur");
        await page.getByRole("button", { name: "Submit" }).click();

        await expect(
            page.getByRole("button", { name: "Reset" }).first()
        ).toBeVisible();


        // Radio Buttons
        await page.locator('input[type="radio"]').nth(1).check();

        await expect(
            page.locator('input[type="radio"]').nth(1)
        ).toBeChecked();


        // Checkboxes
        await expect(
            page.getByText("Checkboxes").first()
        ).toBeVisible();

        await page.locator('input[type="checkbox"]').nth(1).check();

        await expect(
            page.locator('input[type="checkbox"]').nth(1)
        ).toBeChecked();

        await page.locator('input[type="checkbox"]').nth(2).check();

        await expect(
            page.locator('input[type="checkbox"]').nth(2)
        ).toBeChecked();

        await page.locator('input[type="checkbox"]').nth(7).check();

        await expect(
            page.locator('input[type="checkbox"]').nth(7)
        ).toBeChecked();


        // Toggle Switches
        await expect(
            page.locator("#section-toggles")
        ).toBeVisible();

        await expect(
            page.getByText("Enable Notifications")
        ).toBeVisible();

        await page.locator("#toggle-notifications").check();

        await expect(
            page.getByText("Email Alerts")
        ).toBeVisible();

        await page
            .getByRole("checkbox", { name: "Email Alerts" })
            .uncheck();

        await expect(
            page.getByText("Auto Save")
        ).toBeVisible();

        await page.locator("#toggle-autosave").check();

        await expect(
            page.locator("#toggle-notifications")
        ).toBeChecked();

        await expect(
            page.getByRole("checkbox", { name: "Email Alerts" })
        ).not.toBeChecked();

        await expect(
            page.locator("#toggle-autosave")
        ).toBeChecked();


        // Multi Selectsawait 
        await page.locator("#colors").selectOption(["puma", "zara", "adidas"])
        // await page.locator("#colors").selectOption([
        //     "puma",
        ////     "zara",
        //]);

        // Tooltip
        await page.locator("#tooltip-trigger").hover()
        await expect(page.locator("#tooltip-trigger")).toBeVisible()

        // Show / Hide Elements
        expect(page.locator("#section-showhide").isVisible());

        await page.getByRole("button", { name: 'Show Element' }).click()
        await expect(page.getByText("Target field")).toBeVisible()
        await expect(page.locator("#showhide-textbox")).toBeVisible()
        await page.locator("#showhide-textbox").fill("123")
        await page.locator("#btn-hide-element").click()

        await expect(page.locator("#btn-hide-element")).not.toBeDisabled()
        //Hidden Elements & AJAX
        await page.getByRole("button", { name: "Toggle Input Box 2" }).click();


        // Replace this locator if Input Box 2 has a specific id/test-id
        const inputBox2 =
            page.getByRole("textbox", { name: "Input Box 2" });

        await expect(inputBox2).toBeVisible();

        await inputBox2.fill("Playwright Automation");


        // ---------- Hidden Checkbox 2 ----------

        const toggleCheckboxButton =
            page.getByRole("button", { name: "Toggle Checkbox 2" });

        await toggleCheckboxButton.click();

        const checkbox2 =
            page.getByRole("checkbox", { name: "Checkbox 2" });

        await expect(checkbox2).toBeVisible();

        await checkbox2.check();

        await expect(checkbox2).toBeChecked();


        // ---------- AJAX ----------

        const loadAjaxButton =
            page.getByRole("button", { name: "Load AJAX Content" });

        await loadAjaxButton.click();

        // Verify AJAX-loaded content appears
        const ajaxContent =
            page.getByText("AJAX content loaded").first();

        await expect(ajaxContent).toHaveText("AJAX content loaded");

        //Static Dropdowns
        expect(page.getByText("Static Dropdowns").first().isVisible())
        const country = page.getByLabel("Select Country");

        await country.selectOption({ label: "India" });

        await expect(country).toHaveValue("india");

        //Bootstrap Dropdown
        expect(page.getByText("Bootstrap Dropdown").first().isVisible())
        expect(page.getByText("Select Job Title").isVisible())
        await page.locator("#bd-job-title").click()
        await page.getByText("QA Engineer").click()

        //Auto Suggestive Dropdown

        const searchBox = page.getByPlaceholder("Search for Products");

        // Verify search box
        await expect(searchBox).toBeVisible();

        // Type search text
        await searchBox.fill("lap");

        // Locate the suggestion that appears
        const suggestion = page.getByText("Laptop", { exact: true });

        // Verify suggestion
        await expect(suggestion).toBeVisible();

        // Select suggestion
        await suggestion.click();

        // Searchable Custom Dropdown
        expect(page.getByText("Searchable Custom Dropdown").isVisible())
        await page.locator("#sd-input").pressSequentially("Playwright")
        const subjectname = await page.locator("#sd-input").nth(0).click()
        await expect(page.locator("#sd-input")).toHaveValue("Playwright")



        /* Dynamic Dependent Dropdown
        
        const counntry = page.getByTestId("dep-dropdown-country");
        const state = page.getByTestId("dep-dropdown-state");
        const city = page.getByTestId("dep-dropdown-city");
        
        // Initial state
        await expect(state).toBeDisabled();
        await expect(city).toBeDisabled();
        
        // Select India
        await country.selectOption({ label: "India" });
        
        // Verify country selection
        await expect(country).toHaveValue("india");
        
        // Wait until State becomes enabled
        await expect(state).not.toHaveAttribute("disabled");
        
        // Verify State is enabled
        await expect(state).toBeEnabled();
        
        // Select an ACTUAL state from your HTML
        await state.selectOption("karnataka");
        
        await expect(state).toHaveValue("karnataka");*/

        //File Handling
        const fileinput = page.locator("#upload-single")
        await fileinput.setInputFiles("test_data/sample.txt")

        // Verify uploaded filename is displayed
        await expect(
            page.getByText("sample.txt", { exact: true })
        ).toBeVisible();

        // reset 
        await page.locator("#btn-reset-single").click()



        // multiple file upload

        expect(page.getByText("Multiple File Upload").isVisible())
        const multifileinput = page.locator("#upload-multiple")
        await multifileinput.setInputFiles(["test_data/sample.txt", "test_data/sample1.txt"])

        // reset


        await page.locator("#btn-reset-multiple").click()


        // Hidden Input Upload Challenge

        const resumeInput = page.locator('input[type="file"][accept=".pdf"]');

        // Upload PDF directly to hidden input
        await resumeInput.setInputFiles("test_data/Certificate.pdf");

        // Verify successful upload
        await expect(
            page.getByText("Resume Uploaded Successfully")
        ).toBeVisible();

        // Verify filename
        await expect(
            page.getByText("Certificate.pdf", { exact: true })
        ).toBeVisible();

        // browser

        const filechooserPromise = page.waitForEvent("filechooser")

        const browserfile = page.locator("#btn-browse-files").click()
        const filechooser = await filechooserPromise
        await filechooser.setFiles("test_data/sample.txt");
        await expect(
            page.getByText("File Count: 1")
        ).toBeVisible();

        // Verify uploaded filename
        await expect(
            page.getByText("sample.txt", { exact: true })
        ).toBeVisible();



    });

});
//file download
test("Verify file download", async ({ page }) => {

    await page.goto("https://www.playwrightautomation.com/practice.html");

    const downloadLink = page.getByTestId("btn-download-svg");

    await expect(downloadLink).toBeVisible();

    const [download] = await Promise.all([
        page.waitForEvent("download"),
        downloadLink.click()
    ]);

    await expect(download.failure()).resolves.toBeNull();

    expect(download.suggestedFilename()).toBe("genxevo-logo.svg");

    //
    const link = page.getByTestId("btn-download-pdf");
    await expect(link).toBeVisible();
    const [linkdownload] = await Promise.all([
        page.waitForEvent("download"),
        link.click()

    ]);
    expect(linkdownload.suggestedFilename()).toBe("genxevo-profile-course-guide.pdf")

});
// end to end workflow
test("Verify end to end workflow", async ({ page }) => {

    await page.goto(
        "https://www.playwrightautomation.com/practice.html"
    );

    const [newpage] = await Promise.all([
        page.waitForEvent("popup"),
        page.locator("#btn-open-excel-playground").click()
    ]);

    await newpage.waitForLoadState("domcontentloaded");

    await expect(newpage).toHaveURL(
        "https://www.playwrightautomation.com/excel-upload-download-lab.html"
    );

    const downloadButton =
        newpage.locator("#btn-download-dataset");

    const [downloadCSV] = await Promise.all([
        newpage.waitForEvent("download"),
        downloadButton.click()
    ]);

    await expect(downloadCSV.failure()).resolves.toBeNull();

    console.log(
        "Downloaded filename:",
        downloadCSV.suggestedFilename()
    );

    const resetButton = newpage.locator("#btn-reset-dataset")


    await resetButton.click();

    await expect(
        newpage.getByText("Reset to default dataset", {
            exact: false
        })
    ).toBeVisible();
    await expect(newpage.getByTestId("section-dataset")).toBeVisible()
    console.log("Table section is Visible")

    //  await newpage.pause()
});
// webtables
test("Verify India medal total", async ({ page }) => {

    await page.goto(
        "https://www.playwrightautomation.com/practice.html"
    );

    // Step 1: Open Tables module
    // await page.getByText("Tables", { exact: true }).click();

    // Step 2: Locate India row
    const indiaRow = page.locator("tr").filter({
        hasText: "India"
    }).first();

    await expect(indiaRow).toBeVisible();

    // Step 3: Get table cells
    const cells = indiaRow.locator("td");

    // Step 4: Retrieve and convert values
    const gold = Number(await cells.nth(2).textContent());
    const silver = Number(await cells.nth(3).textContent());
    const bronze = Number(await cells.nth(4).textContent());
    const displayedTotal = Number(await cells.nth(5).textContent());

    // Step 5: Calculate
    const calculatedTotal = gold + silver + bronze;

    // Step 6: Verify
    expect(calculatedTotal).toBe(displayedTotal);
    console.log(
        "Matching India rows:",
        await page.locator("tr").filter({
            hasText: "India"
        }).count()
    );

});

// Find the country with the highest Gold medals using TypeScript logic.
test("Find country with highest gold medals", async ({ page }) => {

    await page.goto("https://www.playwrightautomation.com/practice.html");

    // Step 1: Open Tables section
    await page.getByText("Tables", { exact: true }).first().click();

    // Step 2: Find the static table
    // Use a specific table locator if the page contains multiple tables
    const table = page.getByRole("table").first();

    await expect(table).toBeVisible();

    // Step 3: Get all data rows
    const rows = table.locator("tbody tr");
    const rowCount = await rows.count();

    let highestGold = -1;
    let countryName = "";

    // Step 4: Loop through each row
    for (let i = 0; i < rowCount; i++) {

        const cells = await rows.nth(i).locator("td").allInnerTexts();

        const country = cells[0];
        const gold = Number(cells[2]);

        // Step 5: Compare gold medals
        if (gold > highestGold) {
            highestGold = gold;
            countryName = country;
        }
    }

    // Step 6: Print results
    console.log("Country:", countryName);
    console.log("Highest Gold Medals:", highestGold);

    // Step 7: Verify result
    expect(countryName).toBe("USA");
    expect(highestGold).toBe(10);


});
// Find Manchester City's Points.


test("Verify Manchester City Points in Dynamic Table", async ({ page }) => {

    await page.goto("https://www.playwrightautomation.com/practice.html");

    // Step 1: Open Tables section
    // After navigating to Dynamic Table

    const table = page.getByRole("table").nth(1);

    await expect(table).toBeVisible();

    const headers = await table.locator("thead th").allInnerTexts();

    console.log("Headers:", headers);

    const normalizedHeaders = headers.map(header =>
        header.trim().toUpperCase()
    );

    const pointsIndex = normalizedHeaders.indexOf("POINTS");
    const clubIndex = normalizedHeaders.indexOf("CLUB");

    expect(pointsIndex).toBeGreaterThanOrEqual(0);
    expect(clubIndex).toBeGreaterThanOrEqual(0);

    const cityRow = table.locator("tbody tr").filter({
        hasText: "Manchester City"
    });

    await expect(cityRow).toHaveCount(1);

    const cells = await cityRow.locator("td").allInnerTexts();

    const points = Number(cells[pointsIndex]);

    console.log("Manchester City Points:", points);


});
// REgenrate dynamic section
test("Regenerate Dynamic Web Table", async ({ page }) => {

    await page.goto("https://www.playwrightautomation.com/practice.html");

    // Step 1: Locate Dynamic Table section
    const dynamicSection = page.locator("#section-table-dynamic");

    await expect(dynamicSection).toBeVisible();

    // Step 2: Locate the Dynamic Table
    const table = page.getByRole("table").nth(1);

    // Step 3: Locate Regenerate button
    const regenerateButton = page.locator("#btn-refresh-dynamic");

    // Step 4: Click Regenerate
    await regenerateButton.click();

    // Step 5: Retrieve updated headers
    const headers = await table.locator("thead th").allInnerTexts();

    console.log("Updated Headers:", headers);
    // Typescript logic 
    const normalizedHeaders = headers.map(headers => headers.trim().toUpperCase());
    // getting index of POINTS
    const points = normalizedHeaders.indexOf("POINTS")
    // Assertion
    expect(points).toBeGreaterThanOrEqual(0);
});
//Pagination


test("Verify Pagination", async ({ page }) => {
    // Navigate to page
    await page.goto("https://www.playwrightautomation.com/practice.html");
    // Locator fileds
    const searchField = page.locator("#pagination-search");
    const nextButton = page.locator("#pagination-next");
    const previousButton = page.locator("#pagination-prev");

    await searchField.fill("");

    // Third table on the webpage
    const table = page.getByRole("table").nth(2);
    const rows = table.locator("tbody tr");

    // Verify Page 1
    await expect(rows).toHaveCount(10);

    const page1Data = await rows.allInnerTexts();

    // Move to Page 2
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    // Verify the records changed
    await expect.poll(async () => {
        return rows.allInnerTexts();
    }).not.toEqual(page1Data);

    // Return to Page 1
    await expect(previousButton).toBeEnabled();
    await previousButton.click();

    // Verify the original records are restored
    await expect.poll(async () => {
        return rows.allInnerTexts();
    }).toEqual(page1Data);
    console.log("Tables found:", await page.getByRole("table").count());

    console.log(
        "Pagination rows:",
        await page.getByRole("table").nth(2).locator("tbody tr").count()

    );

});

test("verify pagination 25", async ({ page }) => {
    // Navigate to page
    await page.goto("https://www.playwrightautomation.com/practice.html")
    //Locate fields
    const searchfield = page.locator("#pagination-search")
    const nextbutton = page.locator("#pagination-next")
    const previousbtn = page.locator("#pagination-prev")

    const pagesize = await page.locator("#pagination-page-size").selectOption("25")

    await searchfield.fill("")
    // locator table and get all innertext of rows
    const table = page.getByRole("table").nth(2)
    const row = table.locator("tbody tr")
    //assertion

    await expect(row).toHaveCount(25)

    const Page1 = await row.allInnerTexts()

    //move to page2
    await expect(nextbutton).toBeEnabled()
    await nextbutton.click()


    // verify record change
    await expect.poll(async () => {
        return row.allInnerTexts()
    }).not.toEqual(Page1)

    //return to page1 data
    await expect(previousbtn).toBeEnabled()
    await previousbtn.click()

    // verify page1 data 
    await expect.poll(async () => {
        return row.allInnerTexts()
    }).toEqual(Page1)

    console.log("Tables found:", await page.getByRole("table").count());

    console.log("Pagination rows:",
        await page.getByRole("table").nth(2).locator("tbody tr").count())


});

// Table assignment 

test("Book the cheapest available flight", async ({ page }) => {

    // STEP 1: Navigate to application
    await page.goto("https://www.playwrightautomation.com/practice.html");

    // STEP 2: Select departure and destination
    await page.getByLabel("Departure").selectOption("Dubai")
    await page.getByLabel("Destination").selectOption("Singapore")
    // STEP 3: Search flights
    await page.getByRole("button", {
        name: "Find Flights"
    }).click();

    // STEP 4: Locate flight table
    const table = page.locator("#flight-table");

    await expect(table).toBeVisible();

    const rows = table.locator("tbody tr");

    await expect(rows.first()).toBeVisible();

    // STEP 5: Identify price column dynamically
    const headers = await table.locator("thead th").allInnerTexts();

    const normalizedHeaders = headers.map(header =>
        header.trim().toUpperCase()
    );

    const priceIndex = normalizedHeaders.findIndex(header =>
        header.includes("PRICE") || header.includes("FARE")
    );

    expect(priceIndex).toBeGreaterThanOrEqual(0);

    // STEP 6: Initialize minimum-price variables
    let cheapestPrice = Infinity;
    let cheapestRowIndex = -1;

    const rowCount = await rows.count();

    // STEP 7: Read and compare flight prices
    for (let i = 0; i < rowCount; i++) {

        const cells = await rows.nth(i)
            .locator("td")
            .allInnerTexts();

        const priceText = cells[priceIndex];

        const price = Number(
            priceText.replace(/[^0-9.]/g, "")
        );

        if (!Number.isFinite(price) || priceText.trim() === "") {
            throw new Error(`Invalid price in row ${i}: ${priceText}`);
        }

        console.log(`Flight ${i + 1}: ${price}`);

        // STEP 8: Update cheapest flight
        if (price < cheapestPrice) {
            cheapestPrice = price;
            cheapestRowIndex = i;
        }
    }

    // STEP 9: Verify cheapest flight was found
    expect(cheapestRowIndex).toBeGreaterThanOrEqual(0);

    console.log("Cheapest Price:", cheapestPrice);
    console.log("Cheapest Row Index:", cheapestRowIndex);

    // STEP 10: Select the cheapest flight
    const cheapestRow = rows.nth(cheapestRowIndex);

    await cheapestRow.getByRole("button", {
        name: /book|select/i
    }).click();

    const passengername = page.locator("#flight-passenger-name")
    await passengername.fill("Anvitha Yerramsetty")
    const email = page.locator("#flight-passenger-email")
    await email.fill("anvithayerramsetty@gmail.com")

    const purchasebtn = page.getByRole("button", { name: "Purchase" })
    await purchasebtn.click()

    //Assertion
    await expect(page.locator("#flight-success-banner")).toBeVisible()
    await expect(page.getByText("✓ Booking Confirmed!")).toBeVisible()
    console.log("Anvitha Yerramsetty (anvithayerramsetty@gmail.com) — Air India — $811Booking Reference: BK26XG50")



    // STEP 11: Inspect passenger booking form

});


test("Alerts and Popups", async ({ page }) => {
    await page.goto(
        "https://www.playwrightautomation.com/practice.html#section-alerts"
    );

    page.on("dialog", async (dialog) => {
        console.log(dialog.message());
        await dialog.accept()
    })


    await page.getByRole("button", {
        name: "Simple Alert",
        exact: true
    }).click();


});
test("Handle Confirmation Alert", async ({ page }) => {
    await page.goto(
        "https://www.playwrightautomation.com/practice.html#section-alerts"
    );

    // Register the listener before clicking
    page.once("dialog", async (dialog) => {

        // Verify the dialog type
        expect(dialog.type()).toBe("confirm");

        // Verify the dialog message
        expect(dialog.message()).toBe("Press a button!");

        // Click Cancel
        await dialog.dismiss();
    });

    // Trigger the confirmation dialog
    await page.getByRole("button", {
        name: "Confirmation Alert",
        exact: true
    }).click();

});

test("Prompt Alert", async ({ page }) => {
    await page.goto("https://www.playwrightautomation.com/practice.html#section-alerts")

    // Register the listener before clicking
    page.on("dialog", async (dialog) => {
        //Assertion
        expect(dialog).toBe("Prompt Alert")

        //verify message

        expect(dialog.message()).toBe("Please enter your name:")

        await dialog.accept("Anvitha");

        // trigger prompt alert 
        await page.getByRole("button", { name: "Prompt Alert", exact: true }).click()


    });

});

test("Verify hover dropdown", async ({ page }) => {
    await page.goto("https://www.playwrightautomation.com/practice.html");

    const pointme = page.getByRole("button", { name: "Point Me" })

    await pointme.hover()
    const mobiles = page.getByTestId("hover-item-mobiles")
    await expect(mobiles).toBeVisible()

    await page.getByRole("button", { name: 'Right Click Me' }).click({ button: "right" })


});


test("verify dblclick copy", async ({ page }) => {
    await page.goto("https://www.playwrightautomation.com/practice.html")

    const source = page.getByRole("textbox", { name: "Field 1 (source)" })
    const target = page.getByRole("textbox", { name: "Field 2 (target)" })
    const copybutton = page.getByRole("button", { name: "Copy Text" })

    const sourcevalue = await source.inputValue()
    expect(target).toHaveValue(sourcevalue)
    await copybutton.dblclick();

});

test("drap and drop", async ({ page }) => {
    await page.goto("https://www.playwrightautomation.com/practice.html")
    const rome = page.locator("#drag-rome")
    const italy = page.locator("#drop-italy")
    const Washinggton = page.locator("#drag-washington")
    const USA = page.locator("#drop-usa")
    const Paris = page.locator("#drag-paris")
    const France = page.locator("#drop-france")


    await rome.dragTo(italy)
    await Washinggton.dragTo(USA)
    await Paris.dragTo(France)

})







test("Verify single and dual price sliders", async ({ page }) => {

    // STEP 1: Navigate to the practice page
    await page.goto(
        "https://www.playwrightautomation.com/practice.html"
    );

    // STEP 2: Open Mouse Actions section
    // This avoids clicking a hidden sidebar link.
    await page.goto(
        "https://www.playwrightautomation.com/practice.html#section-mouse"
    );

    await expect(
        page.getByText("Single Value Slider", { exact: true })
    ).toBeVisible();

    // STEP 3: SINGLE VALUE SLIDER

    const priceSlider = page.getByTestId("slider-price");
    const sliderValue = page.locator("#slider-value");

    await expect(priceSlider).toBeVisible();

    // Read the maximum value dynamically
    const maxValue = await priceSlider.getAttribute("max");
    expect(maxValue).not.toBeNull();

    await priceSlider.focus();
    await priceSlider.press("End");

    // Verify slider reached its maximum
    await expect(priceSlider).toHaveValue(maxValue!);

    console.log(
        "Single slider value:",
        await priceSlider.inputValue()
    );

    // Verify displayed value
    await expect(sliderValue).toContainText(maxValue!);


    // STEP 4: DUAL PRICE SLIDER

    const minPriceSlider = page.locator("#slider-price-min");
    const maxPriceSlider = page.locator("#slider-price-max");
    const dualSliderDisplay = page.locator("#dual-price-display");

    await expect(minPriceSlider).toBeVisible();
    await expect(maxPriceSlider).toBeVisible();

    // Capture initial values
    const initialMin = Number(await minPriceSlider.inputValue());
    const initialMax = Number(await maxPriceSlider.inputValue());

    console.log("Initial minimum:", initialMin);
    console.log("Initial maximum:", initialMax);

    // STEP 5: Increase minimum price

    await minPriceSlider.focus();
    await minPriceSlider.press("ArrowRight");

    const updatedMin = Number(await minPriceSlider.inputValue());

    expect(updatedMin).toBeGreaterThan(initialMin);

    // STEP 6: Decrease maximum price

    await maxPriceSlider.focus();
    await maxPriceSlider.press("ArrowLeft");

    const updatedMax = Number(await maxPriceSlider.inputValue());

    expect(updatedMax).toBeLessThan(initialMax);

    // STEP 7: Verify minimum <= maximum
    expect(updatedMin).toBeLessThanOrEqual(updatedMax);

    // STEP 8: Verify the displayed price range
    // await expect(dualSliderDisplay).toContainText(
    //    `$${updatedMin}`
    //  );

    await expect(dualSliderDisplay).toContainText(
        String(updatedMax)
    );

    console.log("Updated minimum:", updatedMin);
    console.log("Updated maximum:", updatedMax);
    console.log(
        "Displayed range:",
        await dualSliderDisplay.innerText()
    );

});


test("Verify complete keyboard mission", async ({ page }) => {

    // Navigate to the practice page
    await page.goto(
        "https://www.playwrightautomation.com/practice.html"
    );

    // Open Keyboard Actions through the sidebar
    await page.getByText("Dialogs & Interactions", {
        exact: true
    }).first().click();

    await page.getByText("Keyboard Actions", {
        exact: true
    }).click();

    // STEP 1: SELECT DEPARTMENT

    const qa = page.getByTestId("keyboard-option-qa");
    const automation = page.getByTestId("keyboard-option-automation");

    const departmentProgress = page.locator(
        "#keyboard-progress-department"
    );

    await expect(qa).toBeVisible();
    await expect(automation).toBeVisible();

    // Click QA to establish the selector's active state
    await qa.click();

    // Navigate to Automation using the keyboard
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    // Check the actual selection
    const selectedDepartment = page.getByText(
        "Selected Department:",
        { exact: false }
    ).first();

    console.log(
        "Selected department:",
        await selectedDepartment.innerText()
    );

    await expect(selectedDepartment).toContainText("Automation");

    // Verify department progress is complete
    await expect(departmentProgress).not.toHaveText("☐");


    // STEP 2: SECRET KEY CHALLENGE

    const secretKey = page.locator("#keyboard-secret-input");

    await secretKey.pressSequentially("PLAYWRIGHT");

    await expect(secretKey).toHaveValue("PLAYWRIGHT");


    // STEP 3: COPY / PASTE CHALLENGE

    const source = page.locator("#keyboard-copy-source");
    const destination = page.locator("#keyboard-copy-destination");

    const expectedText = await source.inputValue();

    await source.focus();

    await page.keyboard.press("ControlOrMeta+A");
    await page.keyboard.press("ControlOrMeta+C");

    await page.keyboard.press("Tab");

    // Confirm Tab moved focus to the destination
    await expect(destination).toBeFocused();

    await page.keyboard.press("ControlOrMeta+V");

    await expect(destination).toHaveValue(expectedText);


    // STEP 4: GENERATE SUMMARY

    const generateSummary = page.getByRole("button", {
        name: "Generate Summary"
    });

    await expect(generateSummary).toBeEnabled();

    await generateSummary.click();

    // Verify all challenges are complete
    await expect(
        page.getByText("All Keyboard Challenges Completed")
    ).toBeVisible();


    // Scroll

    // Locate the scrollable employee directory
    // Find the employee directory card using its heading

    // Locate the actual employee row
    const employee = page
        .getByTestId("employee-item")
        .filter({ hasText: "EMP-125" });

    // Verify exactly one employee row matches
    await expect(employee).toHaveCount(1);

    // Scroll to EMP-125
    await employee.scrollIntoViewIfNeeded();

    // Verify employee is inside the viewport
    await expect(employee).toBeInViewport();

    // Click EMP-125
    await employee.click();

    // Verify the selected employee changed
    await expect(
        page.getByText("Selected Employee:", { exact: false })
    ).toContainText("EMP-125");


    const openInfiniteScrollBtn = page.locator(
        "#btn-open-infinite-scroll"
    );

    // Listen for the popup and click the button
    const [newTab] = await Promise.all([
        page.waitForEvent("popup"),
        openInfiniteScrollBtn.click()
    ]);

    // Verify the new tab's URL
    await expect(newTab).toHaveURL("https://www.playwrightautomation.com/infinite-scroll.html")

    await expect(newTab.locator('body')).toBeVisible()
    await page.bringToFront()
    const dynamicstratbtn = page.getByRole("button", { name: "Start" }).first()
    await dynamicstratbtn.click()
    await page.waitForTimeout(3000)
    await expect(page.locator("#btn-dynamic")).toBeVisible()


    // Locate the START button
    const startBtn = page.getByRole("button", {
        name: "START",
        exact: true
    });

    // Verify initial state
    await expect(startBtn).toBeVisible();
    await expect(startBtn).toBeEnabled();

    // Click START
    await startBtn.click();

    // Verify STOP appears
    const stopBtn = page.getByRole("button", {
        name: "STOP",
        exact: true
    });

    await expect(stopBtn).toBeVisible();
    await stopBtn.click();

    // Verify RESTART appears
    const restartBtn = page.getByRole("button", {
        name: "RESTART",
        exact: true
    });

    await expect(restartBtn).toBeVisible();
    await restartBtn.click()
    await expect(startBtn).toBeInViewport()

    //Browser Context, Tabs & Windows
    await page.getByRole("button", { name: "Open Playwright Docs" }).click()
    await expect(page).toHaveURL("https://www.playwrightautomation.com/practice.html#section-keyboard")

    // Open external window

    const openWindowButton = page.getByRole("button", {
        name: "Open Mobilewright Window"
    });

    await expect(openWindowButton).toBeVisible();

    // Start waiting before clicking
    const [popup] = await Promise.all([
        page.waitForEvent("popup"),
        openWindowButton.click()
    ]);

    // Wait for the popup to finish loading
    await popup.waitForLoadState();

    // Read the popup URL
    console.log("Popup URL:", popup.url());

    // Read its page title
    console.log("Popup title:", await popup.title());

    // Close only the popup
    await popup.close();

    // Verify original page is still open
    await expect(openWindowButton).toBeVisible();

    const OpenOneRandomTab = page.getByRole("button", { name: "Open One Random Tab" })
    await expect(OpenOneRandomTab).toBeVisible()
    const [newtab] = await Promise.all([
        page.waitForEvent("popup"),
        OpenOneRandomTab.click()
    ])

    await newtab.waitForLoadState()
});
test('Verify multiple tabs at once', async ({ page }) => {
    await page.goto(
        'https://www.playwrightautomation.com/practice.html#section-browser-context-handling'
    );

    const tabs: Page[] = [];
    const capture = (popup: Page) => tabs.push(popup);

    page.on('popup', capture);

    try {
        await page.getByRole('button', {
            name: 'Open Three Tabs at Once',
            exact: true,
        }).click();

        await expect.poll(() => tabs.length).toBe(3);

        await expect.poll(() =>
            tabs.map(tab =>
                new URL(tab.url()).hostname.replace(/^www\./, '')
            ).sort()
        ).toEqual([
            'docs.cypress.io',
            'selenium.dev',
            'webdriver.io',
        ].sort());
    } finally {
        page.off('popup', capture);

        await Promise.all(
            tabs.filter(tab => !tab.isClosed()).map(tab => tab.close())
        );
    }
});

// Module 7 
//Frames & Embedded Content
test("Verify framecount", async ({ page }) => {
    await page.goto("https://www.playwrightautomation.com/practice.html")
    await page.locator(".pp-nav-label").nth(6).click()
    await expect(page).toHaveURL("https://www.playwrightautomation.com/practice.html#section-frame-counting")
    const url = page.url()
    console.log("CurrentUrl", url)
    const dashboard = page.getByTestId("travel-dashboard")
    const frames = dashboard.locator("iframe")

    await expect(frames).toHaveCount(2)
    console.log("TotalCounts", await frames.count())


})
test.describe("Module 7 - Payment Gateway Frame", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(
            'https://www.playwrightautomation.com/practice.html#section-frame-single'
        );

        await expect(
            page.locator('#frame-payment-82')
        ).toBeVisible();
    });


    test("Verify approved payment", async ({ page }) => {

        // Step 1: Access payment iframe
        const paymentFrame = page.frameLocator("#frame-payment-82");

        // Step 2: Enter Dataset 1 details
        await paymentFrame.getByPlaceholder("Name on card")
            .fill("JOHN SMITH");

        await paymentFrame.getByPlaceholder("1234 5678 9012 3456")
            .fill("4111111111111111");

        await paymentFrame.getByPlaceholder("MM/YY")
            .fill("12/29");

        await paymentFrame.locator('input[type="password"]')
            .fill("123");

        // Step 3: Click Pay Now
        await paymentFrame.getByRole("button", {
            name: "Pay Now"
        }).click();

        // Step 4: Verify result on parent page
        await expect(
            page.getByText("Payment Status: Approved")
        ).toBeVisible();

        await expect(
            page.getByText("Balance: ₹1,25,000")
        ).toBeVisible();
    });


    test("Verify insufficient balance payment", async ({ page }) => {

        const paymentFrame = page.frameLocator("#frame-payment-82");

        // Dataset 2
        await paymentFrame.locator("#card-holder")
            .fill("ALEX JOHNSON");

        await paymentFrame.locator("#card-number")
            .fill("5555555555554444");

        await paymentFrame.locator("#expiry-date")
            .fill("08/28");

        await paymentFrame.locator("#cvv")
            .fill("456");

        await paymentFrame.getByRole("button", {
            name: "Pay Now"
        }).click();

        // Verify insufficient balance
        await expect(
            page.getByText("Payment Status: Insufficient Balance")
        ).toBeVisible();

        await expect(
            page.getByText("Balance: ₹120")
        ).toBeVisible();
    });
});


test("Verify nested frame interaction", async ({ page }) => {
    await page.goto(
        "https://www.playwrightautomation.com/practice.html"
    );

    // Parent iframe
    const feedbackFrame = page.frameLocator("#frame-feedback");

    // Enter details in the parent iframe
    await feedbackFrame.getByPlaceholder("Your name")
        .fill("Test User");

    await feedbackFrame.getByPlaceholder("email@example.com")
        .fill("test@example.com");

    // Find the nested iframe inside the parent iframe
    const childFrame = feedbackFrame.frameLocator("iframe");

    // Select travel preference
    await childFrame.getByRole("radio", {
        name: "Business"
    }).check();

    await expect(
        childFrame.getByRole("radio", { name: "Business" })
    ).toBeChecked();
});
test('Verify dynamic complaint frame', async ({ page }) => {
    await page.goto(
        'https://www.playwrightautomation.com/practice.html#section-frame-advanced'
    );

    await page.getByRole('button', {
        name: 'Load Complaint Form',
        exact: true,
    }).click();

    const complaintFrame = page.frameLocator('#frame-support');

    await expect(
        complaintFrame.locator('#complaint-phone')
    ).toBeVisible();
});

// Module  8
test('Verify Native HTML5 Date Inputs', async ({ page }) => {
    await page.goto(
        'https://www.playwrightautomation.com/practice.html#section-datepicker-native'
    );

    const dob = page.getByLabel('Date of Birth', { exact: true });
    const issuedDate = page.getByLabel('Passport Issued Date', {
        exact: true,
    });
    const expiryDate = page.getByLabel('Passport Expiry Date', {
        exact: true,
    });

    await dob.fill('2000-05-15');
    await expect(dob).toHaveValue('2000-05-15');

    await issuedDate.fill('2024-01-10');
    await expect(issuedDate).toHaveValue('2024-01-10');

    await expiryDate.fill('2030-01-10');
    await expiryDate.blur();
    await expect(expiryDate).toHaveValue('2030-01-10');

    await expect(page.locator('#dp-native-status')).toHaveAttribute(
        'data-invalid-count',
        '0'
    );
});

// Dropdown based data picker
test('Verify Dropdown-Based Datepicker', async ({ page }) => {
    await page.goto(
        'https://www.playwrightautomation.com/practice.html#section-datepicker-dropdown'
    );

    const month = page.locator('#dp-dd-month');
    const year = page.locator('#dp-dd-year');

    await month.selectOption({ label: 'June' });
    await year.selectOption({ label: '2026' });

    await page
        .locator('#dp-dd-cal [data-date="2026-06-15"]')
        .click();

    // June has value "5" because months are zero-based.
    await expect(month).toHaveValue('5');
    await expect(year).toHaveValue('2026');

    await expect(page.locator('#dp-dd-display')).toHaveText(
        '15 Jun 2026'
    );
});


test.describe('Module 8 - Dual Calendar', () => {
    const today = new Date('2026-11-04T00:00:00Z');

    function futureDate(days: number): string {
        const date = new Date(today);
        date.setUTCDate(date.getUTCDate() + days);
        return date.toISOString().slice(0, 10);
    }

    async function selectDate(page: Page, date: string) {
        const target = new Date(`${date}T00:00:00Z`);

        const targetMonth = target.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        });

        const monthLabel = page.locator('#dp-bk-month-left');

        // Dates in these scenarios are today or later.
        // Navigate until the target month is in the left panel.
        for (let attempt = 0; attempt < 24; attempt++) {
            const currentMonth = (await monthLabel.innerText()).trim();

            if (currentMonth === targetMonth) {
                await page
                    .getByTestId('dp-bk-cal-left')
                    .locator(`[data-date="${date}"]`)
                    .click();

                return;
            }

            await page.locator('#dp-bk-next').click();
            await expect(monthLabel).not.toHaveText(currentMonth);
        }

        throw new Error(`Could not navigate to ${targetMonth}`);
    }

    test.beforeEach(async ({ page }) => {
        // Fix today's date before the application builds its calendar.
        await page.clock.setFixedTime(today);

        await page.goto(
            'https://www.playwrightautomation.com/practice.html#section-datepicker-booking'
        );

        // One combined trigger opens both check-in/check-out calendars.
        await page.locator('#dp-bk-checkin-field').click();
        await expect(page.locator('#dp-bk-popup')).toBeVisible();
    });

    test('Verify valid 3-night booking', async ({ page }) => {
        const checkIn = futureDate(5);
        const checkOut = futureDate(8);

        await selectDate(page, checkIn);
        await selectDate(page, checkOut);

        await expect(page.locator('#dp-bk-message')).toHaveAttribute(
            'data-bk-state',
            'valid'
        );

        await expect(page.locator('#dp-bk-in-display')).toHaveText(
            '9 Nov 2026'
        );

        await expect(page.locator('#dp-bk-out-display')).toHaveText(
            '12 Nov 2026'
        );

        await expect(page.locator('#dp-bk-nights')).toHaveText(
            '3 Nights'
        );

        await expect(page.locator('#dp-bk-summary')).toBeVisible();
    });

    test('Verify 1-night booking is rejected', async ({ page }) => {
        await selectDate(page, futureDate(5));

        const checkout = page.locator('#dp-bk-checkout-val');
        const previousValue = await checkout.innerText();

        await selectDate(page, futureDate(6));

        await expect(page.locator('#dp-bk-message')).toHaveAttribute(
            'data-bk-state',
            'too-short'
        );

        await expect(page.locator('#dp-bk-message')).toHaveText(
            'Minimum stay is 2 nights.'
        );

        await expect(checkout).toHaveText(previousValue);
        await expect(page.locator('#dp-bk-summary')).toBeHidden();
    });

    test('Verify booking over 30 days is rejected', async ({ page }) => {
        await selectDate(page, futureDate(5));

        const checkout = page.locator('#dp-bk-checkout-val');
        const previousValue = await checkout.innerText();

        // Offset 36 minus offset 5 = 31 nights.
        await selectDate(page, futureDate(36));

        await expect(page.locator('#dp-bk-message')).toHaveAttribute(
            'data-bk-state',
            'too-long'
        );

        await expect(page.locator('#dp-bk-message')).toHaveText(
            'Maximum booking duration is 30 days.'
        );

        await expect(checkout).toHaveText(previousValue);
        await expect(page.locator('#dp-bk-summary')).toBeHidden();
        await page.pause()
    });
});











//Dopwnload files
//test("Verify file download", async ({ page }) => {
//  await page.goto("https://www.playwrightautomation.com/practice.html");
//const downloadButtons = page.getByRole("button", {
//  name: "Download",
// exact: true
//});

//onsole.log("Download buttons found:", await downloadButtons.count());
//  const [download] = await Promise.all([
//     page.waitForEvent("download"),
//   page.getByRole("button", {
//        name: "Download",
//        exact: true
//   }).first().click()
// ]);

//expect(download.suggestedFilename()).toBe("genxevo-logo.svg");
