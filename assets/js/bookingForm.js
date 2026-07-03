
        lucide.createIcons();

        function closeModal() {
            document.getElementById('successModal').classList.add('hidden');
        }

        document.addEventListener("DOMContentLoaded", function () {
            const AVAILABILITY_API_URL = "https://script.google.com/macros/s/AKfycbxnMbWdAZsp0RpOvYNlhQqGnUNnYfkfxOoqMRJYysvY8Q2pIJBOG5BVq4j9cLTlC7_ygw/exec";

            let availabilityRules = {
                blockedDates: [],
                blockedTimeRanges: []
            };

            let isSubmittingLeadForm = false;

            const dateInput = document.querySelector('input[name="date"]');
            const timeInput = document.getElementById("timePicker");
            const form = document.getElementById("leadForm");
            const submitBtn = document.getElementById("submitLeadBtn");
            const modal = document.getElementById("successModal");

            if (!form || !dateInput || !timeInput || !submitBtn) {
                console.error("Required form elements not found.");
                return;
            }

            function getMinBookingDateTime() {
                return new Date(Date.now() + 2 * 60 * 60 * 1000);
            }

            function formatDateYMD(date) {
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, "0");
                const dd = String(date.getDate()).padStart(2, "0");
                return `${yyyy}-${mm}-${dd}`;
            }

            function parse12hToMinutes(timeStr) {
                if (!timeStr) return null;

                const parts = timeStr.trim().split(" ");
                if (parts.length !== 2) return null;

                const [timePart, meridiemRaw] = parts;
                let [hours, minutes] = timePart.split(":").map(Number);
                const meridiem = meridiemRaw.toUpperCase();

                if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

                if (meridiem === "PM" && hours !== 12) hours += 12;
                if (meridiem === "AM" && hours === 12) hours = 0;

                return hours * 60 + minutes;
            }

            function getMinutesFromHHMM(hhmm) {
                const [h, m] = hhmm.split(":").map(Number);
                return h * 60 + m;
            }

            function isDateFullyBlocked(dateStr) {
                return availabilityRules.blockedDates.includes(dateStr);
            }

            function getBlockedRangesForDate(dateStr) {
                return availabilityRules.blockedTimeRanges.filter(item => item.date === dateStr);
            }

            function isTimeBlocked(dateStr, mins) {
                const ranges = getBlockedRangesForDate(dateStr);

                return ranges.some(range => {
                    const startMins = getMinutesFromHHMM(range.start);
                    const endMins = getMinutesFromHHMM(range.end);
                    return mins >= startMins && mins < endMins;
                });
            }

            async function loadAvailabilityRules() {
                try {
                    const response = await fetch(AVAILABILITY_API_URL);

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }

                    const result = await response.json();

                    availabilityRules = {
                        blockedDates: Array.isArray(result.blockedDates) ? result.blockedDates : [],
                        blockedTimeRanges: Array.isArray(result.blockedTimeRanges) ? result.blockedTimeRanges : []
                    };
                } catch (error) {
                    console.error("Failed to load availability rules:", error);
                    availabilityRules = {
                        blockedDates: [],
                        blockedTimeRanges: []
                    };
                }
            }

            const timePicker = flatpickr("#timePicker", {
                enableTime: true,
                noCalendar: true,
                dateFormat: "h:i K",
                time_24hr: false,
                minuteIncrement: 30,
                defaultHour: 9,
                defaultMinute: 0,
                minTime: "00:00",
                maxTime: "23:59",
                allowInput: false
            });

            timeInput.addEventListener("change", function () {
                const dateVal = dateInput.value;
                const timeVal = timeInput.value;

                if (!dateVal || !timeVal) return;

                const mins = parse12hToMinutes(timeVal);
                if (mins === null) return;

                if (isTimeBlocked(dateVal, mins)) {
                    alert("Demo is unavailable for the selected time - Please select another time");
                    timePicker.clear();
                }
            });

            timeInput.addEventListener("input", function () {
                if (!timeInput.value) {
                    timePicker.clear();
                }

                // if (!timeInput.value || timeInput.value.trim() === "") {
                //     alert("Time is required");
                //     return;
                // }
                // timeInput.addEventListener("blur", function () {
                //     if (!timeInput.value || timeInput.value.trim() === "") {
                //         //alert("Time is required");
                //         timeInput.classList.add("border-red-500");
                //     }
                // });
            });

            

            function updateMinDate() {
                const minBooking = getMinBookingDateTime();
                dateInput.min = formatDateYMD(minBooking);
            }

            function updateTimeRules() {
                const minBooking = getMinBookingDateTime();
                const selectedDateStr = dateInput.value;

                if (!selectedDateStr) {
                    timePicker.set("minTime", "00:00");
                    timePicker.set("maxTime", "23:59");
                    timePicker.clear();
                    return;
                }

                if (isDateFullyBlocked(selectedDateStr)) {
                    alert("This date is unavailable. Please choose another date.");
                    dateInput.value = "";
                    timePicker.clear();
                    return;
                }

                const minBookingDateStr = formatDateYMD(minBooking);
                let minTimeForPicker = "00:00";

                if (selectedDateStr === minBookingDateStr) {
                    const hh = String(minBooking.getHours()).padStart(2, "0");
                    const mm = String(minBooking.getMinutes()).padStart(2, "0");
                    minTimeForPicker = `${hh}:${mm}`;
                }

                timePicker.set("minTime", minTimeForPicker);
                timePicker.set("maxTime", "23:59");

                const selectedTime = timeInput.value;
                if (selectedTime) {
                    const selectedMinutes = parse12hToMinutes(selectedTime);

                    const invalidBecauseTooEarly =
                        selectedMinutes === null ||
                        selectedMinutes < getMinutesFromHHMM(minTimeForPicker);

                    const invalidBecauseBlocked =
                        selectedMinutes !== null &&
                        isTimeBlocked(selectedDateStr, selectedMinutes);

                    if (invalidBecauseTooEarly || invalidBecauseBlocked) {
                        timePicker.clear();
                    }
                }
            }

            async function initializeBookingFormRules() {
                await loadAvailabilityRules();
                updateMinDate();
                updateTimeRules();
            }

            dateInput.addEventListener("change", function () {
                updateMinDate();
                updateTimeRules();
            });

            window.addEventListener("focus", async function () {
                await loadAvailabilityRules();
                updateMinDate();
                updateTimeRules();
            });

            form.addEventListener("submit", async function (e) {
                e.preventDefault();

                if (isSubmittingLeadForm) return;

                await loadAvailabilityRules();

                const minBooking = getMinBookingDateTime();
                const dateVal = dateInput.value;
                const timeVal = timeInput.value;

                if (!dateVal || !timeVal) {
                    alert("Please choose both date and time.");
                    return;
                }

                const mins = parse12hToMinutes(timeVal);

                if (mins === null) {
                    alert("Please choose a valid time.");
                    return;
                }

                const hh = String(Math.floor(mins / 60)).padStart(2, "0");
                const mm = String(mins % 60).padStart(2, "0");

                const selectedDateTime = new Date(`${dateVal}T${hh}:${mm}:00`);

                if (selectedDateTime < minBooking) {
                    alert("Please choose a date and time at least 2 hours from now.");
                    return;
                }

                if (isDateFullyBlocked(dateVal)) {
                    alert("This date is unavailable. Please choose another date.");
                    return;
                }

                if (isTimeBlocked(dateVal, mins)) {
                    alert("This time slot is unavailable. Please choose another time.");
                    return;
                }

                isSubmittingLeadForm = true;

                submitBtn.disabled = true;
                submitBtn.innerText = "Processing...";
                submitBtn.style.opacity = "0.7";

                const formData = new FormData(form);

                try {
                    await fetch(form.action, {
                        method: "POST",
                        body: formData,
                        mode: "no-cors"
                    });

                    for (let [key, value] of formData.entries()) {
                        console.log(key, value);
                    }

                    form.reset();
                    timePicker.clear();
                    updateMinDate();
                    updateTimeRules();

                    if (modal) {
                        modal.classList.remove("hidden");
                    } else {
                        alert("Form submitted successfully.");
                    }
                } catch (error) {
                    console.error("Error!", error.message);
                    alert("Something went wrong. Please try again.");
                } finally {
                    isSubmittingLeadForm = false;
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Secure My Priority Demo Slot";
                    submitBtn.style.opacity = "1";
                }
            });

            window.closeModal = function () {
                const modalEl = document.getElementById("successModal");
                if (modalEl) modalEl.classList.add("hidden");
            };

            initializeBookingFormRules();
        });