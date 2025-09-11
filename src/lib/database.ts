import { Database } from "bun:sqlite";
export const db = new Database(process.env.DATABASE_PATH || "./data/database.sqlite", {
    create: true,
    strict: true,
});

const [reactions] = db.query(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'reactions';`).all();
if (!reactions) db.query(`CREATE TABLE reactions (user_id TEXT PRIMAY KEY, emote_id TEXT NOT NULL);`).all();

export const REACT_GET_USER = db.query(`SELECT * FROM reactions WHERE user_id = $user_id;`);
export const REACT_INSERT_USER = db.query(`INSERT INTO reactions (user_id, emote_id) VALUES ($user_id, $emote_id);`);
export const REACT_DELETE_USER = db.query(`DELETE FROM reactions WHERE user_id = $user_id;`);
export const REACT_UPDATE_USER = db.query(`UPDATE reactions SET emote_id = $emote_id WHERE user_id = $user_id;`);
export const REACT_GET_ALL = db.query(`SELECT * FROM reactions;`);

export let watchedPhrases: string[];
export function updateWatchedPhrases() {
    const records = REACT_GET_ALL.all() as { user_id: string; emote_id: string }[];
    watchedPhrases = [];
    records.forEach((record) => watchedPhrases.push(record.user_id));
    return watchedPhrases;
}
