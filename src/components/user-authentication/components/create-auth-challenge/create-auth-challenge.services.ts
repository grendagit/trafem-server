import { SES } from 'aws-sdk'

import type { TContext } from 'src/types/context.type'

const ses = new SES()

export async function sendEmail(
  toEmail: string,
  secretLoginCode: string,
  ctx: TContext
) {
  const {
    envVars: { SES_FROM_EMAIL },
  } = ctx

  const message = prepareMessage(toEmail, SES_FROM_EMAIL, secretLoginCode)
  try {
    return await ses.sendEmail(message).promise()
  } catch (error) {
    throw new Error(`Failed to send email. Reason: ${error.message}`)
  }
}

function prepareMessage(
  toEmail: string,
  fromEmail: string,
  secretLoginCode: string
): SES.SendEmailRequest {
  return {
    Destination: { ToAddresses: [toEmail] },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
          <html>
            <head></head>
            <body>
              <p>Twój kod logowania jest następujący:</p>
              <h3>${secretLoginCode}</h3>
            </body>
          </html>`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `Twój kod logowania jest następujący: ${secretLoginCode}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Twój kod logowania Trafem',
      },
    },
    Source: fromEmail,
  }
}
