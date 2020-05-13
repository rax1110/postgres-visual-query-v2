import crypto from 'crypto';

const keyObject = {
  // secret: crypto.randomBytes(32),
  iv: crypto.randomBytes(16),
};

export const encrypt = (text) => {
  const cipher = crypto.createCipheriv('aes-256-cbc',
    Buffer.from('f010b843fe6830456476d9ba544246b1063086cb072e4804ece61bb58c551117',
      'hex'), keyObject.iv);

  let encrypted = cipher.update(text);

  encrypted += cipher.final('hex');

  return { iv: keyObject.iv.toString('hex'),
    encryptedData: encrypted.toString('hex') };
};
