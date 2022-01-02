import type { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'

import { noop, prepareContext, prepareEvent, loadLogger } from './tests.helpers'
import { formatJSONResponse, getCORSHeaders } from '@helpers/api-gateway'
import type { TContext } from 'src/types/context.type'

import nock from 'nock'

nock.disableNetConnect()

let findMock: jest.Mock

class RepositoryMock {
  find(...args) {
    return findMock(...args)
  }
}
class ConnectionMock {
  getRepository() {
    return new RepositoryMock()
  }
}

jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  createConnection: () => new ConnectionMock(),
}))

const ENV_VARS = {
  CORS_CONFIG: JSON.stringify({
    allowedHeaders: 'headerMock',
    allowedOrigin: 'originMock',
  }),
  SECRET_ARN: 'secretArnMock',
  RESOURCE_ARN: 'resourceArnMock',
  REGION: 'regionMock',
}

describe('Get events | /event-management/events endpoint', () => {
  let execute: APIGatewayProxyHandler
  let event: APIGatewayProxyEvent
  let ctx: TContext

  const envVars = process.env

  beforeAll(() => {
    process.env = { ...process.env, ...ENV_VARS }

    const handler = require('../handler')
    execute = handler.execute
  })
  afterAll(() => {
    process.env = envVars
  })
  beforeEach(() => {
    ctx = loadLogger(prepareContext())

    findMock = jest.fn()

    nock.cleanAll()
  })

  it('Should return events', async () => {
    const mockedEvents = [
      {
        id: 1,
        end_user_id: 1,
        event_type: 'party',
        longitude: 19.95,
        latitude: 50.0667,
        title: 'Sylwester w Krakowie',
        description:
          'Rok 2022 czas zacząć! Z tej Okazji chciałbym zaprosić Was na fantastyczną zabawę, podczas której będziemy witać Nowy Rok. Nie może Cię zabraknąć!',
        participation_price_min: 100,
        participation_price_max: 1000,
        duration_from: '2021-12-30T00:00:00.000Z',
        duration_to: '2022-01-02T00:00:00.000Z',
        created_at: '2021-12-20T14:30:00.000Z',
      },
    ]
    findMock.mockResolvedValueOnce(mockedEvents)

    event = prepareEvent()
    const response = await execute(event, ctx, noop)

    expect(response).toEqual(
      formatJSONResponse(
        {
          body: mockedEvents,
          headers: getCORSHeaders(event.headers.origin, 'get', ctx),
        },
        ctx
      )
    )
  })
})
