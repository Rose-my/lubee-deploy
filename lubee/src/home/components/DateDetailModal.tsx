import { ShortBorderIc } from "@assets/index";
import styled from "styled-components";
import { forwardRef } from "react";
import Comment from "../month/components/Comment";
import blankImg from "@assets/image/blankImg.png";
import { ImagesDataTypes } from "@common/types/EmojisDataTypes";
import BlankImgBtn from "home/components/BlankImgBtn";

interface DateDetailModalProps {
  date: string;
  iconSrc: string;
  imagesData: ImagesDataTypes[];
}

const DateDetailModal = forwardRef<HTMLDivElement, DateDetailModalProps>((props, ref) => {
  const { date, iconSrc, imagesData } = props;
  const displayPics =
    imagesData.length < 5 ? [...imagesData.map((img) => img.imgSrc), blankImg] : imagesData.map((img) => img.imgSrc);

  return (
    <Background>
      <Container ref={ref}>
        <Header>
          <ShortBorderIc />
          <Text>{date}</Text>
        </Header>
        <Contents>
          <CommentsBox>
            <Comment iconSrc={iconSrc} />
            <Comment iconSrc={iconSrc} />
          </CommentsBox>
          <PicBox>
            {displayPics.map((imgSrc, date) =>
              imgSrc === blankImg ? <BlankImgBtn date={date} /> : <Image key={date} src={imgSrc} />,
            )}
          </PicBox>
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

const Container = styled.section`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
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

const CommentsBox = styled.span`
  display: flex;
  gap: 1.6rem;
`;

const PicBox = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  overflow: scroll;
  max-height: 35rem;
  scrollbar-width: none;
`;

const Image = styled.img`
  padding: 0;
  border: none;
  background: none;
`;
