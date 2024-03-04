import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import mongoose, { Model } from 'mongoose';
import User, { IUser } from './../models/user';

export const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect('mongodb+srv://user:code1234it@cluster0.kvdl73e.mongodb.net/')
  .then(() => console.log('connected'))
  .catch((err: Error) => console.log(err));

app.post('/api/users/register', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({ success: false, error: (error as Error).message });
  }
});

app.post('/api/users/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne<IUser>({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: '비밀번호가 틀렸습니다.',
      });
    }

    const token = await user.generateToken();
    res
      .cookie('x_auth', token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (error) {
    return res
      .status(400)
      .json({ loginSuccess: false, error: (error as Error).message });
  }
});
