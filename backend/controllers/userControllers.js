import { Prisma, PrismaClient } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { renameSync } from 'fs';

const prisma = new PrismaClient();

const generatePassword = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((email, password)) {
      const user = await prisma.user.create({
        data: {
          email,
          password: await generatePassword(password),
        },
      });

      return res.status(201).json({ user: { id: user?.id, email: user?.email }, token: createToken(email, user.id) });
    } else {
      return res.status(400).send('email and password are required');
    }
  } catch (err) {
    console.log(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(400).send('Email already exists');
      }
    } else {
      return res.status(500).send('Something went wrong');
    }
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).send('User not found');
      }

      const authorized = await compare(password, user.password);

      if (!authorized) {
        return res.status(401).send('Unauthorized');
      }

      return res.status(200).json({ user: { id: user?.id, email: user?.email }, token: createToken(email, user.id) });
    } else {
      return res.status(400).send('email and password are required');
    }
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
};
