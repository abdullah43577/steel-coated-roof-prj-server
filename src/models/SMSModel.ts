import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../utils/connectDB";

class SMSModel extends Model<InferAttributes<SMSModel>, InferCreationAttributes<SMSModel>> {
  declare code: string;
  declare phone_no: string;
  declare expiry: Date;
}

SMSModel.init(
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Sms",
  }
);

export default SMSModel;
