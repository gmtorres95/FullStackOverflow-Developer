import dotenv from 'dotenv';

let path = '.env.dev';
if (process.env.NODE_ENV === 'production') path = '.env';

dotenv.config({ path });
