"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const node_assert_1 = __importDefault(require("node:assert"));
const src_1 = require("../src");
// Default sid is 25 characters
(0, node_test_1.default)('sid default', () => {
    node_assert_1.default.strictEqual((0, src_1.sid)().length, 22);
});
// Adjusting the length changes the length of the sid
(0, node_test_1.default)('sid with length', () => {
    node_assert_1.default.strictEqual((0, src_1.sid)({ length: 44 }).length, 44);
});
// Changing the alphabet to one character returns a string of that character
(0, node_test_1.default)('sid with alphabet', () => {
    node_assert_1.default.strictEqual((0, src_1.sid)({ alphabet: 'a' }), 'aaaaaaaaaaaaaaaaaaaaaa');
});
// Adding a prefix returns a sid that starts with that prefix
(0, node_test_1.default)('sid with prefix', () => {
    node_assert_1.default.strictEqual((0, src_1.sid)({ prefix: 'test_' }).startsWith('test_'), true);
});
