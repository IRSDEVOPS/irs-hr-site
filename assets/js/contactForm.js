

        // function closeModal() {
        //     const successmodal2 = new bootstrap.Modal(document.getElementById("successModal"));
        //                 successmodal2.hide();
        // }

        document.addEventListener("DOMContentLoaded", function () {
            const AVAILABILITY_API_URL = "https://script.google.com/macros/s/AKfycbxdsEmGPtPZiSKmuIe6HhOfXWZgcGnDM_mXsSz27cwyZF8_LNzBOmid0ZjFK7KVOW75fw/exec";

            
            let isSubmittingLeadForm = false;

            const form = document.getElementById("leadForm");
            const submitBtn = document.getElementById("submitLeadBtn");
            const modal = document.getElementById("successModal");

          

            form.addEventListener("submit", async function (e) {
                e.preventDefault();

                if (isSubmittingLeadForm) return;

           
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

                    if (modal) {
                        modal.classList.remove("hidden");
                        const successmodal2 = new bootstrap.Modal(document.getElementById("successModal"));
                        successmodal2.show();
                    } else {
                        alert("Form submitted successfully.");
                    }
                } catch (error) {
                    console.error("Error!", error.message);
                    alert("Something went wrong. Please try again.");
                } finally {
                    isSubmittingLeadForm = false;
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Submit";
                    submitBtn.style.opacity = "1";
                }
            });

            window.closeModal = function () {
                const modalEl = document.getElementById("successModal");


                const successmodal2 = new bootstrap.Modal(document.getElementById("successModal"));
                successmodal2.hide();
            };

        });

        
        lucide.createIcons();