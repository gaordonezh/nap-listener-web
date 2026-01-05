const normalize = (texto: string) => {
  const from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
  const to = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
  const mapping: any = {} as any;

  for (let i = 0, j = from.length; i < j; i++) {
    mapping[from.charAt(i)] = to.charAt(i);
  }
  const ret = [];
  for (let i = 0, j = texto.length; i < j; i++) {
    const c = texto.charAt(i);
    // eslint-disable-next-line no-prototype-builtins
    if (mapping.hasOwnProperty(texto.charAt(i))) ret.push(mapping[c]);
    else ret.push(c);
  }
  return ret.join('');
};

export default normalize;
