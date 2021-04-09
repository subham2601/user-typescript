import crypto from 'crypto'

export const genRandomString = (length: any) => {
    return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

export const sha512 = (value: any, salt: any) => {
    const hash = crypto.createHmac('sha512', salt);

    hash.update(value);

    return {
      salt: salt,
      value: hash.digest('hex'),
    };
}
