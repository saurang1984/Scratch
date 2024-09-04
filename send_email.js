const { EmailClient } = require('@azure/communication-email');

const connectionString = 'endpoint=https://sp-email-comm.unitedstates.communication.azure.com/;accesskey=eJLOge0jUWFUNAKxQsembEHuZhaWR8fYrQVENBYviZ3DSeYHyfDxJQQJ99AIACULyCpJB2WqAAAAAZCStEt3';
const recipientEmail = 'saurang1984@gmail.com';
const subject = 'New Push to Your Repository';
const body = 'A new push has been made to your repository.';

async function sendEmail() {
  const emailClient = new EmailClient(connectionString);

  const emailMessage = {
    sender: 'DoNotReply@d94f4ced-31a0-47af-8e50-987478e7d3df.azurecomm.net',
    recipients: [recipientEmail],
    subject: subject,
    body: body,
  };

  try {
    const sendResult = await emailClient.send(emailMessage);
    console.log('Email sent successfully:', sendResult);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

sendEmail();
