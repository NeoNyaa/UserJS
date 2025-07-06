// ==UserScript==
// @name            Hypixel Skyblock Wiki Swapper
// @namespace       Violentmonkey Scripts
// @match           *://wiki.hypixel.net/*
// @exclude-match   *://wiki.hypixel.net/index.php*
// @match           *://hypixel-skyblock.fandom.com/*
// @exclude-match   *://hypixel-skyblock.fandom.com/wiki/Special:Search*
// @grant           none
// @version         1.0
// @author          NeoNyaa
// @description     Adds two buttons to both the Fandom and Hypixel wiki allowing you to switch between the two with the currently viewed page as a search query and to scroll back to the top of the page.
// ==/UserScript==


function makeButtons(page, icon) {
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "HypixelSkyblockWikiSwapper-ButtonContainer";
  buttonContainer.style = "font-family: monospace; position: fixed; bottom: 10px; right: 10px; z-index: 9999999; display: flex; flex-direction: row; gap: 4px;";

  const swapLink = document.createElement("a");
  swapLink.href = page;
  swapLink.style = "display: block; height: 50px; width: 50px; background-color: #202020; border: solid white 4px; border-radius: 4px; text-align: center; line-height: 40px; background-position: center; background-repeat: no-repeat; box-sizing: content-box; background-image: url('"+icon+"'); background-size: 32px 32px;";
  swapLink.style.backgroundImage = icon;

  const backToTop = document.createElement("a");
  backToTop.innerText = "➜";
  backToTop.onclick = function(){event.preventDefault(); document.querySelector("html body").scrollIntoView({behavior: 'smooth'})};
  backToTop.style = "cursor: pointer; color: white; text-decoration: none; display: block; height: 50px; width: 50px; background-color: #202020; border: solid white 4px; border-radius: 4px; text-align: center; line-height: 50px; transform: rotate(-90deg); font-size: 32px; box-sizing: content-box;";

  document.querySelector("html body").prepend(buttonContainer);
  document.getElementById("HypixelSkyblockWikiSwapper-ButtonContainer").appendChild(backToTop);
  document.getElementById("HypixelSkyblockWikiSwapper-ButtonContainer").appendChild(swapLink);
}

function hypixelWIKI() {
  newPage = "https://hypixel-skyblock.fandom.com/wiki/Special:Search?query="+window.location.pathname.split("/")[1];
  makeButtons(newPage, "https://static.wikia.nocookie.net/hypixel-skyblock/images/4/4a/Site-favicon.ico");
}

function fandomWIKI() {
  newPage = "https://wiki.hypixel.net/index.php?search="+window.location.pathname.split("/")[2];
  makeButtons(newPage, "https://wiki.hypixel.net/skins/HypixelNeue/resources/skins.hypixelneue.styles.images/favicon.png");
}

switch(window.location.hostname) {
  case "wiki.hypixel.net":
    document.getElementById("back-to-top").remove();
    hypixelWIKI();
    break;
  case "hypixel-skyblock.fandom.com":
    fandomWIKI();
    break;
}
