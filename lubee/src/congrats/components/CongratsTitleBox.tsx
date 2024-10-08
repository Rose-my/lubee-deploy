import { TitleBoxProps } from "@common/types/CommonTypes";
import styled from "styled-components";

export default function CongratsTitleBox(props: TitleBoxProps) {
  const { titleText, subtitleText } = props;

  return (
    <Wrapper>
      <TitleText>{titleText}</TitleText>
      <SubtitleText>{subtitleText}</SubtitleText>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.391rem;
  align-items: center;
  position: absolute;
  top: 38.1rem;
  text-align: center;
`;

const TitleText = styled.h2`
  ${({ theme }) => theme.fonts.Title_3};

  color: ${({ theme }) => theme.colors.gray_800};
`;

const SubtitleText = styled.p`
  ${({ theme }) => theme.fonts.Body_3};

  color: ${({ theme }) => theme.colors.gray_600};
  white-space: pre-line;
`;
