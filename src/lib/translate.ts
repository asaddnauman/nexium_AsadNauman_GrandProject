export function translateToUrdu(summary: string): string {
  const dictionary: { [key: string]: string } = {
    success: "کامیابی",
    goal: "مقصد",
    future: "مستقبل",
    learning: "سیکھنا",
    challenge: "چیلنج",
    opportunity: "موقع",
    achievement: "کامیابی",
    effort: "کوشش",
    motivation: "حوصلہ افزائی",
    life: "زندگی",
  };

  const words = summary.split(" ");
  const translatedWords = words.map(
    (word) => dictionary[word.toLowerCase()] || word
  );

  return translatedWords.join(" ");
}
