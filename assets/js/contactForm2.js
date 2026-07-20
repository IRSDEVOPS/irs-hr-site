document.addEventListener("DOMContentLoaded", function () {

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

            form.reset();

            // Show Tailwind modal
            if (modal) {
                modal.classList.remove("hidden");
                modal.classList.add("flex");
            } else {
                alert("Form submitted successfully.");
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            isSubmittingLeadForm = false;

            submitBtn.disabled = false;
            submitBtn.innerText = "Submit";
            submitBtn.style.opacity = "1";
        }
    });

    window.closeModal = function () {
        modal.classList.remove("flex");
        modal.classList.add("hidden");
    };

});

lucide.createIcons();