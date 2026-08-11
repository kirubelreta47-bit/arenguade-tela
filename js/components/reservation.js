/* ==========================================================================
   ARENGUADE TILA - RESERVATION FORM CONTROLLER
   ========================================================================== */

/**
 * Handles reservation submission async request
 * @param {Event} e Submit event
 */
async function handleReservationSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll('input, select, textarea');
  
  const reservationPayload = {
    name: inputs[0]?.value || '',
    phone: inputs[1]?.value || '',
    date: inputs[2]?.value || '',
    time: inputs[3]?.value || '',
    guests: inputs[4]?.value || '',
    occasion: inputs[5]?.value || '',
    notes: inputs[6]?.value || ''
  };

  const btn = form.querySelector('button');
  const originalBtnText = btn ? btn.innerText : 'Reserve Table';
  
  if (btn) {
    btn.innerText = 'Sending...';
    btn.disabled = true;
  }

  try {
    const apiBase = getApiBaseUrl();
    const response = await fetch(`${apiBase}/api/reservation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationPayload)
    });

    let respData = {};
    try { 
      respData = await response.json(); 
    } catch (parseErr) {
      console.warn("Response body parse notice:", parseErr);
    }

    if (!response.ok) {
      throw new Error(respData.error || 'Failed to submit reservation. Please try again.');
    }

    const wrapper = document.getElementById('reservationFormWrapper');
    if (wrapper) {
      const uniqueCode = respData.reservation?.unique_code || '';
      wrapper.innerHTML = `
        <div class="text-center" style="padding: 40px 20px;">
          <div style="font-size: 60px; color: #2ecc71; margin-bottom: 20px;">✔</div>
          <h2 class="gold mb-2">Reservation Pending!</h2>
          <p class="gray mb-4">Your request is currently pending. To receive real-time updates directly on your phone, link your Telegram below!</p>
          <a href="https://t.me/Arenguadetelabot?start=${uniqueCode}" target="_blank" class="btn" style="width:100%; text-decoration:none; display:block; padding: 16px; margin-bottom: 12px; background: rgba(0, 136, 204, 0.1); color: #0088cc; border: 1px solid #0088cc;">Activate Telegram Updates</a>
          <button class="btn btn-o" style="width:100%; padding: 16px;" onclick="location.reload()">Done (Book Another)</button>
        </div>
      `;
    }
  } catch (err) {
    const errorBanner = document.getElementById('resFormError');
    if (errorBanner) {
      errorBanner.innerText = err.message || 'There was an error submitting your reservation. Please try again.';
      errorBanner.style.display = 'block';
    } else {
      alert(err.message || 'There was an error submitting your reservation. Please try again.');
    }
    
    if (btn) {
      btn.innerText = originalBtnText;
      btn.disabled = false;
    }
  }
}

/**
 * Attaches submit listener to reservation form
 */
function initReservationForm() {
  const formEl = document.getElementById('resForm');
  if (formEl) {
    formEl.onsubmit = handleReservationSubmit;
  }
}
