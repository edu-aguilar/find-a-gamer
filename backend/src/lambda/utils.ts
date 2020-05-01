import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "./auth/utils";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}

export function toUtf8(s: string) {
  return s.replace( /%([a-f0-9]{2})/gi, function( _f, m1 ) {
    return String.fromCharCode(parseInt(m1, 16));
  });
}