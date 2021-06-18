(() => {
  'use strict'

  const fs = require('fs');
  const jwt = require('jsonwebtoken');

  const privateKey = fs.readFileSync('./private.key', 'utf8');
  const publicKey = fs.readFileSync('./public.key', 'utf8');

  const payload = {
    testField01: 'test 1',
    testField02: 'test 2',
    testField03: 'test 3',
  };

  console.log('payload: ' + JSON.stringify(payload));
  // Sender
  const iss = 'Github Example';
  // The Intended user of the token
  const sub = 'receiver email';
  // The website that its used on
  const aud = 'http://websiteYourSendingTo.com';
  // expiration
  const exp = '24h';

  const signOptions = {
    issuer: iss,
    subject: sub,
    audience: aud,
    expiresIn: exp,
    algorithm: 'RS256'
  };

  console.log('Options: ', JSON.stringify(signOptions));

  const token = jwt.sign(payload, privateKey, signOptions);
  console.log('Token: ' + token);

  const verifyOptions = {
    issuer: iss,
    subject: sub,
    audience: aud,
    maxAge: exp,
    algorithms: ['RS256']
  };

  jwt.verify(token, publicKey, verifyOptions);


  console.log(' ');

  const decoded = jwt.decode(token, { complete: true });

  console.log('Decoded Header: ' + JSON.stringify(decoded.header));
  console.log('Decoded Payload: ' + JSON.stringify(decoded.payload));

})()