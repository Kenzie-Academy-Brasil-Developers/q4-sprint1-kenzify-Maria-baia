/** @format */

import { Response } from "express";

import { USERS } from "../configs";
import * as types from "../types/createdTypes";
import { capitalizeSong } from "../services/capitalizeSong.services";

export const deleteSong = (req: any, res: Response) => {
  const { userAuthenticated } = req;

  const user: types.userType | undefined = USERS.find(
    (u) => userAuthenticated.username === u.username
  );

  const { artist, song } = req.query;

  const capitalizedSong = capitalizeSong(song);

  const artistPlaylist: any = user?.playlist[artist];

  const foundedSong = artistPlaylist.find(
    (music: types.playlistType) => music.title === capitalizedSong
  );

  if (foundedSong) {
    artistPlaylist.pop(foundedSong);

    return res.status(204).json("");
  } else {
    return res.status(404).json({ error: `song ${song} not found` });
  }
};

export const putPlaylist = (req: any, res: Response) => {
  const data = req.body;

  const { userAuthenticated } = req;

  const user: types.userType | undefined = USERS.find(
    (u) => userAuthenticated.username === u.username
  );

  if (Object.keys(data).length) {
    const dataEntries: [string, any][] = Object.entries(data);
    for (const [key, value] of dataEntries) {
      const capitalizedTitle = value[0].title
        .toLowerCase()
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      value[0].title = capitalizedTitle;

      value[0].listenedByMe = 0;

      if (user) {
        const playKey: any = user.playlist[key];
        if (playKey) {
          playKey.push(value);
        } else {
          user.playlist[key] = value;
        }
      }
    }
    const userWithoutPassword: types.userWithoutPassType = JSON.parse(
      JSON.stringify(user)
    );

    delete userWithoutPassword.password;

    return res.status(200).json(userWithoutPassword);
  } else {
    const { artist, song } = req.query;

    const capitalizedSong = capitalizeSong(song);

    const artistPlaylist: any = user?.playlist[artist];

    const foundedSong = artistPlaylist.find(
      (music: types.playlistType) => music.title === capitalizedSong
    );

    if (foundedSong) {
      foundedSong.listenedByMe += 1;

      return res.status(200).json(foundedSong);
    } else {
      return res.status(404).json({ error: `song ${song} not found` });
    }
  }
};
