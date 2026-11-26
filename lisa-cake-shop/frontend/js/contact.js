const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const submitButton = form.querySelector('button[type="submit"]');

if (form && note && submitButton) {
  const nameInput = document.getElementById('customerName');
  const emailInput = document.getElementById('customerEmail');
  const countryInput = document.getElementById('customerCountry');
  const messageInput = document.getElementById('message');

  function showNote(message, type) {
    note.textContent = message;
    note.className = `small mt-3 text-${type}`;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (submitButton.disabled) return;

    const fields = [nameInput, emailInput, countryInput, messageInput];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      if (!field.value.trim()) {
        field.setCustomValidity('Please complete this field.');
        field.reportValidity();
        field.oninput = function () {
          field.setCustomValidity('');
          field.oninput = null;
        };
        return;
      }
    }

    const message = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      country: countryInput.value.trim(),
      message: messageInput.value.trim(),
    };

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    note.textContent = '';
    note.className = 'small mt-3 d-none';

    try {
      await window.CakeShopApi.sendMessage(message);
      form.reset();
      showNote('Thank you. Your message has been sent.', 'success');
    } catch (error) {
      if (error instanceof Error) {
        showNote(error.message, 'danger');
      } else {
        showNote('Something went wrong. Please try again.', 'danger');
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send message';
      form.removeAttribute('aria-busy');
    }
  });
}
