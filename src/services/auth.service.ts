import { hash, compare } from "bcrypt";
import config from "config";
import { sign } from "jsonwebtoken";
import { CreateUserDto } from "@dtos/users.dto";
import { HttpException } from "@exceptions/HttpException";
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import userModel from "@/models/users";
import { isEmpty } from "@utils/util";

const transUserField = ({ _id, email, nickname, from, role, avatar }) => ({
    _id,
    email,
    nickname,
    from,
    role,
    avatar,
});

class AuthService {
    public users = userModel;

    public async signup(userData: CreateUserDto): Promise<User & any> {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

        const findUser: User = await this.users.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: User = await this.users.create({
            ...userData,
            password: hashedPassword,
        });

        return transUserField(createUserData as any);
    }

    public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User & any }> {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

        const findUser: User = await this.users.findOne({ email: userData.email });
        if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);

        return { cookie, findUser: transUserField(findUser as any) };
    }

    public async logout(userData: User): Promise<null> {
        if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

        const findUser: User & any = await this.users.findOne({
            email: userData.email,
            password: userData.password,
        });
        if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
        return null;
    }

    public createToken(user: User): TokenData {
        const dataStoredInToken: DataStoredInToken = { _id: user._id };
        const secretKey: string = config.get("secretKey");
        const expiresIn: number = 60 * 60;

        return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
    }

    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}

export default AuthService;
