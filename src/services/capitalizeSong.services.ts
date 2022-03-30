/** @format */

export const capitalizeSong = (song: string) => {
  return song
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
