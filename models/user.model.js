/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON } from 'models/plugins';
import enumModel from 'models/enum.model';
import bcrypt from 'bcryptjs';
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  expirationDate: {
    type: Date,
  },
  used: {
    type: Boolean,
  },
  codeType: {
    type: String,
    enum: Object.values(enumModel.EnumCodeTypeOfCode),
  },
});
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
const OauthSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  token: {
    type: String,
  },
});
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
const DeviceTokenSchema = new mongoose.Schema({
  /**
   *Device Token Of User
   * */
  deviceToken: {
    type: String,
  },
  /**
   *Platform of User
   * */
  platform: {
    type: String,
    enum: Object.values(enumModel.EnumPlatformOfDeviceToken),
  },
});
const UserSchema = new mongoose.Schema(
  {
    /**
     * Name of User
     * */
    name: {
      type: String,
    },
    /**
     * Email address of User
     * */
    email: {
      type: String,
      // eslint-disable-next-line security/detect-unsafe-regex
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      required: true,
    },
    /**
     * For email verification
     * */
    emailVerified: {
      type: Boolean,
      private: true,
    },
    /**
     * role
     * */
    role: {
      type: String,
      enum: Object.values(enumModel.EnumRoleOfUser),
      default: enumModel.EnumRoleOfUser.USER,
    },
    /**
     * custom server authentication
     * */
    codes: {
      type: [CodeSchema],
    },
    /**
     * password for authentication
     * */
    password: {
      type: String,
      private: true,
      required: true,
    },
    /**
     * Google based authentication
     * */
    googleProvider: {
      type: OauthSchema,
    },
    /**
     * To store device tokens
     * */
    deviceTokens: {
      type: [DeviceTokenSchema],
    },
    /**
     * First name of User
     * */
    firstName: {
      type: String,
      required: true,
    },
    /**
     * Last name of User
     * */
    lastName: {
      type: String,
      required: true,
    },
    /**
     * Free text with combination of country code and phone number
     * */
    phoneNumber: {
      type: String,
    },
    /**
     * The name of the company of the user
     * */
    companyName: {
      type: String,
      required: true,
    },
    /**
     * Address of Company of the User
     * */
    companyAddress: {
      type: String,
    },
    /**
     * City of the User
     * */
    city: {
      type: String,
      maxLength: 30,
    },
    /**
     * State of the User
     * */
    state: {
      type: String,
      enum: Object.values(enumModel.EnumStatesOfDeal),
    },
    /**
     * Zipcode of the address of the User
     */
    zipcode: {
      type: Number,
      min: 10000,
      max: 99999,
    },
    /**
     * Updated whenever the user signs, by default null
     * */
    lastSignIn: {
      type: Date,
      default: new Date(),
    },
    /**
     * profile Photo
     * */
    profilePhoto: {
      type: String,
    },
    emailPresentingPostmark: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);
UserSchema.plugin(toJSON);
UserSchema.plugin(mongoosePaginateV2);
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the User to be excluded
 * @returns Promise with boolean value
 */
UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const User = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!User;
};
UserSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 8);
  }
  next();
});
/**
 * When user reset password or change password then it save in bcrypt format
 */
UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate(); // {password: "..."}
  if (update && update.password) {
    const passwordHash = await bcrypt.hash(update.password, 10);
    this.getUpdate().password = passwordHash;
  }
  next();
});
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema, 'User');
module.exports = UserModel;
