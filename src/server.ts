import "dotenv/config";
import "@/index";
import App from "@/app";
import AuthRoute from "@routes/auth.route";
import IndexRoute from "@routes/index.route";
import UsersRoute from "@routes/users.route";
import DocsRoute from "@routes/docs.route";
import ChannelsRoute from "@routes/channels.route";
import CommentsRoute from "./routes/comment.route";
import BadsRoute from "./routes/bads.route";
import LikesRoute from "./routes/likes.route";
import ViewsRoute from "./routes/views.route";

import validateEnv from "@utils/validateEnv";

validateEnv();

const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new DocsRoute(),
    new ChannelsRoute(),
    new CommentsRoute(),
    new BadsRoute(),
    new LikesRoute(),
    new ViewsRoute(),
]);

app.listen();
