// Hikâye kayıt defteri. Yeni hikâye eklemek için buraya bir kayıt ekleyin.
// engine: 'classic' (Adın Kimde Kaldı? biçimi) veya 'survival' (Son Sefer biçimi).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STORY as S1 } from './engine.js';
import { STORY as S2 } from './sonsefer/engine.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const S2_INTRO = JSON.parse(fs.readFileSync(path.join(here, '../content/son-sefer/intro.json'), 'utf8'));

export const STORIES = [
  {
    id: 'adin_kimde_kaldi',
    engine: 'classic',
    title: 'Adın Kimde Kaldı?',
    tagline: 'Haritada adı olmayan bir köy, isimlerinizi biliyor.',
    tags: ['Psikolojik korku', 'Ölüm yok', '20 final'],
    contentVersion: S1.contentVersion,
    intro: S1.intro,
  },
  {
    id: 'son_sefer',
    engine: 'survival',
    title: 'Son Sefer',
    tagline: 'Gece motor duruyor. Kaptan kayıp. Telsizden gelen ses, içinizden birini aşağı çağırıyor.',
    tags: ['Kalıcı ölüm', 'Görevli seçimi', 'Jumpscare', '20 final'],
    contentVersion: S2.contentVersion,
    intro: S2_INTRO,
  },
];
export const DEFAULT_STORY = STORIES[0].id;
export const storyById = (id) => STORIES.find((s) => s.id === id) || STORIES[0];
export const storyList = () => STORIES.map(({ id, title, tagline, tags }) => ({ id, title, tagline, tags }));
