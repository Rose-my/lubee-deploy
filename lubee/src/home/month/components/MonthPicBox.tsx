import styled from "styled-components";
import BlankImgBtn from "home/components/BlankImgBtn";
import blankImg from "assets/image/blankImg.png";
import getProfileIconSrc from "@common/utils/getProfileIconSrc";
import LocationTag from "@common/components/LocationTag";
import EmojiTag from "@common/components/EmojiTag";
import getEmojiSrc from "@common/utils/getEmojiSrc";
import { useNavigate } from "react-router-dom";
import { MemoryBaseDtoDataTypes } from "fullpic/api/getOnePic";
import { monthHeaderDateFormat } from "@common/utils/dateFormat";

interface MonthPicBoxProps {
  url: string;
  specificDto?: MemoryBaseDtoDataTypes[];
  year: number;
  month: number;
  selectedDate?: number;
  isTodayCalendar: boolean;
}

export default function MonthPicBox(props: MonthPicBoxProps) {
  const navigate = useNavigate();
  const { url, specificDto = [], year, month, selectedDate, isTodayCalendar } = props;

  localStorage.setItem("currentPage", "month"); // 컴포넌트가 렌더링될 때 "month"를 로컬 스토리지에 저장

  /* 서버한테 어떤 공감을 선택했는지 받아오면 됨*/
  const myEmojiIcon = (emoji: string | null) => {
    const emojiSrc = getEmojiSrc("me", emoji);
    return emojiSrc ? <EmojiIcon as={emojiSrc} /> : null;
  };
  const partnerEmojiIcon = (emoji: string | null) => {
    const emojiSrc = getEmojiSrc("partner", emoji);
    return emojiSrc ? <EmojiIcon as={emojiSrc} /> : null;
  };

  /*이미지 개수가 5개 이하이면 이미지 추가하는 버튼 만들어주는 array*/
  const displayPics =
    specificDto.length < 5
      ? [
          ...specificDto.map((memory) => ({
            picSrc: memory.picture,
            id: memory.memory_id,
            myEmoji: memory.reaction_first,
            partnerEmoji: memory.reaction_second,
          })),
          { picSrc: blankImg, id: "blank", myEmoji: "", partnerEmoji: "" },
        ]
      : specificDto.map((memory) => ({
          picSrc: memory.picture,
          id: memory.memory_id,
          myEmoji: memory.reaction_first,
          partnerEmoji: memory.reaction_second,
        }));

  const monthHeader = monthHeaderDateFormat(year, month, selectedDate);

  return (
    <Container $isTodayCalendar={isTodayCalendar}>
      {displayPics.map((img, index) => {
        const memory = specificDto.find((memory) => memory.memory_id === img.id);
        const account = memory?.writer_profile_first !== null ? "me" : "partner"; // 작성자가 첫 번째 프로필이면 "me", 아니면 "partner"
        const writerProfile =
          account === "me"
            ? getProfileIconSrc("me", memory?.writer_profile_first || "")
            : getProfileIconSrc("partner", memory?.writer_profile_second || "");

        return img.picSrc === blankImg && selectedDate != undefined ? (
          <BlankImgBtn key={img.id} index={index} year={year} month={month} day={selectedDate} />
        ) : (
          <ImgContainer
            key={img.id}
            type="button"
            onClick={() => {
              navigate(`/fullpic${url}`, {
                state: { monthHeader, specificDto, memory_id: img.id },
              });
            }}>
            <Image src={img.picSrc} />
            <ProfileIcon as={writerProfile} />
            <TagContainer>
              <LocationTag location={memory?.location_name || ""} font="smallPic" />
              {img.myEmoji || img.partnerEmoji ? (
                <EmojiTag font="smallPic">
                  {myEmojiIcon(img.myEmoji)}
                  {partnerEmojiIcon(img.partnerEmoji)}
                </EmojiTag>
              ) : null}
            </TagContainer>
          </ImgContainer>
        );
      })}
    </Container>
  );
}

const Container = styled.section<{ $isTodayCalendar: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  width: 100%;
  height: 100%;
  margin-bottom: ${({ $isTodayCalendar }) => ($isTodayCalendar ? "10rem" : "none")};
`;

const ImgContainer = styled.button`
  position: relative;
  padding: 0;
  border: none;
  background: none;
`;

const Image = styled.img`
  width: 16.7rem;
  height: 16.7rem;
  padding: 0;
  border-radius: 12px;
  background: none;
  object-fit: cover;
  object-position: center;
`;

const ProfileIcon = styled.svg`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  width: 3rem;
  height: 3rem;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: flex-end;
  position: absolute;
  bottom: 1.2rem;
  left: 1.21rem;
  padding: 0;
  border: none;
  background: none;
`;

const EmojiIcon = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
`;
