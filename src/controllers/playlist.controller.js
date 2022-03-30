"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPlaylist = exports.deleteSong = void 0;
const configs_1 = require("../configs");
const capitalizeSong_services_1 = require("../services/capitalizeSong.services");
const deleteSong = (req, res) => {
    const { userAuthenticated } = req;
    const user = configs_1.USERS.find((u) => userAuthenticated.username === u.username);
    const { artist, song } = req.query;
    const capitalizedSong = (0, capitalizeSong_services_1.capitalizeSong)(song);
    const artistPlaylist = user === null || user === void 0 ? void 0 : user.playlist[artist];
    const foundedSong = artistPlaylist.find((music) => music.title === capitalizedSong);
    if (foundedSong) {
        artistPlaylist.pop(foundedSong);
        return res.status(204).json("");
    }
    else {
        return res.status(404).json({ error: `song ${song} not found` });
    }
};
exports.deleteSong = deleteSong;
const putPlaylist = (req, res) => {
    const data = req.body;
    const { userAuthenticated } = req;
    const user = configs_1.USERS.find((u) => userAuthenticated.username === u.username);
    if (Object.keys(data).length) {
        const dataEntries = Object.entries(data);
        for (const [key, value] of dataEntries) {
            const capitalizedTitle = value[0].title
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            value[0].title = capitalizedTitle;
            value[0].listenedByMe = 0;
            if (user) {
                const playKey = user.playlist[key];
                if (playKey) {
                    playKey.push(value);
                }
                else {
                    user.playlist[key] = value;
                }
            }
        }
        const userWithoutPassword = JSON.parse(JSON.stringify(user));
        delete userWithoutPassword.password;
        return res.status(200).json(userWithoutPassword);
    }
    else {
        const { artist, song } = req.query;
        const capitalizedSong = (0, capitalizeSong_services_1.capitalizeSong)(song);
        const artistPlaylist = user === null || user === void 0 ? void 0 : user.playlist[artist];
        const foundedSong = artistPlaylist.find((music) => music.title === capitalizedSong);
        if (foundedSong) {
            foundedSong.listenedByMe += 1;
            return res.status(200).json(foundedSong);
        }
        else {
            return res.status(404).json({ error: `song ${song} not found` });
        }
    }
};
exports.putPlaylist = putPlaylist;
