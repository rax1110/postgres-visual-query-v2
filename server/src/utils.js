import { Client } from 'pg';
import crypto from 'crypto';

const decrypt = (text) => {
  const iv = Buffer.from(text.iv, 'hex');
  const secret = Buffer.from('f010b843fe6830456476d9ba544246b1063086cb072e4804ece61bb58c551117', 'hex');
  const encryptedData = Buffer.from(text.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', secret, iv);

  let decrypted = decipher.update(encryptedData);

  decrypted += decipher.final('utf8');

  return decrypted;
};

const connectToDatabase = (req, res) => {
  const db = new Client({
    user: req.body.user,
    host: req.body.host,
    database: req.body.database,
    password: decrypt(req.body.password),
    port: req.body.port
  });

  db.connect().catch((err) => {
    if (err) {
      if (err.code === 'ENOTFOUND') {
        res.status(502).json({ message: 'Error: Host not found (code: ENOTFOUND)' });
      } else if (err.code === 'ETIMEDOUT') {
        res.status(504).json({ message: 'Error: Connection timed out (code: ETIMEDOUT)' });
      } else {
        res.status(500).json({ message: 'Error: Something went wrong (code: UNEXPECTED)' });
      }
    }
  });

  return db;
};

export default connectToDatabase;
