const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");

const connectionString = "endpoint=https://sp-email-comm.unitedstates.communication.azure.com/;accesskey=eJLOge0jUWFUNAKxQsembEHuZhaWR8fYrQVENBYviZ3DSeYHyfDxJQQJ99AIACULyCpJB2WqAAAAAZCStEt3";
const senderAddress = "DoNotReply@d94f4ced-31a0-47af-8e50-987478e7d3df.azurecomm.net"
const recipientAddress = "saurang1984@gmail.com"

async function main() {
  const POLLER_WAIT_TIME = 10

  const message = {
    senderAddress: senderAddress,
    recipients: {
      to: [{ address: recipientAddress }],
    },
    content: {
      subject: "Test email from JS Sample",
      plainText: "This is plaintext body of test email.",
      html: "<html><h1>This is the html body of test email.</h1></html>",
    },
  }

  try {
    const client = new EmailClient(connectionString);

    const poller = await client.beginSend(message);

    if (!poller.getOperationState().isStarted) {
      throw "Poller was not started."
    }

    let timeElapsed = 0;
    while(!poller.isDone()) {
      poller.poll();
      console.log("Email send polling in progress");

      await new Promise(resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
      timeElapsed += 10;

      if(timeElapsed > 18 * POLLER_WAIT_TIME) {
        throw "Polling timed out.";
      }
    }

    if(poller.getResult().status === KnownEmailSendStatus.Succeeded) {
      console.log(`Successfully sent the email (operation id: ${poller.getResult().id})`);
    }
    else {
      throw poller.getResult().error;
    }
  }
  catch(ex) {
    console.error(ex);
  }
}

main();
