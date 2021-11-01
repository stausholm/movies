<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/search">Search</router-link> |
    <router-link to="/library">Library</router-link> |
    <router-link to="/account">My stuff</router-link>
  </div>
  <div id="teleporttarget"></div>
  <router-view />
</template>
