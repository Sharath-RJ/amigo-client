import * as dotenv from "dotenv"
dotenv.config();
const configKeys={
    PORT:process.env.PORT,
    MONGO_DB_URL:process.env.DATABASE as string,
    JWT_SECRET:process.env.JWT_SECRET as string

};
export default configKeys