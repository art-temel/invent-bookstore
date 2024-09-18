import express from 'express';

import UserRouter from './routers/userRouter';
import BookRouter from './routers/bookRouter';
import BorrowingRouter from './routers/borrowingRouter';

const app = express();

app.use(express.json());

app.use('/books', BookRouter)
app.use('/users', UserRouter);
app.use('/', BorrowingRouter);

app.use((req, res) => {
  res.status(404).send();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
