const Database = require('better-sqlite3');
const fs = require('fs');

// 检查并创建db目录
if (!fs.existsSync('db')) fs.mkdirSync('db');

const db = new Database('./db/lego.db', { verbose: console.log });

const createSetting = () => {
  const sql = `CREATE TABLE IF NOT EXISTS setting (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    baseUrl TEXT NOT NULL,
    mode TEXT NOT NULL,
    sideMenu TEXT NOT NULL,
    uploadFn TEXT NOT NULL,
    permissionApi VARCHAR(2000) NOT NULL
  )`;

  db.prepare(sql).run();

  // 数据库升级，增加permissionApi字段
  if (db.pragma('table_info(setting)').filter(({ name }) => name === 'permissionApi').length === 0) {
    db.prepare('ALTER TABLE setting ADD permissionApi VARCHAR(2000) NOT NULL DEFAULT ""').run();
  }
};

const createForm = () => {
  const sql = `CREATE TABLE IF NOT EXISTS forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    api TEXT,
    origin TEXT,
    desc TEXT,
    schema TEXT,
    ext TEXT DEFAULT '',
    state INTEGER DEFAULT 1
  )`;

  return db.prepare(sql).run();
};

const createTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    desc TEXT,
    config TEXT,
    ext TEXT DEFAULT '',
    state INTEGER DEFAULT 1
  )`;

  return db.prepare(sql).run();
};

const createChart = () => {
  const sql = `CREATE TABLE IF NOT EXISTS charts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    desc TEXT,
    config TEXT,
    ext TEXT DEFAULT '',
    state INTEGER DEFAULT 1
  )`;

  return db.prepare(sql).run();
};

const createBoard = () => {
  const sql = `CREATE TABLE IF NOT EXISTS boards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    desc TEXT,
    config TEXT,
    ext TEXT DEFAULT '',
    state INTEGER DEFAULT 1
  )`;

  return db.prepare(sql).run();
};

// 创建表单
createSetting();
createForm();
createTable();
createChart();
createBoard();

module.exports = db;
