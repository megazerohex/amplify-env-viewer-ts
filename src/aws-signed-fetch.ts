import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { HttpRequest } from "@aws-sdk/protocol-http";

const REGION = "us-east-1"; // Your AWS region
const IDENTITY_POOL_ID = "us-east-1:da61ca0c-1b23-495e-8222-becb1f37bc22";
const API_URL = "https://balxo5dntc.execute-api.us-east-1.amazonaws.com/Prod/getEvent"; // Your full API endpoint

export const fetchSigned = async () => {
  // Get temporary credentials from Cognito
  const credentials = fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  });

  const creds = await credentials();

  const request = new HttpRequest({
    method: "GET",
    protocol: "https:",
    path: "/getEvent", // path part of your API
    headers: {
      host: new URL(API_URL).host,
    },
    hostname: new URL(API_URL).hostname,
    body: undefined,
  });

  // Sign the request
  const signer = new SignatureV4({
    credentials: () => Promise.resolve(creds),
    region: REGION,
    service: "execute-api",
    sha256: Sha256,
  });

  const signedRequest = await signer.sign(request);

  // Convert signed request to fetch-friendly format
  return fetch(API_URL, {
    method: "GET",
    headers: signedRequest.headers,
  });
};
