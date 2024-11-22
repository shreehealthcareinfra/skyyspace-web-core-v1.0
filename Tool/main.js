document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
    });



        const serviceButtons = document.querySelectorAll('.service-btn');
        const addonsContainer = document.getElementById('addons');
        const addonButtons = document.querySelectorAll('.addon-btn');
        let selectedService = null;

        serviceButtons.forEach(button => {
            button.addEventListener('click', () => {
                serviceButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                selectedService = button.dataset.service;
                
                // Show/hide addons based on selected service
                if (selectedService === '2d') {
                    addonsContainer.classList.add('visible');
                } else {
                    addonsContainer.classList.remove('visible');
                    // Reset addon selections when switching to 3D
                    addonButtons.forEach(btn => btn.classList.remove('active'));
                }
                
                calculatePrice();
            });
        });

        addonButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
                calculatePrice();
            });
        });

        function calculatePrice() {
            const length = parseFloat(document.getElementById('length').value) || 0;
            const breadth = parseFloat(document.getElementById('breadth').value) || 0;
            const area = length * breadth;
            let multiplier = 5; // Base multiplier for 2D designs
            let breakdownText = '';

            const resultElement = document.getElementById('result');
            
            if (length && breadth && selectedService) {
                if (selectedService === '2d') {
                    breakdownText = `<div class="price-breakdown">
                        <div class="breakdown-item">
                            <span>Base Rate (₹5/sq.ft)</span>
                            <span>×${multiplier}</span>
                        </div>`;

                    const activeAddons = document.querySelectorAll('.addon-btn.active');
                    activeAddons.forEach(addon => {
                        const factor = parseInt(addon.dataset.factor);
                        multiplier += factor;
                        breakdownText += `
                            <div class="breakdown-item">
                                <span>${addon.textContent}</span>
                                <span>+${factor}</span>
                            </div>`;
                    });

                    const price = area * multiplier;

                    breakdownText += `
                        <div class="breakdown-item">
                            <span>Total Multiplier</span>
                            <span>×${multiplier}</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Area</span>
                            <span>${area.toFixed(2)} sq ft</span>
                        </div>
                        <div class="final-price">
                            Final Quote: ₹${price.toFixed(3)}
                        </div>
                    </div>`;

                    resultElement.innerHTML = `
                        <div style="margin-bottom: 10px">
                            <strong>Selected Service:</strong> Floor Planning & 2D Designs
                        </div>
                        ${breakdownText}
                    `;
                } else {
                    const price = area * 10; // Base rate for 3D
                    resultElement.innerHTML = `
                        <div style="margin-bottom: 10px">
                            <strong>Selected Service:</strong> 3D Designs
                        </div>
                        <div style="margin-bottom: 10px">Area: ${area.toFixed(2)} sq ft</div>
                        <div style="font-size: 1.2em; font-weight: bold; color: #2d3748;">
                            Estimated Quote: ₹${price.toFixed(2)}
                        </div>
                    `;
                }
            } else {
                resultElement.textContent = 'Please select a service and enter dimensions';
            }
        }

        function resetForm() {
            document.getElementById('length').value = '';
            document.getElementById('breadth').value = '';
            document.getElementById('result').textContent = 'Your calculated quote will appear here';
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            addonButtons.forEach(btn => btn.classList.remove('active'));
            addonsContainer.classList.remove('visible');
            selectedService = null;
        }

        function sendToWhatsapp() {
            const result = document.getElementById('result').innerText;
            const message = result;
            navigator.clipboard.writeText(message).then(() => {
                alert('Message copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy message: ' + err);
            });
        }

        function bookCall() {
            alert('Redirecting to booking system...');
            // window.location. = 'https//www.youtube.com';
        }


