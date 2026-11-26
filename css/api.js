const apiMeta = document.querySelector('meta[name="cake-shop-api-url"]');
const apiUrl = (
  apiMeta ? apiMeta.content.trim() : 'http://localhost:3000'
).replace(/\/+$/, '');

async function sendMessage(message) {
  let response;

  try {
    response = await fetch(`${apiUrl}/messages`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    throw new Error(
      'Unable to reach the server. Check your connection and try again.',
    );
  }

  const result = await response.json().catch(function () {
    return null;
  });

  if (!response.ok) {
    let errorMessage = `The server could not send your message (${response.status}).`;

    if (result && result.message) {
      if (Array.isArray(result.message)) {
        errorMessage = result.message.join(' ');
      } else {
        errorMessage = result.message;
      }
    }

    throw new Error(errorMessage);
  }

  return result;
}

window.CakeShopApi = {
  sendMessage: sendMessage,
};
