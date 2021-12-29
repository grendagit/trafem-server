import type { AWS } from '@serverless/typescript'

import {
  userAuthenticationCreateAuthChallenge,
  userAuthenticationVerifyAuthChallengeResponse,
  userAuthenticationDefineAuthChallenge,
  userAuthenticationPreSignUp,
  userAuthenticationPostConfirmation,
} from '@components/user-authentication'
import { eventManagementGetEvents } from '@components/event-management'
import { userManagementGetUserEvents } from '@components/user-management'

const serverlessConfiguration: AWS = {
  service: 'trafem',
  frameworkVersion: '2',
  package: {
    individually: true,
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    stage: "${opt:stage, 'dev'}",
  },
  functions: {
    userAuthenticationCreateAuthChallenge,
    userAuthenticationVerifyAuthChallengeResponse,
    userAuthenticationDefineAuthChallenge,
    userAuthenticationPreSignUp,
    userAuthenticationPostConfirmation,
    eventManagementGetEvents,
    userManagementGetUserEvents,
  },
}

module.exports = serverlessConfiguration
