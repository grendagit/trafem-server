import { sendEmail } from './create-auth-challenge.services'
import type { TContext } from 'src/types/context.type'

export async function sendEmailWithSecretLoginCode(
  toEmail: string,
  secretLoginCode: string,
  ctx: TContext
): Promise<void> {
  const { logger } = ctx

  logger.info({
    message: 'Started sending email with secret login code',
    data: {
      toEmail,
    },
  })
  try {
    const sendEmailServiceResponse = await sendEmail(
      toEmail,
      secretLoginCode,
      ctx
    )
    logger.info({
      message: 'Sending email is successful',
      data: {
        sendEmailServiceResponse,
      },
    })
  } catch (error) {
    logger.error({
      message: `Sending email is unsuccessful. Reason ${error.message}`,
      data: {
        stack: error.stack,
      },
    })
    throw error
  }
}
