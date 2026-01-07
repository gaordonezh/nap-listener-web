export const normalize = (texto: string) => {
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

export const phoneNumberUtils = {
  format(raw: string) {
    const onlyNumbers = raw.replace(/\D/g, '');
    const formatted = (onlyNumbers.match(/.{1,3}/g)?.join(' ') || '').slice(0, 11);
    return formatted;
  },
  clean(raw: string, removeSpecialStr?: string) {
    const cleaned = raw.replace(/\D/g, '').replace(/\s+/g, '').trim();
    if (removeSpecialStr) {
      const extra = cleaned.replace(removeSpecialStr, '');
      return extra;
    }
    return cleaned;
  },
  valid(raw: string) {
    const val = this.clean(raw);
    return val.length === 9;
  },
};
