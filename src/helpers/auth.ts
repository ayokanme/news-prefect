import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../db';


const signup = (req: Request, res: Response) => {

  User.findOne({ 'email': req.body.email })
    .then(async (user) => {

      if (!user) {

        const hash = await bcrypt.hash(req.body.password, 8);

        User.create({
          'name': req.body.name,
          'email': req.body.email,
          'password': hash
        })
          .then(async (user) => {
            const cookieString = await bcrypt.hash((user.id + Date.now().toString()), 8);

            User.findOneAndUpdate({ 'email': req.body.email },
              { $set: { 'sessionId': cookieString }}
            )
              .then(() => {
                res.status(200)
                  .cookie('newsPrefect', cookieString, { sameSite: true })
                  .json({ message: 'user is logged in', loggedIn: true });
              })
              .catch((err) => {
                console.error(err);
                res.status(500).json({ message: 'server error' });
              });

          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'server error' });
          });

      } else {
        res.status(200).json({ message: 'an account with that email exists', existingUser: true });
      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'server error' });
    });
};

const login = (req: Request, res: Response) => {

  User.findOne({ 'email': req.body.email })
    .then(async (user) => {

      if (!user) {
        res.status(200).json({ message: 'user does not exist', noSuchUser: true });
      } else {

        bcrypt.compare(req.body.password, user.password)
          .then(async (validated) => {

            if (validated) {
              const cookieString = await bcrypt.hash((user.id + Date.now().toString()), 8);

              User.findOneAndUpdate({ 'email': req.body.email },
                { $set: { 'sessionId': cookieString }}
              )
                .then(() => {
                  res.status(200)
                    .cookie('newsPrefect', cookieString, { sameSite: true })
                    .json({ message: 'user is logged in', loggedIn: true });
                })
                .catch((err) => {
                  console.error(err);
                  res.status(500).json({ message: 'server error' });
                });

            } else {
              res.status(200).json({ message: 'wrong password', wrongPassword: true });
            }

          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'server error' });
          });

      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'server error' });
    });
};

const logout = (req: Request, res: Response) => {

  User.findOneAndUpdate({ 'sessionId': req.cookies.newsPrefect },
    { $unset: { 'sessionId': '' }}
  )
    .then(() => {
      res.clearCookie('newsPrefect').redirect('/');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'server error' });
    });
};

const deleteAccount = (req: Request, res: Response) => {

  User.findOne({ 'sessionId': req.cookies.newsPrefect })
    .then((user) => {

      if (user) {

        bcrypt.compare(req.body.password, user.password)
          .then((validated) => {

            if (validated) {

              User.findOneAndDelete({ 'sessionId': req.cookies.newsPrefect, 'password': user.password })
                .then(() => {
                  res.clearCookie('newsPrefect').redirect('/');
                })
                .catch((err) => {
                  console.error(err);
                  res.status(500).json({ message: 'server error' });
                });

            } else {

              res.status(200).json({ message: 'wrong password', wrongPassword: true });

            }

          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'server error' });
          });

      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'server error' });
    });
};

export { signup, login, logout, deleteAccount };
