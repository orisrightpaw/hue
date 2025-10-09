import type { CommandListing } from "../lib/types";
import evalc from "./eval";
import ping from "./ping";
import react from "./react";
import role from "./role";
import whitelist from "./whitelist";

export default {
    ping,
    eval: evalc,
    react,
    role,
    whitelist,
} satisfies CommandListing;
