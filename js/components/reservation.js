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
  const formData = new FormData(form);

  const reservationPayload = {
    name: (formData.get('name') || '').toString().trim(),
    phone: (formData.get('phone') || '').toString().trim(),
    date: (formData.get('date') || '').toString().trim(),
    time: (formData.get('time') || '').toString().trim(),
    guests: (formData.get('guests') || '').toString().trim(),
    occasion: (formData.get('occasion') || '').toString().trim(),
    notes: (formData.get('notes') || '').toString().trim()
  };

  if (!reservationPayload.name || !reservationPayload.phone || !reservationPayload.date || !reservationPayload.time || !reservationPayload.guests) {
    const errorBanner = document.getElementById('resFormError');
    if (errorBanner) {
      errorBanner.innerText = 'Please fill in name, phone, date, time, and guests.';
      errorBanner.style.display = 'block';
    }
    return;
  }

  const errorBanner = document.getElementById('resFormError');
  if (errorBanner) {
    errorBanner.style.display = 'none';
    errorBanner.innerText = '';
  }

  const btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
  const originalBtnText = btn ? btn.innerText : 'Reserve Table';
  
  if (btn) {
    btn.innerText = 'Sending...';
    btn.disabled = true;
  }

  try {
    let response;
    let respData = {};

    try {
      response = await fetch(getReservationUrl(false), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationPayload)
      });
    } catch (networkErr) {
      // Local backend/proxy down → try production API so reservations still work in dev
      const hostname = window.location.hostname;
      const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.');
      if (!isLocal) throw networkErr;

      response = await fetch(getReservationUrl(true), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationPayload)
      });
    }

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
    const message = (err && err.message === 'Failed to fetch')
      ? 'Cannot reach the reservation server. Make sure the backend is running, then try again.'
      : (err.message || 'There was an error submitting your reservation. Please try again.');

    if (errorBanner) {
      errorBanner.innerText = message;
      errorBanner.style.display = 'block';
    } else {
      alert(message);
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
