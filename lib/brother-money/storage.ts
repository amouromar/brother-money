import * as SQLite from "expo-sqlite";
import { createSeedState } from "./seed";
import type { BrotherMoneyState } from "./types";

const DATABASE_NAME = "brother-money.db";
const STATE_KEY = "app-state";
const THEME_KEY = "theme";

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME).then(
      async (db) => {
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS app_state (
          key TEXT PRIMARY KEY NOT NULL,
          value TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        );
      `);

        return db;
      },
    );
  }

  return databasePromise;
}

export async function loadBrotherMoneyState() {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ value: string }>(
    "SELECT value FROM app_state WHERE key = ?",
    STATE_KEY,
  );

  if (!row?.value) {
    return createSeedState();
  }

  try {
    return JSON.parse(row.value) as BrotherMoneyState;
  } catch {
    return createSeedState();
  }
}

export async function saveBrotherMoneyState(state: BrotherMoneyState) {
  const db = await getDatabase();
  const now = new Date().toISOString();
  const value = JSON.stringify(state);

  await db.runAsync(
    `
      INSERT INTO app_state (key, value, updatedAt)
      VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updatedAt = excluded.updatedAt
    `,
    STATE_KEY,
    value,
    now,
  );
}

export async function resetBrotherMoneyState() {
  const state = createSeedState();
  await saveBrotherMoneyState(state);
  return state;
}

export async function loadTheme(): Promise<"light" | "dark"> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ value: string }>(
    "SELECT value FROM app_state WHERE key = ?",
    THEME_KEY,
  );

  if (!row?.value) {
    return "light";
  }

  try {
    const theme = JSON.parse(row.value);
    return theme === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export async function saveTheme(theme: "light" | "dark") {
  const db = await getDatabase();
  const now = new Date().toISOString();
  const value = JSON.stringify(theme);

  await db.runAsync(
    `
      INSERT INTO app_state (key, value, updatedAt)
      VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updatedAt = excluded.updatedAt
    `,
    THEME_KEY,
    value,
    now,
  );
}
