const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "5fee951d",
  apiSecret: "ryW0vts2dIJmhSGA"
});

interface TSendSMS {
  to: string;
  body: string;
}

export const SendSMS = async (data: TSendSMS) => {
  try {
    const text = data.body;
    const to = "91"+data.to;
    console.log(to);
    const test = await vonage.sms.send("Vonage APIs", to, text)
      .then((resp: any) => {
        console.log('Message sent successfully');
        console.log(resp);
      })
      .catch((err: any) => {
        console.log('There was an error sending the messages.');
        console.error(err);
      });

    console.log('SMS sent',test);

    return true;
  } catch (err) {
    console.error('Error sending SMS: ', err);
    throw err;
  }
};
