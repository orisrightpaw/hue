import type { Command } from "../../lib/types";
import list from "./list";
import remove from "./remove";
import set from "./set";
import show from "./show";

export default {
    list,
    remove,
    set,
    show,
} satisfies Record<string, Command>;
