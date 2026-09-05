// ==================================================
// MYHEALTHBOX - SCRIPT.JS
// ==================================================



// ==================================================
// HEALTH FUNCTIONS
// ==================================================


function saveHealthData() {

    const fullName =
        document.getElementById("fullName").value.trim();

    const age =
        document.getElementById("age").value.trim();

    const bloodGroup =
        document.getElementById("bloodGroup").value;

    const allergies =
        document.getElementById("allergies").value.trim();

    const emergencyContact =
        document.getElementById("emergencyContact").value.trim();


    if (
        fullName === "" ||
        age === "" ||
        bloodGroup === ""
    ) {

        alert(
            "Please fill in Name, Age and Blood Group."
        );

        return;
    }


    const healthData = {

        fullName: fullName,

        age: age,

        bloodGroup: bloodGroup,

        allergies: allergies,

        emergencyContact: emergencyContact

    };


    localStorage.setItem(
        "myHealthData",
        JSON.stringify(healthData)
    );


    updateHealthSummary(healthData);


    alert(
        "✅ Health information saved successfully!"
    );

}



function updateHealthSummary(healthData) {

    const summaryName =
        document.getElementById("summaryName");

    const summaryAge =
        document.getElementById("summaryAge");

    const summaryBloodGroup =
        document.getElementById("summaryBloodGroup");

    const summaryAllergies =
        document.getElementById("summaryAllergies");

    const summaryEmergency =
        document.getElementById("summaryEmergency");


    if (summaryName) {

        summaryName.textContent =
            healthData.fullName;

    }


    if (summaryAge) {

        summaryAge.textContent =
            healthData.age;

    }


    if (summaryBloodGroup) {

        summaryBloodGroup.textContent =
            healthData.bloodGroup;

    }


    if (summaryAllergies) {

        summaryAllergies.textContent =
            healthData.allergies || "None";

    }


    if (summaryEmergency) {

        summaryEmergency.textContent =
            healthData.emergencyContact || "Not Added";

    }

}



function loadHealthData() {

    const savedData =
        localStorage.getItem("myHealthData");


    if (!savedData) {
        return;
    }


    const healthData =
        JSON.parse(savedData);


    const fullName =
        document.getElementById("fullName");

    const age =
        document.getElementById("age");

    const bloodGroup =
        document.getElementById("bloodGroup");

    const allergies =
        document.getElementById("allergies");

    const emergencyContact =
        document.getElementById("emergencyContact");


    if (fullName) {

        fullName.value =
            healthData.fullName;

    }


    if (age) {

        age.value =
            healthData.age;

    }


    if (bloodGroup) {

        bloodGroup.value =
            healthData.bloodGroup;

    }


    if (allergies) {

        allergies.value =
            healthData.allergies;

    }


    if (emergencyContact) {

        emergencyContact.value =
            healthData.emergencyContact;

    }


    updateHealthSummary(healthData);

}



function enableHealthEdit() {

    const inputs =
        document.querySelectorAll(
            "#healthForm input, #healthForm select, #healthForm textarea"
        );


    inputs.forEach(function(input) {

        input.disabled = false;

    });

}



// ==================================================
// MEDICAL REPORT FUNCTIONS
// ==================================================


function addReport() {

    const reportName =
        document.getElementById("reportName").value.trim();

    const reportDate =
        document.getElementById("reportDate").value;

    const hospitalName =
        document.getElementById("hospitalName").value.trim();

    const reportNotes =
        document.getElementById("reportNotes").value.trim();


    if (
        reportName === "" ||
        reportDate === "" ||
        hospitalName === ""
    ) {

        alert(
            "Please fill in Report Name, Report Date and Hospital / Lab."
        );

        return;
    }


    const report = {

        id: Date.now(),

        reportName: reportName,

        reportDate: reportDate,

        hospitalName: hospitalName,

        reportNotes: reportNotes

    };


    let reports =
        JSON.parse(
            localStorage.getItem("medicalReports")
        ) || [];


    reports.push(report);


    localStorage.setItem(
        "medicalReports",
        JSON.stringify(reports)
    );


    document.getElementById("reportName").value = "";

    document.getElementById("reportDate").value = "";

    document.getElementById("hospitalName").value = "";

    document.getElementById("reportNotes").value = "";


    displayReports();


    alert(
        "✅ Medical report added successfully!"
    );

}



