import 'source-map-support/register'
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import Axios from 'axios'
import { verify, decode } from 'jsonwebtoken'

import { Jwt } from '../../models/auth/Jwt'
import { JwtPayload } from '../../models/auth/JwtPayload'

const jwksUrl = 'https://dev-0t584hj4.eu.auth0.com/.well-known/jwks.json'

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {

  try {
    const jwtToken: JwtPayload = await verifyToken(event.authorizationToken)
    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

const fetchJWKS = async jwksUrl => {
  const result = await Axios.get(jwksUrl)
  return result.data.keys
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}

const getJWKSSigningKey = (jwks, kid) => {

  const getJWKSSigningKeys = jwks => {

    const certToPEM = cert => {
      let pem = cert.match( /.{1,64}/g ).join( '\n' );
      pem = `-----BEGIN CERTIFICATE-----\n${ cert }\n-----END CERTIFICATE-----\n`;
      return pem;
    }

    return jwks
    .filter(
      ( key ) =>
        key.use === 'sig' && 
        key.kty === 'RSA' &&
        key.kid &&
        ( ( key.x5c && key.x5c.length ) || ( key.n && key.e ) ) // Has useful public keys
    )
    .map( ( key ) => ( { kid: key.kid, nbf: key.nbf, publicKey: certToPEM( key.x5c[ 0 ] ) } ) );
  }

  return getJWKSSigningKeys(jwks).find( key => key.kid === kid );
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {

  const jwks = await fetchJWKS(jwksUrl)
  const token = getToken(authHeader)
  const decodedToken: Jwt = decode(token, { complete: true }) as Jwt

  const { header } = decodedToken;
  if ( !header || header.alg !== 'RS256' ) {
    throw new Error( 'Token is not RS256 encoded' );
  }

  const key = getJWKSSigningKey(jwks, header.kid)
  const actualKey = key.publicKey || key.rsaPublicKey;

  return verify(token, actualKey, { algorithms: ['RS256'] }) as JwtPayload
}