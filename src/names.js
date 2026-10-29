// Görünen ad doğrulama ve normalleştirme
const seg = new Intl.Segmenter('tr', { granularity: 'grapheme' });

export function graphemes(s) {
  return [...seg.segment(s)].map((x) => x.segment);
}

/** Geçerliyse {name, key}, değilse {error}. */
export function validateName(raw) {
  if (typeof raw !== 'string') return { error: 'Ad gerekli.' };
  const name = raw.normalize('NFC').replace(/\s+/g, ' ').trim();
  // Görünmez / kontrol karakterleri (sıfır genişlikli boşluk, yön işaretleri vb.)
  if (/[\p{Cc}\p{Cf}\p{Co}\p{Cn}\u2028\u2029]/u.test(name)) return { error: 'Adda görünmeyen karakter var.' };
  if (!/[\p{L}\p{N}]/u.test(name)) return { error: 'Ad en az bir harf veya rakam içermeli.' };
  const len = graphemes(name).length;
  if (len < 2) return { error: 'Ad en az 2 karakter olmalı.' };
  if (len > 20) return { error: 'Ad en fazla 20 karakter olabilir.' };
  return { name, key: nameKey(name) };
}

export function nameKey(name) {
  return name.normalize('NFC').toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();
}
