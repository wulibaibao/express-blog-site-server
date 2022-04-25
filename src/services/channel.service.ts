import { Request } from "express";
import { today } from "../utils/util";
import { ChannelDto } from "@dtos/users.dto";
import { HttpException } from "@exceptions/HttpException";
import { Channel } from "@/interfaces/channels.interface";
import channel from "@/models/channel";
import { isEmpty } from "@utils/util";

class ChannelService {
    public channel = channel;

    public async findAllChannel(req: Request): Promise<Channel[]> {
        const { size = 10, page = 0, sort, ...rest } = req.query;

        const channels: Channel[] = await this.channel
            .find(rest)
            .populate({ path: "author", ref: "user", select: { nickname: 1, avatar: 1, id: 1 } })
            .limit(+size)
            .skip(+page * +size)
            .sort({ name: sort, createdAt: -1 });

        return channels;
    }

    public async findChannelById(channelId: string): Promise<Channel> {
        if (isEmpty(channelId)) throw new HttpException(400, "You're not channelId");

        const findChannel: Channel = await this.channel.findOne({ _id: channelId });
        if (!findChannel) throw new HttpException(409, "You're not channel");

        return findChannel;
    }

    public async createChannel(channelData: ChannelDto & { author: string }): Promise<Channel> {
        if (isEmpty(channelData)) throw new HttpException(400, "You're not channel");

        const findChannelName: Channel = await this.channel.findOne({ name: channelData.name });
        if (findChannelName)
            throw new HttpException(409, `You're email ${channelData.name} already exists`);

        const createChannelData: Channel = await this.channel.create({
            ...channelData,
            createdAt: today(),
        });

        return createChannelData;
    }

    public async updateChannel(channelId: string, channelData: ChannelDto): Promise<Channel> {
        if (isEmpty(channelData)) throw new HttpException(400, "You're not channelData");

        if (channelData.name) {
            const findChannel: Channel = await this.channel.findOne({ name: channelData.name });
            if (findChannel && findChannel.id != channelId)
                throw new HttpException(409, `You're email ${channelData.name} already exists`);
        }

        const updateChannelData: Channel = await this.channel.findByIdAndUpdate(channelId, {
            ...channelData,
            updatedAt: today(),
        });
        if (!updateChannelData) throw new HttpException(409, "You're not channel");

        return updateChannelData;
    }

    public async deleteChannel(channelId: string): Promise<Channel> {
        const deleteUserById: Channel = await this.channel.findByIdAndDelete(channelId);
        if (!deleteUserById) throw new HttpException(409, "You're not channel");

        return deleteUserById;
    }

    public async listTotal(): Promise<number> {
        const total = await this.channel.count();
        return total;
    }
}

export default ChannelService;
