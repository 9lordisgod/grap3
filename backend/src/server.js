import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import matchRouter from './routes/match.js';
import payRouter from './routes/payments.js';
import repRouter from './routes/reputation.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, app: 'grap3' }));
app.use('/auth', authRouter);
app.use('/match', matchRouter);
app.use('/pay', payRouter);
app.use('/reputation', repRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🍇 Grap3 API on :${PORT}`));
