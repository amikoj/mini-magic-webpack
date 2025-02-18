const spells = ['Lumos', 'Expelliarmus', 'Wingardium Leviosa'];

export function checkMagic(spell) {
  return spells.includes(spell.replace(/!$/, ''));
}