function displayReports() {

    const container =
        document.getElementById("reportsContainer");


    if (!container) {
        return;
    }


    const reports =
        JSON.parse(
            localStorage.getItem("medicalReports")
        ) || [];


    container.innerHTML = "";


    if (reports.length === 0) {

        container.innerHTML = `
            <p class="no-data">
                🧪 No medical reports added yet.
            </p>
        `;

        return;
    }


    reports.forEach(function(report) {

        const item =
            document.createElement("div");


        item.className =
            "report-item";


        item.innerHTML = `

            <div class="report-info">

                <h3>
                    🧪 ${report.reportName}
                </h3>

                <p>
                    <strong>Date:</strong>
                    ${report.reportDate}
                </p>

                <p>
                    <strong>Hospital / Lab:</strong>
                    ${report.hospitalName}
                </p>

                ${
                    report.reportNotes
                    ?
                    `<p>
                        <strong>Notes:</strong>
                        ${report.reportNotes}
                    </p>`
                    :
                    ""
                }

            </div>


            <div class="report-actions">

                <button
                    type="button"
                    class="delete-btn"
                    onclick="deleteReport(${report.id})"
                >
                    🗑️ Delete
                </button>

            </div>

        `;


        container.appendChild(item);

    });

}



function deleteReport(id) {

    let reports =
        JSON.parse(
            localStorage.getItem("medicalReports")
        ) || [];


    reports =
        reports.filter(function(report) {

            return report.id !== id;

        });


    localStorage.setItem(
        "medicalReports",
        JSON.stringify(reports)
    );


    displayReports();


    alert(
        "🗑️ Medical report deleted successfully!"
    );

}



// ==================================================
// MEDICINE FUNCTIONS
// ==================================================


function addMedicine() {

    const medicineName =
        document.getElementById("medicineName").value.trim();

    const dosage =
        document.getElementById("dosage").value.trim();

    const medicineTime =
        document.getElementById("medicineTime").value;

    const startDate =
        document.getElementById("startDate").value;

    const endDate =
        document.getElementById("endDate").value;


    if (
        medicineName === "" ||
        dosage === "" ||
        medicineTime === "" ||
        startDate === "" ||
        endDate === ""
    ) {

        alert(
            "Please fill in all medicine details."
        );

        return;
    }


    if (endDate < startDate) {

        alert(
            "End Date cannot be before Start Date."
        );

        return;
    }


    const medicine = {

        id: Date.now(),

        medicineName: medicineName,

        dosage: dosage,

        medicineTime: medicineTime,

        startDate: startDate,

        endDate: endDate

    };


    let medicines =
        JSON.parse(
            localStorage.getItem("medicines")
        ) || [];


    medicines.push(medicine);


    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );


    clearMedicineForm();


    displayMedicines();


    updateDashboard();


    alert(
        "✅ Medicine added successfully!"
    );

}



function displayMedicines() {

    const container =
        document.getElementById(
            "medicinesContainer"
        );


    if (!container) {
        return;
    }


    const medicines =
        JSON.parse(
            localStorage.getItem("medicines")
        ) || [];


    container.innerHTML = "";


    if (medicines.length === 0) {

        container.innerHTML = `
            <p class="no-data">
                💊 No medicines added yet.
            </p>
        `;

        return;
    }


    medicines.forEach(function(medicine) {

        const item =
            document.createElement("div");


        item.className =
            "medicine-item";


        item.innerHTML = `

            <div class="medicine-info">

                <h3>
                    💊 ${medicine.medicineName}
                </h3>

                <p>
                    <strong>Dosage:</strong>
                    ${medicine.dosage}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${medicine.medicineTime}
                </p>

                <p>
                    <strong>Start Date:</strong>
                    ${medicine.startDate}
                </p>

                <p>
                    <strong>End Date:</strong>
                    ${medicine.endDate}
                </p>

            </div>


            <div class="medicine-actions">

                <button
                    type="button"
                    class="edit-btn"
                    onclick="editMedicine(${medicine.id})"
                >
                    ✏️ Edit
                </button>


                <button
                    type="button"
                    class="delete-btn"
                    onclick="deleteMedicine(${medicine.id})"
                >
                    🗑️ Delete
                </button>

            </div>

        `;


        container.appendChild(item);

    });

}



// ==================================================
// EDIT MEDICINE
// ==================================================


