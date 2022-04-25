import { IsBoolean, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;

    @IsString()
    public nickname: string;
}

export class CreateDocDto {}

export class LoginUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}

export class ChannelDto {
    @IsString()
    public name: string;
}

export class CommentDto {
    @IsString()
    content: string;
}

export class DocDto {
    @IsString()
    public title: string;

    @IsString()
    public content: string;

    @IsString()
    public channel: string;

    @IsString()
    public cover: string;

    @IsBoolean()
    public state: boolean;
}
