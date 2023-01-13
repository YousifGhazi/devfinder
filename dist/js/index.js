"use strict";

// set color mode function
function setColorMode(colorMode) {
  document.body.id = colorMode;
}

// detecting system color mode
let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (darkMode) {
  setColorMode("dark");
} else {
  setColorMode("light");
}

// header

// dark/light mode button
let colorModeBtn = document.querySelector("#header .light-dark-mode");

colorModeBtn.addEventListener("click", function () {
  if (document.body.id === "dark") {
    setColorMode("light");
  } else {
    setColorMode("dark");
  }
});

// search
let searchInp = document.querySelector(".search-input input");
let searchBtn = document.querySelector(".search-button");
let notFound = document.querySelector(".not-found");

// get user info
searchBtn.addEventListener("click", async function () {
  // fetch the user data
  let data = await fetch(
    `https://api.github.com/users/${searchInp.value}`
  ).then((res) => (res.ok ? res.json() : null)); // check for the user

  if (data) {
    notFound.classList.add("hide");
    setUserImg(data);
    setUserInfo(data);
    setUserStatistics(data);
    setUserSocialInfo(data);
  } else {
    notFound.classList.remove("hide");
  }

  function setUserImg({ avatar_url }) {
    // set src to the user img URL
    let userImg = document.querySelector(".user-img img");
    userImg.setAttribute("src", avatar_url);
  }

  function setUserInfo({ name, login, created_at, bio }) {
    let nameElement = document.querySelector(".username-date  .name");
    let userNameElement = document.querySelector(
      ".username-date .username"
    );
    let dateElement = document.querySelector(".username-date .date");
    let bioElement = document.querySelector(".user-info .bio");

    //set the name
    nameElement.innerText = name;

    //set the username
    userNameElement.innerText = `@${login}`;

    // set date
    dateElement.innerText = convertDate(created_at);

    // set bio
    if (bio) {
      bioElement.innerText = bio;
    } else {
      bioElement.innerText = "empty bio";
    }
  }

  function setUserStatistics({ public_repos, followers, following }) {
    let reposElement = document.querySelector(".repos .value");
    let followersElement = document.querySelector(".followers .value");
    let followingElement = document.querySelector(".following .value");

    // set repos
    reposElement.innerText = public_repos;

    // set followers
    followersElement.innerText = followers;

    // set following
    followingElement.innerText = following;
  }

  function setUserSocialInfo({
    location,
    twitter_username,
    blog,
    company,
  }) {
    let locationElement = document.querySelector(
      ".social-info .location span"
    );
    let twitterElement = document.querySelector(
      ".social-info .twitter span"
    );
    let blogElement = document.querySelector(".social-info .blog span");
    let companyElement = document.querySelector(
      ".social-info .company span"
    );

    // set location
    locationElement.innerText = location ? location : "none";

    // set twitter username
    twitterElement.innerText = twitter_username
      ? twitter_username
      : "none";

    // set blog link
    blogElement.innerText = blog ? blog : "none";

    // set  company name
    companyElement.innerText = company ? company : "none";
  }

  function convertDate(date) {
    // convert the api date format

    // cerate an array from the the api date
    let convertedDate = new Date(date).toDateString().split(" ");
    let day = convertedDate[2];
    let month = convertedDate[1];
    let year = convertedDate[3];
    return `Joined ${day} ${month} ${year}`;
  }
});