function editMedicine(id) {

    const medicines =
        JSON.parse(
            localStorage.getItem("medicines")
        ) || [];


    const medicine =
        medicines.find(function(item) {

            return item.id === id;

        });


    if (!medicine) {
        return;
    }


    document.getElementById(
        "medicineName"
    ).value =
        medicine.medicineName;


    document.getElementById(
        "dosage"
    ).value =
        medicine.dosage;


    document.getElementById(
        "medicineTime"
    ).value =
        medicine.medicineTime;


    document.getElementById(
        "startDate"
    ).value =
        medicine.startDate;


    document.getElementById(
        "endDate"
    ).value =
        medicine.endDate;


    const form =
        document.getElementById(
            "medicineForm"
        );


    form.dataset.editId =
        id;


    document.getElementById(
        "medicineSubmitBtn"
    ).textContent =
        "Update Medicine";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// ==================================================
// UPDATE MEDICINE
// ==================================================


function updateMedicine() {

    const form =
        document.getElementById(
            "medicineForm"
        );


    const editId =
        Number(form.dataset.editId);


    const medicineName =
        document.getElementById(
            "medicineName"
        ).value.trim();


    const dosage =
        document.getElementById(
            "dosage"
        ).value.trim();


    const medicineTime =
        document.getElementById(
            "medicineTime"
        ).value;


    const startDate =
        document.getElementById(
            "startDate"
        ).value;


    const endDate =
        document.getElementById(
            "endDate"
        ).value;


    if (
        medicineName === "" ||
        dosage === "" ||
        medicineTime === "" ||
        startDate === "" ||
        endDate === ""
    ) {

        alert(
            "Please fill in all medicine details."
        );

        return;
    }


    if (endDate < startDate) {

        alert(
            "End Date cannot be before Start Date."
        );

        return;
    }


    let medicines =
        JSON.parse(
            localStorage.getItem("medicines")
        ) || [];


    medicines =
        medicines.map(function(medicine) {

            if (medicine.id === editId) {

                return {

                    id: editId,

                    medicineName:
                        medicineName,

                    dosage:
                        dosage,

                    medicineTime:
                        medicineTime,

                    startDate:
                        startDate,

                    endDate:
                        endDate

                };

            }


            return medicine;

        });


    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );


    clearMedicineForm();


    form.removeAttribute(
        "data-edit-id"
    );


    document.getElementById(
        "medicineSubmitBtn"
    ).textContent =
        "Add Medicine";


    displayMedicines();


    updateDashboard();


    alert(
        "✅ Medicine updated successfully!"
    );

}



function clearMedicineForm() {

    document.getElementById(
        "medicineName"
    ).value = "";


    document.getElementById(
        "dosage"
    ).value = "";


    document.getElementById(
        "medicineTime"
    ).value = "";


    document.getElementById(
        "startDate"
    ).value = "";


    document.getElementById(
        "endDate"
    ).value = "";

}



// ==================================================
// DELETE MEDICINE
// ==================================================


function deleteMedicine(id) {

    let medicines =
        JSON.parse(
            localStorage.getItem("medicines")
        ) || [];


    medicines =
        medicines.filter(function(medicine) {

            return medicine.id !== id;

        });


    localStorage.setItem(
        "medicines",
        JSON.stringify(medicines)
    );


    displayMedicines();


    updateDashboard();


    alert(
        "🗑️ Medicine deleted successfully!"
    );

}



// ==================================================
// MEDICINE SUBMIT HANDLER
// ==================================================


function handleMedicineSubmit() {

    const form =
        document.getElementById(
            "medicineForm"
        );


    if (!form) {
        return;
    }


    if (form.dataset.editId) {

        updateMedicine();

    } else {

        addMedicine();

    }

}



// ==================================================
// REMINDER FUNCTIONS
// ==================================================


function addReminder() {

    const reminderTitle =
        document.getElementById(
            "reminderTitle"
        ).value.trim();


    const reminderType =
        document.getElementById(
            "reminderType"
        ).value;


    const reminderDate =
        document.getElementById(
            "reminderDate"
        ).value;


    const reminderTime =
        document.getElementById(
            "reminderTime"
        ).value;


    if (
        reminderTitle === "" ||
        reminderType === "" ||
        reminderDate === "" ||
        reminderTime === ""
    ) {

        alert(
            "Please fill in all reminder details."
        );

        return;
    }


    const reminder = {

        id: Date.now(),

        title:
            reminderTitle,

        type:
            reminderType,

        date:
            reminderDate,

        time:
            reminderTime

    };


    let reminders =
        JSON.parse(
            localStorage.getItem(
                "healthReminders"
            )
        ) || [];


    reminders.push(reminder);


    localStorage.setItem(
        "healthReminders",
        JSON.stringify(reminders)
    );


    clearReminderForm();


    displayReminders();


    updateDashboard();


    displayUpcomingReminders();


    alert(
        "✅ Reminder added successfully!"
    );

}



