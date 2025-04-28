
netlify/functions/sendNotification.js

const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'TUA_PUBLIC_KEY_AQUI',
  privateKey: 'TUA_PRIVATE_KEY_AQUI'
};

webpush.setVapidDetails(
  'mailto:teu@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

exports.handler = async (event) => {
  const subscription = JSON.parse(event.body);

  const payload = JSON.stringify({
    title: 'Nova Notificação!',
    body: 'Enviada sem Firebase, 100% controlada por ti!'
  });

  try {
    await webpush.sendNotification(subscription, payload);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notificação enviada!' })
    };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao enviar push' })
    };
  }
};
