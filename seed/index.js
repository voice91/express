import { User } from '../models';

// eslint-disable-next-line import/prefer-default-export
export async function seedDatabase() {
  const filter = {
    email: 'adamdavidson@gmail.com',
  };
  const resutl = await User.findOne(filter);
  if (resutl) {
    await User.findOneAndUpdate(filter, {
      password: '_6XNUVhw@zJ4*`z',
      name: 'Adam Davidson',
      firstName: 'Adam',
      lastName: 'Davidson',
      role: 'lender',
      companyName: 'matlabinfotech',
      emailVerified: true,
    });
  } else {
    await User.create({
      email: 'adamdavidson@gmail.com',
      password: '_6XNUVhw@zJ4*`z',
      name: 'Adam Davidson',
      firstName: 'Adam',
      lastName: 'Davidson',
      role: 'lender',
      companyName: 'matlabinfotech',
      emailVerified: true,
    });
  }
  const filterForTestUser = {
    email: 'mariaverona@gmail.com',
  };
  const getTestUser = await User.findOne(filterForTestUser);
  if (getTestUser) {
    await User.findOneAndUpdate(filterForTestUser, {
      password: 'IZqfQFXS9vjs3',
      name: 'Maria Verona',
      firstName: 'Maria',
      lastName: 'Verona',
      role: 'advisor',
      companyName: 'matlabinfotech',
      emailVerified: true,
    });
  } else {
    await User.create({
      email: 'mariaverona@gmail.com',
      password: 'IZqfQFXS9vjs3',
      name: 'Maria Verona',
      firstName: 'Maria',
      lastName: 'Verona',
      role: 'advisor',
      companyName: 'matlabinfotech',
      emailVerified: true,
    });
  }

  const demoUserFilter = {
    email: 'veratopors@gmail.com',
  };
  const demoUser = await User.findOne(demoUserFilter);
  if (demoUser) {
    await User.findOneAndUpdate(demoUserFilter, {
      password: '_6XNUVhw@zJ4*`z',
      name: 'Vera Topors',
      firstName: 'Vera',
      lastName: 'Topors',
      role: 'user',
      companyName: 'matlabinfotech',
      emailVerified: true,
    });
  } else {
    await User.create({
      email: 'veratopors@gmail.com',
      password: '_6XNUVhw@zJ4*`z',
      name: 'Vera Topors',
      firstName: 'Vera',
      lastName: 'Topors',
      role: 'user',
      companyName: 'matlabinfotech',
      emailVerified: true,
    });
  }
}