// ==================================================
// DISPLAY REMINDERS
// ==================================================


function displayReminders() {

    const container =
        document.getElementById(
            "remindersContainer"
        );


    if (!container) {
        return;
    }


    const reminders =
        JSON.parse(
            localStorage.getItem(
                "healthReminders"
            )
        ) || [];


    container.innerHTML = "";


    if (reminders.length === 0) {

        container.innerHTML = `
            <p class="no-data">
                🔔 No reminders added yet.
            </p>
        `;

        return;
    }


    reminders
        .sort(function(a, b) {

            const dateA =
                new Date(
                    a.date + "T" + a.time
                );

            const dateB =
                new Date(
                    b.date + "T" + b.time
                );

            return dateA - dateB;

        })
        .forEach(function(reminder) {

            const item =
                document.createElement("div");


            item.className =
                "reminder-item";


            item.innerHTML = `

                <div class="reminder-info">

                    <h3>
                        🔔 ${reminder.title}
                    </h3>

                    <p>
                        <strong>Type:</strong>
                        ${reminder.type}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${reminder.date}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ⏰ ${reminder.time}
                    </p>

                </div>


                <div class="reminder-actions">

                    <button
                        type="button"
                        class="edit-btn"
                        onclick="editReminder(${reminder.id})"
                    >
                        ✏️ Edit
                    </button>


                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteReminder(${reminder.id})"
                    >
                        🗑️ Delete
                    </button>

                </div>

            `;


            container.appendChild(item);

        });

}



// ==================================================
// EDIT REMINDER
// ==================================================


