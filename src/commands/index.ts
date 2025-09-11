import type { CommandListing } from "../lib/types";
import evalc from "./eval";
import ping from "./ping";
import react from "./react";
import role from "./role";

export default {
    ping,
    eval: evalc,
    react,
    role,
} satisfies CommandListing;
