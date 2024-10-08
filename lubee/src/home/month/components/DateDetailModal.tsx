import { ShortBorderIc } from "assets/index";
import styled from "styled-components";
import { forwardRef, useEffect, useState } from "react";
import getProfileIconSrc from "@common/utils/getProfileIconSrc";
import { useGetSpecificCalendar } from "home/hooks/useGetSpecificCalendar";
import { MemoryBaseDtoDataTypes } from "fullpic/api/getOnePic";
import MonthPicBox from "./MonthPicBox";
import CommentBox from "home/components/CommentBox";
import { useGetTodayDateComment } from "home/hooks/useGetTodayDateComment";
import { useGetCouplesInfo } from "@common/hooks/useGetCouplesInfo";

interface DateDetailModalProps {
  dateText: string;
  showCalendar: boolean;
  urlDate: string;
  selectedDate?: number;
  year: number;
  month: number;
  serverDate: string;
  isTodayCalendar: boolean;
}

const DateDetailModal = forwardRef<HTMLDivElement, DateDetailModalProps>((props, ref) => {
  const { dateText, showCalendar, urlDate, selectedDate, year, month, serverDate, isTodayCalendar } = props;

  let specificDto: MemoryBaseDtoDataTypes[] | undefined;

  if (selectedDate !== undefined) {
    const { data } = useGetSpecificCalendar({ year: year, month: month, day: selectedDate });
    specificDto = data?.response.memoryBaseListDto;
  }

  /*커플정보에서 프로필 가져와서 출력*/
  const { data: CoupleInfo } = useGetCouplesInfo();
  const { response: coupleResponse } = CoupleInfo || {};
  const profile_first = coupleResponse?.profile_first || "";
  const profile_second = coupleResponse?.profile_second || "";

  const myProfile = getProfileIconSrc("me", profile_first);
  const partnerProfile = getProfileIconSrc("partner", profile_second);

  /*코멘트 부분*/
  const { data: commentData } = useGetTodayDateComment(serverDate);
  const [myComment, setMyComment] = useState<string>("");
  const [partnerComment, setPartnerComment] = useState<string>("");

  // const { response } = commentData || {};
  // const myComment = response?.comment_first || "";
  // const partnerComment = response?.comment_second || "";

  useEffect(() => {
    if (commentData && commentData.response) {
      setMyComment(commentData.response.comment_first || "");
      setPartnerComment(commentData.response.comment_second || "");
    }
  }, [commentData]);

  return (
    <Background>
      <Container ref={ref} $showCalendar={showCalendar}>
        <Header>
          <ShortBorderIc />
          <Text>{dateText}</Text>
        </Header>
        <Contents>
          <CommentsContainer>
            <CommentBox
              profileIconSrc={myProfile}
              isMyComment={true}
              isWhite={false}
              myComment={myComment}
              partnerComment={partnerComment}
              finalServerDate={serverDate}
              isDateDetailModal={true}
            />
            <CommentBox
              profileIconSrc={partnerProfile}
              isMyComment={false}
              isWhite={false}
              myComment={myComment}
              partnerComment={partnerComment}
              isDateDetailModal={true}
            />
          </CommentsContainer>
          <HomePicBoxWrapper>
            <MonthPicBox
              url={`/${urlDate}`}
              specificDto={specificDto}
              year={year}
              month={month}
              selectedDate={selectedDate}
              isTodayCalendar={isTodayCalendar}
            />
          </HomePicBoxWrapper>
        </Contents>
      </Container>
    </Background>
  );
});

export default DateDetailModal;

const Background = styled.div`
  position: absolute;
  inset: 0;
  ${({ theme }) => theme.effects.dimmed_40};
`;

const Container = styled.section<{ $showCalendar: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  position: ${(props) => (props.$showCalendar ? "none" : "absolute")};
  bottom: 0;
  max-height: 49rem;
  border-radius: 16px 16px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  padding: 1.6rem 0;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray_800};
  ${({ theme }) => theme.fonts.Title_1};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 2rem 2rem;
`;

const CommentsContainer = styled.span`
  display: flex;
  gap: 1.6rem;
`;

const HomePicBoxWrapper = styled.div`
  display: flex;
`;