function editReminder(id) {

    const reminders =
        JSON.parse(
            localStorage.getItem(
                "healthReminders"
            )
        ) || [];


    const reminder =
        reminders.find(function(item) {

            return item.id === id;

        });


    if (!reminder) {
        return;
    }


    document.getElementById(
        "reminderTitle"
    ).value =
        reminder.title;


    document.getElementById(
        "reminderType"
    ).value =
        reminder.type;


    document.getElementById(
        "reminderDate"
    ).value =
        reminder.date;


    document.getElementById(
        "reminderTime"
    ).value =
        reminder.time;


    const form =
        document.getElementById(
            "reminderForm"
        );


    form.dataset.editId =
        id;


    document.getElementById(
        "reminderSubmitBtn"
    ).textContent =
        "Update Reminder";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// ==================================================
// UPDATE REMINDER
// ==================================================


function updateReminder() {

    const form =
        document.getElementById(
            "reminderForm"
        );


    const editId =
        Number(form.dataset.editId);


    const reminderTitle =
        document.getElementById(
            "reminderTitle"
        ).value.trim();


    const reminderType =
        document.getElementById(
            "reminderType"
        ).value;


    const reminderDate =
        document.getElementById(
            "reminderDate"
        ).value;


    const reminderTime =
        document.getElementById(
            "reminderTime"
        ).value;


    if (
        reminderTitle === "" ||
        reminderType === "" ||
        reminderDate === "" ||
        reminderTime === ""
    ) {

        alert(
            "Please fill in all reminder details."
        );

        return;
    }


    let reminders =
        JSON.parse(
            localStorage.getItem(
                "healthReminders"
            )
        ) || [];


    reminders =
        reminders.map(function(reminder) {

            if (reminder.id === editId) {

                return {

                    id: editId,

                    title:
                        reminderTitle,

                    type:
                        reminderType,

                    date:
                        reminderDate,

                    time:
                        reminderTime

                };

            }


            return reminder;

        });


    localStorage.setItem(
        "healthReminders",
        JSON.stringify(reminders)
    );


    clearReminderForm();


    form.removeAttribute(
        "data-edit-id"
    );


    document.getElementById(
        "reminderSubmitBtn"
    ).textContent =
        "Add Reminder";


    displayReminders();


    updateDashboard();


    displayUpcomingReminders();


    alert(
        "✅ Reminder updated successfully!"
    );

}



// ==================================================
// CLEAR REMINDER FORM
// ==================================================


function clearReminderForm() {

    document.getElementById(
        "reminderTitle"
    ).value = "";


    document.getElementById(
        "reminderType"
    ).value = "";


    document.getElementById(
        "reminderDate"
    ).value = "";


    document.getElementById(
        "reminderTime"
    ).value = "";

}



// ==================================================
// DELETE REMINDER
// ==================================================


function deleteReminder(id) {

    let reminders =
        JSON.parse(
            localStorage.getItem(
                "healthReminders"
            )
        ) || [];


    reminders =
        reminders.filter(function(reminder) {

            return reminder.id !== id;

        });


    localStorage.setItem(
        "healthReminders",
        JSON.stringify(reminders)
    );


    displayReminders();


    updateDashboard();


    displayUpcomingReminders();


    alert(
        "🗑️ Reminder deleted successfully!"
    );

}



// ==================================================
// REMINDER SUBMIT HANDLER
// ==================================================


function handleReminderSubmit() {

    const form =
        document.getElementById(
            "reminderForm"
        );


    if (!form) {
        return;
    }


    if (form.dataset.editId) {

        updateReminder();

    } else {

        addReminder();

    }

}



// ==================================================
// DASHBOARD
// ==================================================


function updateDashboard() {

    const healthStatus =
        document.getElementById(
            "healthStatus"
        );


    if (healthStatus) {

        const healthData =
            localStorage.getItem(
                "myHealthData"
            );


        if (healthData) {

            healthStatus.textContent =
                "Information Added";

        } else {

            healthStatus.textContent =
                "Not Added";

        }

    }



    const reportCount =
        document.getElementById(
            "reportCount"
        );


    if (reportCount) {

        const reports =
            JSON.parse(
                localStorage.getItem(
                    "medicalReports"
                )
            ) || [];


        reportCount.textContent =
            reports.length;

    }



    const medicineCount =
        document.getElementById(
            "medicineCount"
        );


    if (medicineCount) {

        const medicines =
            JSON.parse(
                localStorage.getItem(
                    "medicines"
                )
            ) || [];


        medicineCount.textContent =
            medicines.length;

    }



    const reminderCount =
        document.getElementById(
            "reminderCount"
        );


    if (reminderCount) {

        const reminders =
            JSON.parse(
                localStorage.getItem(
                    "healthReminders"
                )
            ) || [];


        reminderCount.textContent =
            reminders.length;

    }

}



// ==================================================
// UPCOMING REMINDERS
// ==================================================


function displayUpcomingReminders() {

    const container =
        document.getElementById(
            "upcomingRemindersContainer"
        );


    if (!container) {
        return;
    }


    const reminders =
        JSON.parse(
            localStorage.getItem(
                "healthReminders"
            )
        ) || [];


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const upcomingReminders =
        reminders

            .filter(function(reminder) {

                const reminderDate =
                    new Date(
                        reminder.date +
                        "T" +
                        reminder.time
                    );


                return reminderDate >= today;

            })


            .sort(function(a, b) {

                const dateA =
                    new Date(
                        a.date +
                        "T" +
                        a.time
                    );


                const dateB =
                    new Date(
                        b.date +
                        "T" +
                        b.time
                    );


                return dateA - dateB;

            })


            .slice(0, 3);



    container.innerHTML = "";



    if (
        upcomingReminders.length === 0
    ) {

        container.innerHTML = `

            <p class="no-upcoming-reminders">

                🔔 No upcoming reminders.

            </p>

        `;

        return;

    }



    upcomingReminders.forEach(
        function(reminder) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "upcoming-reminder-item";



            const formattedDate =
                new Date(
                    reminder.date +
                    "T00:00:00"
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",

                        month: "short",

                        year: "numeric"
                    }
                );



            item.innerHTML = `

                <div class="upcoming-reminder-left">

                    <div class="upcoming-reminder-icon">

                        🔔

                    </div>


                    <div>

                        <h3>

                            ${reminder.title}

                        </h3>


                        <p>

                            ${reminder.type}

                            • ${formattedDate}

                        </p>

                    </div>

                </div>



                <div class="upcoming-reminder-time">

                    ⏰ ${reminder.time}

                </div>

            `;


            container.appendChild(item);

        }
    );

}



// ==================================================
// PAGE LOAD
// ==================================================


window.addEventListener(
    "DOMContentLoaded",
    function() {

        loadHealthData();

        displayReports();

        displayMedicines();

        displayReminders();

        updateDashboard();

        displayUpcomingReminders();

    }
);