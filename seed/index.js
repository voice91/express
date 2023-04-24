import { User } from '../models';

// eslint-disable-next-line import/prefer-default-export
export async function seedDatabase() {
  const filter = {
    email: 'admin@gmail.com',
  };
  const resutl = await User.findOne(filter);
  if (resutl) {
    await User.findOneAndUpdate(filter, {
      password: 'admin@123',
      name: 'admin Savani',
      firstName: 'admin',
      lastName: 'admin',
      role: 'lender',
      emailVerified: true,
    });
  } else {
    await User.create({
      email: 'admin@gmail.com',
      password: 'admin@123',
      name: 'admin Savani',
      firstName: 'admin',
      lastName: 'admin',
      role: 'lender',
      emailVerified: true,
    });
  }
  const filterForTestUser = {
    email: 'testing@gmail.com',
  };
  const getTestUser = await User.findOne(filterForTestUser);
  if (getTestUser) {
    await User.findOneAndUpdate(filterForTestUser, {
      password: 'test@123',
      name: 'test Savani',
      firstName: 'testing',
      lastName: 'test',
      role: 'advisor',
      emailVerified: true,
    });
  } else {
    await User.create({
      email: 'testing@gmail.com',
      password: 'test@123',
      name: 'test Savani',
      firstName: 'test',
      lastName: 'test',
      role: 'advisor',
      emailVerified: true,
    });
  }
  const demoUserFilter = {
    email: 'demo@gmail.com',
  };
  const demoUser = await User.findOne(demoUserFilter);
  if (demoUser) {
    await User.findOneAndUpdate(demoUserFilter, {
      password: 'prisha@123',
      name: 'demo Savani',
      firstName: 'demo',
      lastName: 'demo',
      role: 'user',
      emailVerified: true,
    });
  } else {
    await User.create({
      email: 'demo@gmail.com',
      password: 'demo@123',
      name: 'demo Savani',
      firstName: 'demo',
      lastName: 'Savani',
      role: 'user',
      emailVerified: true,
    });
  }
}
