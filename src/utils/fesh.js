async function fesh(url, as = 'json') {
  try {
    const res = await fetch(url);
    if (res.status < 200 || res.status > 299) throw new Error(res.statusText, res);

    const json = await res[as]();
    return json;
  } catch (e) {
    throw e;
  }
}

export { fesh as default };
