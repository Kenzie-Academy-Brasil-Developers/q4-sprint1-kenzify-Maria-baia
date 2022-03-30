"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeSong = void 0;
const capitalizeSong = (song) => {
    return song
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
exports.capitalizeSong = capitalizeSong;
