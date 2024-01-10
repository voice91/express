import enumModel from "../models/enum.model";
import { lenderContactService, lenderProgramService, lendingInstitutionService, userService } from "../services";

// eslint-disable-next-line import/prefer-default-export
export async function seedDatabase() {
  const filterForLender = {
    email: 'adamdavidson@gmail.com'
  };
  const lender = await userService.getOne(filterForLender);
  if (!lender) {
    // The lender contact is associated with the lender institute
    const lenderInstitute = await lendingInstitutionService.createLendingInstitution({
      lenderNameVisible: 'Test Lender',
      lenderType: enumModel.EnumLenderTypeOfLendingInstitution.BANK
    });
    await Promise.all([userService.createUser({
      email: 'adamdavidson@gmail.com',
      password: '_6XNUVhw@zJ4*`z',
      firstName: 'Adam',
      lastName: 'Davidson',
      role: enumModel.EnumRoleOfUser.LENDER,
      companyName: 'Matlab Infotech',
      emailVerified: true
    }),
    // When we create lender it's necessary for it to have contact, else we'll get error in the placements
    lenderContactService.createLenderContact({
      firstName: 'Adam',
      lastName: 'Davidson',
      email: 'adamdavidson@gmail.com',
      lenderInstitute: lenderInstitute._id
    }),
    // A lender institute should at least have one program else we'll not able to edit programs
    lenderProgramService.createLenderProgram({
      lenderProgramType: 'Test Program',
      statesArray: Object.values(enumModel.EnumStatesOfDeal),
      propertyType: Object.values(enumModel.EnumAssetTypeOfDeal),
      lenderInstitute: lenderInstitute._id
    })]);
  }
  const filterForAdvisor = {
    email: 'mariaverona@gmail.com'
  };
  const advisor = await userService.getOne(filterForAdvisor);
  if (!advisor) {
    await userService.createUser({
      email: 'mariaverona@gmail.com',
      password: 'IZqfQFXS9vjs3',
      firstName: 'Maria',
      lastName: 'Verona',
      role: enumModel.EnumRoleOfUser.ADVISOR,
      companyName: 'Matlab Infotech',
      emailVerified: true
    });
  }
  const filterForUser = {
    email: 'veratopors@gmail.com'
  };
  const user = await userService.getOne(filterForUser);
  if (!user) {
    await userService.createUser({
      email: 'veratopors@gmail.com',
      password: '_6XNUVhw@zJ4*`z',
      firstName: 'Vera',
      lastName: 'Topors',
      role: enumModel.EnumRoleOfUser.USER,
      companyName: 'Matlab Infotech',
      emailVerified: true
    });
  }
}