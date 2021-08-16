import React from "react";

export const scryfallApi = cardName => {
  return fetch(
    `https://api.scryfall.com/cards/named?fuzzy=${cardName}`
  ).then(response => response.json());
};
