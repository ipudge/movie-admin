const prefix = 'ipudge_';
const localStorage = window.localStorage

export const setLocalJson = (key, obj) => {
  localStorage.setItem(prefix + key, JSON.stringify(obj));
};

export const getLocalJson = (key) => {
  return JSON.parse(localStorage.getItem(prefix + key));
};
