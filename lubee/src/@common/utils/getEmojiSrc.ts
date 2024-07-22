import { emojisData } from "@common/core/emojisData";

const getEmojiSrc = (account: string, emoji: string) => {
  if (emoji == "") {
    return null;
  }

  const accountData = emojisData.find((data) => data.account === account);
  if (accountData) {
    const iconData = accountData.emojiData.find((icon) => icon.emoji === emoji);
    return iconData ? iconData.iconSrc : null;
  }
  return null;
};

export default getEmojiSrc;
