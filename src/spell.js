import { checkMagic } from './magic.js';

export function castSpell(spell) {
  if (checkMagic(spell)) {
    console.log(`🪄 咒语生效：${spell}`);
  } else {
    console.log('💥 咒语反噬！请检查拼写');
  }
}